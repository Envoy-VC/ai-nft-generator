import { Navbar } from '@/components';
import { Hero, RecentNFTs, Footer, Generate } from '@/sections';

const Home = () => (
	<div className='bg-white'>
		<Navbar />
		<Hero />
		<Generate />
		<RecentNFTs />
		<Footer />
	</div>
);

export default Home;
