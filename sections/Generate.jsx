import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import nft from '../assets/nft.png';
import { Spinner } from '@/components';
import { useGlobalContext } from '@/context';

const Generate = () => {
	const { mint, minting } = useGlobalContext();
	const [generating, setGenerating] = useState(false);
	const [form, setForm] = useState({
		name: 'Unicorn',
		prompt:
			'A Unicorn is in a fantasy world, with wings and a horn. It is flying over a rainbow.',
		image: '',
	});

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

	const Mint = () => {
		mint(form);
	};

	return (
		<section className='mt-36' id='mint-nft'>
			<div className='text-[64px] text-[#EA5F7D] font-unicorn font-bold text-center pb-16'>
				Mint Your Unicorn
			</div>
			<div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
				<div className='flex flex-col sm:flex-row justify-center sm:space-x-16 space-y-16 sm:space-y-0'>
					<div>
						{form.image ? (
							<Image
								src={form.image}
								alt='Unicorn NFT'
								className='rounded-xl'
								width={512}
								height={512}
							/>
						) : (
							<Image
								src={nft}
								alt='Unicorn NFT'
								className='rounded-xl'
								width={512}
								height={512}
							/>
						)}
					</div>

					<div className='flex-grow rounded-lg bg-white p-8 shadow-xl'>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div className='flex flex-grow'>
								<label className='sr-only' htmlFor='name'>
									Name your Unicorn
								</label>
								<input
									className=' w-full rounded-lg p-3 outline-none text-md font-poppins border-gray-200 shadow-sm'
									placeholder='Name your Unicorn'
									type='text'
									id='name'
									onChange={(e) => handleFormFieldChange(e, 'name')}
								/>
							</div>

							<div>
								<label className='sr-only' htmlFor='prompt'>
									Prompt
								</label>

								<textarea
									className='w-full rounded-lg p-3 text-md font-poppins outline-none border-gray-200 shadow-sm'
									placeholder='A Unicorn is in a fantasy world, with wings and a horn. It is flying over a rainbow.'
									rows='8'
									id='message'
									onChange={(e) => handleFormFieldChange(e, 'prompt')}
								></textarea>
							</div>

							<div className='flex flex-col sm:flex-row mt-4'>
								{generating ? (
									<button
										disabled
										type='button'
										className='mx-auto px-6 py-3 mt-8 text-xl font-bold font-poppins text-white bg-[#EA5F7D] rounded-full focus:outline-none inline-flex items-center'
									>
										<Spinner />
										Generating...
									</button>
								) : (
									<button
										type='submit'
										className='mx-auto inline-block px-12 py-3 mt-8 text-xl font-bold font-poppins text-white bg-[#EA5F7D] rounded-full focus:outline-none hover:scale-110 transition ease-in-out duration-400'
									>
										Generate
									</button>
								)}
							</div>
						</form>
						<div className='flex'>
							{!minting ? (
								<button
									className='mx-auto inline-block px-12 py-3 mt-8 text-xl font-bold font-poppins text-[#EA5F7D] bg-white rounded-full focus:outline-none hover:scale-110 border-4 border-[#EA5F7D] transition ease-in-out duration-400'
									onClick={Mint}
								>
									Mint
								</button>
							) : (
								<button
									disabled
									type='button'
									className='mx-auto inline-flex px-12 py-3 mt-8 text-xl font-bold font-poppins text-[#EA5F7D] bg-white rounded-full focus:outline-none border-4 border-[#EA5F7D]'
								>
									<Spinner />
									Minting...
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
			<ToastContainer />
		</section>
	);
};

export default Generate;
