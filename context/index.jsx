import React, { createContext, useContext } from 'react';
import {
	useAccount,
	useContractRead,
	useContractWrite,
	usePrepareContractWrite,
} from 'wagmi';
import { Web3Storage } from 'web3.storage';

import { CONTRACT_ADDRESS, ABI } from '../contract';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
	const { address } = useAccount();

	const { data: tokenId } = useContractRead({
		address: CONTRACT_ADDRESS,
		abi: ABI,
		functionName: '_tokenIdCounter',
	});

	const { config } = usePrepareContractWrite({
		address: CONTRACT_ADDRESS,
		abi: ABI,
		functionName: 'safeMint',
	});

	const { write } = useContractWrite(config);

	const mint = async (hash) => {
		await write({ recklesslySetUnpreparedArgs: [address, hash] });
	};

	const generateMetadata = async (form) => {
		const tokenID = await tokenId.data;
		const metadata = {
			name: `Unicorn #${tokenID}`,
			description: form.prompt,
			image_data: form.image,
			attributes: [
				{
					display_type: 'date',
					trait_type: 'Date Created',
					value: Math.floor(Date.now() / 1000),
				},
			],
		};
		return metadata;
	};

	function makeStorageClient() {
		return new Web3Storage({
			token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN,
		});
	}

	const uploadMetadata = async (metadata) => {
		const client = makeStorageClient();
		const buffer = Buffer.from(JSON.stringify(metadata));
		const file = [new File([buffer], `${Number(tokenId) + 1}.json`)];
		const cid = await client.put(file);
		console.log('stored files with cid:', cid);
		return cid;
	};

	return (
		<GlobalContext.Provider
			value={{
				address,
				generateMetadata,
				uploadMetadata,
				mint,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);
