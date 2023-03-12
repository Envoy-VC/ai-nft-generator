import Image from 'next/image';
import nft from '../assets/nft.png';

const NFTCard = () => (
	<a className='min-w-[350px] h-[350px] relative block group rounded-xl mx-4 my-4'>
		<Image
			alt='Name'
			src={nft}
			className='absolute inset-0 h-full w-full object-cover transition-opacity group-hover:opacity-50 rounded-xl'
		/>

		<div className='relative p-4 sm:p-6 lg:p-8'>
			<div className='mt-32 sm:mt-48 lg:mt-64'>
				<div className='translate-y-8 transform opacity-0 transition-all group-hover:-translate-y-16 group-hover:opacity-100'>
					<p className='text-sm text-black font-poppins font-medium'>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
						perferendis hic asperiores quibusdam quidem voluptates doloremque
						reiciendis nostrum harum. Repudiandae?
					</p>
				</div>
			</div>
		</div>
	</a>
);

export default NFTCard;
