import React, { useState } from 'react';

import Image from 'next/image';
import nft from '../assets/nft.png';
import { Spinner } from '@/components';
import { useGlobalContext } from '@/context';

const Generate = () => {
	const { address, generateMetadata, uploadMetadata, mint } =
		useGlobalContext();

	const [generating, setGenerating] = useState(false);
	const [minting, setMinting] = useState(false);
	const [form, setForm] = useState({
		name: 'Unicorn',
		prompt:
			'A Unicorn is in a fantasy world, with wings and a horn. It is flying over a rainbow.',
		image: 'data:image/jpeg;base64,adadada',
	});

	const handleMint = async () => {
		try {
			setMinting(true);
			const metadata = await generateMetadata(form);
			const cid = await uploadMetadata(metadata);
			const hash = 'ipfs://' + String(cid);
			mint(hash);
		} catch (error) {
			console.log(error);
		} finally {
			setMinting(false);
		}
	};

	const handleFormFieldChange = (e, fieldName) => {
		setForm({ ...form, [fieldName]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (form.prompt) {
			try {
				setGenerating(true);
				const response = await fetch(
					'http://localhost:3000/api/generate_image',
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ prompt: form.prompt }),
					}
				);
				const data = await response.json();
				setForm({ ...form, image: `data:image/jpeg;base64,${data.photo}` });
				console.log(form.image);
			} catch (error) {
				console.log(error);
			} finally {
				setGenerating(false);
			}
		} else {
			alert('Please enter a prompt');
		}
	};
	return (
		<section className='mt-36' id='mint-nft'>
			<div className='text-[64px] text-[#EA5F7D] font-unicorn font-bold text-center pb-16'>
				Mint Your Unicorn
			</div>
			<div class='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
				<div class='flex flex-col sm:flex-row justify-center sm:space-x-16 space-y-16 sm:space-y-0'>
					<div>
						<Image
							src={form.image}
							alt='Unicorn NFT'
							className='rounded-xl'
							width={512}
							height={512}
						/>
					</div>

					<div class='flex-grow rounded-lg bg-white p-8 shadow-xl'>
						<form onSubmit={handleSubmit} class='space-y-4'>
							<div className='flex flex-grow'>
								<label class='sr-only'>Name your Unicorn</label>
								<input
									class=' w-full rounded-lg p-3 outline-none text-md font-poppins border-gray-200 shadow-sm'
									placeholder='Name your Unicorn'
									type='text'
									id='name'
									onChange={(e) => handleFormFieldChange(e, 'name')}
								/>
							</div>

							<div>
								<label class='sr-only' for='prompt'>
									Prompt
								</label>

								<textarea
									class='w-full rounded-lg p-3 text-md font-poppins outline-none border-gray-200 shadow-sm'
									placeholder='A Unicorn is in a fantasy world, with wings and a horn. It is flying over a rainbow.'
									rows='8'
									id='message'
									onChange={(e) => handleFormFieldChange(e, 'prompt')}
								></textarea>
							</div>

							<div class='flex flex-col sm:flex-row mt-4'>
								{generating ? (
									<button
										disabled
										type='button'
										class='mx-auto px-6 py-3 mt-8 text-xl font-bold font-poppins text-white bg-[#EA5F7D] rounded-full focus:outline-none inline-flex items-center'
									>
										<Spinner />
										Generating...
									</button>
								) : (
									<button
										type='submit'
										class='mx-auto inline-block px-12 py-3 mt-8 text-xl font-bold font-poppins text-white bg-[#EA5F7D] rounded-full focus:outline-none hover:scale-110 transition ease-in-out duration-400'
									>
										Generate
									</button>
								)}
							</div>
						</form>
						{!minting ? (
							<button
								class='mx-auto inline-block px-12 py-3 mt-8 text-xl font-bold font-poppins text-[#EA5F7D] bg-white rounded-full focus:outline-none hover:scale-110 border-4 border-[#EA5F7D] transition ease-in-out duration-400'
								onClick={handleMint}
							>
								Mint
							</button>
						) : (
							<button
								disabled
								type='button'
								class='mx-auto inline-flex px-12 py-3 mt-8 text-xl font-bold font-poppins text-[#EA5F7D] bg-white rounded-full focus:outline-none border-4 border-[#EA5F7D]'
							>
								<Spinner />
								Minting...
							</button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Generate;
