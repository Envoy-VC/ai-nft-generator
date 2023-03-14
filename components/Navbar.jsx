'use client';

import Image from 'next/image';
import { useState } from 'react';
import logo from '../assets/logo.png';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
	const [open, setOpen] = useState(false);
	return (
		<nav className='relative px-4 sm:px-8 xl:px-[11dvw] py-4 mx-auto border-b-2 border-gray-300'>
			<div className='flex justify-between px-4 sm:px-8 xl:px-0'>
				<div className='flex items-center text-black font-unicorn text-[48px] font-extrabold'>
					<Image src={logo} alt='logo' width={84} className='px-2' />
					Unicornify
				</div>
				<div className='hidden sm:flex items-center'>
					<ConnectButton />
				</div>

				{/* Small Screen Navigation */}

				<div className='flex sm:hidden justify-between items-center'>
					<button
						type='button'
						className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
						onClick={() => setOpen((open) => !open)}
					>
						<svg
							class='w-6 h-6'
							aria-hidden='true'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fill-rule='evenodd'
								d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
								clip-rule='evenodd'
							></path>
						</svg>
					</button>
					<div
						className={`absolute flex right-0 left-0 top-[60px] py-4 justify-center z-10 ${
							!open ? '-translate-y-[100vh]' : 'translate-y-16'
						} transition-all duration-700`}
					>
						<ConnectButton />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
