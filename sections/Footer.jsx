import Image from 'next/image';

import twitter from '../assets/twitter.svg';
import github from '../assets/github.svg';
import linkedin from '../assets/linkedin.svg';
import mail from '../assets/mail.svg';

const Footer = () => (
	<footer aria-label='Site Footer' className='bg-[#EA5F7D]'>
		<div className='max-w-screen-xl px-4 pt-16 pb-8 mx-auto sm:px-6 lg:px-8 lg:pt-24'>
			<div className='text-center'>
				<h2 className='text-3xl font-extrabold text-white sm:text-5xl'>
					Create, Collect and Trade
				</h2>

				<p className='max-w-sm mx-auto mt-4 text-gray-200'>
					Discover the power of owning your own unicorn NFT. Start minting now!
				</p>

				<a
					href='#mint-nft'
					className='inline-block px-12 py-3 mt-8 text-xl font-bold font-poppins text-[#EA5F7D] bg-white hover:text-white hover:bg-[#EA5F7D] rounded-full focus:outline-none border-4 border-[#EA5F7D] hover:border-white transition ease-in duration-400'
				>
					Get Started →
				</a>
			</div>

			<div className='pt-8 mt-16 border-t border-gray-100 flex gap-6 justify-center lg:mt-24'>
				<a
					href='https://twitter.com/Envoy_1084'
					target='_blank'
					rel='noreferrer'
				>
					<Image src={twitter} alt='twitter' width={32} />
				</a>
				<a href='https://github.com/Envoy-VC' target='_blank' rel='noreferrer'>
					<Image src={github} alt='Github' width={32} />
				</a>
				<a
					href='https://www.linkedin.com/in/vedant-chainani'
					target='_blank'
					rel='noreferrer'
				>
					<Image src={linkedin} alt='Linkedin' width={32} />
				</a>
				<a
					href='mailto:vedantchainani1084@gmail.com'
					target='_blank'
					rel='noreferrer'
				>
					<Image src={mail} alt='mail' width={32} />
				</a>
			</div>
		</div>
	</footer>
);

export default Footer;
