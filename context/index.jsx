import React, { createContext, useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import {
	useAccount,
	useContractRead,
	useContractWrite,
	usePrepareContractWrite,
	useWaitForTransaction,
} from 'wagmi';
import { Web3Storage } from 'web3.storage';

import { CONTRACT_ADDRESS, ABI } from '../contract';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
	const { address, isDisconnected } = useAccount();
	const [minting, setMinting] = useState(false);

	const checks = (form) => {
		if (!address || isDisconnected) {
			toast.error('Please connect your wallet');
			setMinting(false);
			throw new Error('Please connect your wallet');
		} else if (form.image_data === '') {
			toast.error('Error: No Image Generated');
			setMinting(false);
			throw new Error('Error: No Image Generated');
		} else if (form.prompt === '') {
			toast.error('Error No Prompt');
			setMinting(false);
			throw new Error('Error No Prompt');
		}
	};

	const { data: tokenId } = useContractRead({
		address: CONTRACT_ADDRESS,
		abi: ABI,
		functionName: '_tokenIdCounter',
		watch: true,
	});

	const { config } = usePrepareContractWrite({
		address: CONTRACT_ADDRESS,
		abi: ABI,
		functionName: 'safeMint',
		args: [address, ''],
	});

	const { write, data } = useContractWrite({
		...config,
		mode: 'recklesslyUnprepared',
		onError() {
			setMinting(false);
		},
	});

	const waitForTransaction = useWaitForTransaction({
		hash: data?.hash,
		async onSuccess() {
			const id = await tokenId;
			toast(<Msg id={id} />, props);
		},
		onSettled() {
			setMinting(false);
		},
	});

	const Msg = ({ toastProps, id }) => {
		const tokenID = tokenId;
		return (
			<div>
				<p>🦄 Success</p>
				<p>
					View on{' '}
					<a
						href={`https://testnets.opensea.io/assets/mumbai/${CONTRACT_ADDRESS}/${parseInt(
							tokenID,
							16
						)}`}
						target='_blank'
						rel='noreferrer'
					>
						<span className='text-[#3445DD] hover:underline underline-offset-2'>
							OpenSea
						</span>
					</a>
				</p>
			</div>
		);
	};

	const props = {
		type: toast.TYPE.SUCCESS,
		position: toast.POSITION.BOTTOM_LEFT,
	};

	const mint = async (form) => {
		try {
			setMinting(true);
			checks(form);
			const imageHash = await uploadImage(form);
			const res = await generateMetadata(form, imageHash);
			const hash = await uploadMetadata(res.metadata);
			const ipfsHash = 'ipfs://' + String(hash) + '/metadata.json';
			await write({
				recklesslySetUnpreparedArgs: [address, ipfsHash],
			});
		} catch (error) {
			console.log(error);
		}
	};

	const generateMetadata = async (form, imageHash) => {
		const tokenID = await tokenId;
		const image = `ipfs://${imageHash}/image.jpg`;
		const metadata = {
			name: `Unicorn #${tokenID}`,
			description: form.prompt,
			image: image,
			attributes: [
				{
					display_type: 'date',
					trait_type: 'Date Created',
					value: Math.floor(Date.now() / 1000),
				},
			],
		};
		return { metadata: metadata, id: parseInt(tokenID, 16) };
	};

	function makeStorageClient() {
		return new Web3Storage({
			token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN,
		});
	}

	const uploadImage = async (form) => {
		const tokenID = await tokenId;
		const client = makeStorageClient();
		const res = await fetch(form.image_data);
		const blob = await res.blob();
		const image = [
			new File([blob], `${parseInt(tokenID, 16)}.jpg`, {
				type: 'image/jpeg',
			}),
		];
		const imageCid = await client.put(image);
		return imageCid;
	};

	const uploadMetadata = async (metadata) => {
		const client = makeStorageClient();
		const buffer = Buffer.from(JSON.stringify(metadata));
		const tokenID = await tokenId;
		const file = [new File([buffer], `${parseInt(tokenID, 16)}.json`)];
		const cid = await client.put(file);
		console.log('stored files with cid:', cid);
		return cid;
	};

	return (
		<GlobalContext.Provider
			value={{
				mint,
				minting,
				tokenId,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);
