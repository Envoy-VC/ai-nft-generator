import Image from 'next/image';
import nft from '../assets/nft.jpg';

const NFTCard = ({ metadata }) => (
	<a className='min-w-[350px] h-[350px] relative block group rounded-xl mx-4 my-4'>
		<Image
			alt='NFT'
			src={metadata.media[0].gateway}
			width={350}
			height={350}
			className='absolute inset-0 h-full w-full object-fill transition-opacity group-hover:opacity-50 rounded-xl'
		/>

		<div className='relative p-4 sm:p-6 lg:p-8'>
			<div className='mt-32 sm:mt-48 lg:mt-64'>
				<div className='translate-y-8 transform opacity-0 transition-all group-hover:-translate-y-[200px] group-hover:opacity-100'>
					<p className='text-xl text-black font-poppins font-medium'>
						{metadata.description}
					</p>
				</div>
			</div>
		</div>
	</a>
);

export default NFTCard;
