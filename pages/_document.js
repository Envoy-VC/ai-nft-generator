import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en' className='scroll-smooth'>
			<Head>
				{/* Character Set */}
				<meta charSet='utf-8' />

				{/* Title and Description */}
				<title>Unicornify</title>
				<meta
					name='description'
					content='Create Magical Unicorns with AI Technology!'
				/>

				{/* Favicon */}
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/apple-touch-icon.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicon-16x16.png'
				/>
				<link rel='manifest' href='/site.webmanifest' />

				{/* Robots Search Indexing */}
				<meta
					name='robots'
					content='follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large'
				/>

				{/* Twitter Card data */}
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:site' content='@Envoy_1084' />
				<meta name='twitter:title' content='Unicornify' />
				<meta
					name='twitter:description'
					content='Create Magical Unicorns with AI Technology!'
				/>
				<meta name='twitter:image:alt' content='Unicornify' />
				<meta name='twitter:creator' content='@Envoy_1084' />
				<meta
					name='twitter:image'
					content='https://i.ibb.co/zPPsRKb/og-image.png'
				/>

				{/* Open Graph data */}
				<meta property='og:locale' content='en_US' />
				<meta property='og:title' content='Unicornify' />
				<meta
					property='og:url'
					content='https://ai-nft-generator-three.vercel.app/'
				/>
				<meta
					property='og:image'
					content='https://i.ibb.co/zPPsRKb/og-image.png'
				/>
				<meta property='og:image:type' content='image/png' />
				<meta property='og:image:width' content='1200' />
				<meta property='og:image:height' content='630' />
				<meta name='og:image:alt' content='Unicornify' />
				<meta property='og:type' content='website' />
				<meta
					property='og:description'
					content='Create Magical Unicorns with AI Technology!
'
				/>
				<meta property='og:site_name' content='Unicornify' />

				{/* Viewport */}
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
