'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';
import { navVariants } from '../utils/motion';

import logo from '../public/logo.png';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => (
	<motion.nav
		variants={navVariants}
		initial='hidden'
		whileInView='show'
		className='xl:max-w-[1440px] w-full py-4 relative mx-auto'
	>
		<div className='flex justify-between px-8 xl:px-0'>
			<div className='flex items-center text-white font-poppins text-[24px] font-bold'>
				<Image src={logo} alt='logo' width={64} className='px-2' />
				SynthSociety
			</div>
			<div className='hidden sm:flex items-center'>
				<ConnectButton />
			</div>
		</div>
	</motion.nav>
);

export default Navbar;
