import { useEffect, useState } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';

import { useGlobalContext } from '@/context';
import { NFTCard } from '@/components';
import { CONTRACT_ADDRESS } from '@/contract';

const RecentNFTs = () => {
	const { tokenId } = useGlobalContext();
	const [nfts, setNFTs] = useState([]);
	const count = 18;

	useEffect(() => {
		const fetchMetadata = async () => {
			const tokenID = await tokenId;
			const NFTs = [];
			for (let i = 0; i < count; i++) {
				const id = String(tokenID.toString() - count + i - 1);
				NFTs.push({
					contractAddress: CONTRACT_ADDRESS,
					tokenId: id,
					tokenType: 'ERC721',
				});
			}
			const settings = {
				apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
				network: Network.MATIC_MUMBAI,
			};
			const alchemy = new Alchemy(settings);
			const metadata = await alchemy.nft.getNftMetadataBatch(NFTs, {
				refreshCache: true,
			});
			setNFTs(metadata);
		};
		fetchMetadata();
	}, []);
	return (
		<section className='bg-white py-24 z-0 overflow-hidden'>
			<div className='text-[64px] text-[#EA5F7D] font-unicorn font-bold text-center pb-16'>
				Recent Creations
			</div>

			<div className='flex flex-row grow-0 shrink-0 basis-auto items-center z-1 animate-marquee_left'>
				{nfts.slice(0, count / 2).map((nft, index) => (
					<NFTCard metadata={nft} key={index} />
				))}
			</div>
			<div className='flex flex-row grow-0 shrink-0 basis-auto items-center z-1 animate-marquee_right'>
				{nfts.slice(count / 2, count).map((nft, index) => (
					<NFTCard metadata={nft} key={index} />
				))}
			</div>
		</section>
	);
};

export default RecentNFTs;
