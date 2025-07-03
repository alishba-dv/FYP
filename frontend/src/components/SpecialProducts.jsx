import React from 'react';
import Image1 from '../assets/Image14.jpg';
import Image2 from '../assets/Image9.png';
import { Link } from 'react-router-dom';

export const SpecialProducts = () => {
	return (
		<>
			<div className='flex flex-col md:flex-row justify-center items-center w-full '>
				<div
					data-aos='fade-down'
					className='w-full md:w-[40%] text-center mb-8 md:mb-0'>
					<h4 className='text-lg font-bold text-[#F24C4C] mb-5'>
						2 WEEKS PROMO
					</h4>
					<h1
						className='text-4xl font-bold mb-6'
						style={{ fontFamily: 'Playfair Display, serif' }}>
						Norwegian Salmon
					</h1>
					<p className='mb-4'>
						Proactively envisioned multimedia-based expertise and cross-media
						growth strategies seamlessly visualize
					</p>
					<h2 className='text-2xl font-bold mb-8'>
						<span className='line-through text-[#F24C4C]'>$41.00</span> - $33.00
					</h2>
					<Link to='/collection'>
						<img
							src={Image2}
							alt='Product'
							className='mx-auto'
						/>
					</Link>
				</div>
				<div className='w-full md:w-[40%] flex justify-center'>
					<img
						data-aos='fade-up'
						src={Image1}
						alt='Promo'
						className='max-w-full'
					/>
				</div>
			</div>

			<div className='flex flex-col md:flex-row justify-center items-center w-full mb-10 '>
				<div className='w-full md:w-[40%] flex justify-center mb-8 md:mb-0'>
					<img
						data-aos='fade-down'
						src={Image1}
						alt='Promo'
						className='max-w-full'
					/>
				</div>
				<div
					data-aos='fade-up'
					className='w-full md:w-[40%] text-center'>
					<h4 className='text-lg font-bold text-[#F24C4C] mb-5'>
						2 WEEKS PROMO
					</h4>
					<h1
						className='text-4xl font-bold mb-6'
						style={{ fontFamily: 'Playfair Display, serif' }}>
						Norwegian Salmon
					</h1>
					<p className='mb-4'>
						Proactively envisioned multimedia-based expertise and cross-media
						growth strategies seamlessly visualize
					</p>
					<h2 className='text-2xl font-bold mb-8'>
						<span className='line-through text-[#F24C4C]'>$41.00</span> - $33.00
					</h2>
					<Link to='/collection'>
						<img
							src={Image2}
							alt='Product'
							className='mx-auto'
						/>
					</Link>
				</div>
			</div>
		</>
	);
};
