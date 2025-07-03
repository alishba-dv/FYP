import React from 'react';
import Image2 from '../assets/Image9.png';
import Image3 from '../assets/Image13.avif';

export const SalePoster = () => {
	return (
		<div className='my-[100px] relative flex flex-col md:flex-row justify-center md:justify-evenly items-center h-[300px] md:h-[250px]'>
			<div
				style={{
					backgroundImage: `url(${Image3})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}}
			/>
			<div
				data-aos='fade-right'
				className='z-20 relative flex flex-col justify-center items-center md:items-start'>
				<h1
					className='text-4xl md:text-6xl font-bold mb-2 text-center md:text-left'
					style={{ fontFamily: 'Playfair Display, serif' }}>
					Summer Sale
				</h1>
				<h1
					className='text-3xl md:text-5xl font-bold text-center md:text-left'
					style={{ fontFamily: 'Playfair Display, serif' }}>
					50% OFF
				</h1>
			</div>
			<img
				data-aos='fade-left'
				src={Image2}
				alt=''
				className='h-[150px] w-[250px] md:h-[200px] md:w-[300px] rounded-lg z-20 relative transition-transform duration-300 ease-in-out transform hover:rotate-6 mt-4 md:mt-0'
			/>
		</div>
	);
};
