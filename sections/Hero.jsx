'use client';

import Image from 'next/image';
import hero from '../assets/hero.jpg';

const Hero = () => (
	<section className='pt-24 bg-white'>
		<div className='px-12 mx-auto max-w-7xl'>
			<div className='w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center'>
				<h1 className='mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight'>
					<span>Create</span>{' '}
					<span className='block w-full py-2 leading-12 unicorn-text lg:inline'>
						Magical Unicorns
					</span>{' '}
					<span> with AI Technology!</span>
				</h1>
				<p className='px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24'>
					Unleash your imagination and bring your unicorn fantasies to life with
					our easy-to-use NFT generator. Get started now!
				</p>
				<div className='mb-4 space-x-0 md:space-x-2 md:mb-8'>
					<a
						href='#mint-nft'
						className='inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white font-semibold bg-[#EA5F7D] rounded-2xl sm:w-auto sm:mb-0'
					>
						Get Started
						<svg
							className='w-4 h-4 ml-1'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							fill='currentColor'
						>
							<path
								fillRule='evenodd'
								d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
								clipRule='evenodd'
							></path>
						</svg>
					</a>
				</div>
			</div>
			<div className='w-full mx-auto mt-20 text-center md:w-10/12'>
				<div className='relative z-0 w-full mt-8'>
					<div className='relative overflow-hidden shadow-2xl'>
						<div className='flex items-center flex-none px-4 bg-[#EA5F7D] rounded-b-none h-11 rounded-xl'>
							<div className='flex space-x-1.5'>
								<div className='w-3 h-3 border-2 border-white rounded-full'></div>
								<div className='w-3 h-3 border-2 border-white rounded-full'></div>
								<div className='w-3 h-3 border-2 border-white rounded-full'></div>
							</div>
						</div>
						<Image src={hero} alt='hero' />
					</div>
				</div>
			</div>
		</div>
	</section>
);

export default Hero;
