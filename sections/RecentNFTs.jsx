import { NFTCard } from '@/components';

const RecentNFTs = () => (
	<section className='bg-white py-24 z-0 overflow-hidden'>
		<div className='text-[64px] text-[#EA5F7D] font-unicorn font-bold text-center pb-16'>
			Recent Creations
		</div>
		<div className='flex flex-row grow-0 shrink-0 basis-auto items-center z-1 animate-marquee_left'>
			<NFTCard />
			<NFTCard />
			<NFTCard />
			<NFTCard />
			<NFTCard />
			<NFTCard />
			<NFTCard />
			<NFTCard />
			<NFTCard />
		</div>
		<div className='flex flex-row grow-0 shrink-0 basis-auto items-center z-1 animate-marquee_right'>
			<NFTCard />
			<NFTCard />
			<NFTCard />
			<NFTCard />
			<NFTCard />
			<NFTCard />
			<NFTCard />
			<NFTCard />
			<NFTCard />
		</div>
	</section>
);

export default RecentNFTs;
