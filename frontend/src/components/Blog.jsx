import React from 'react';
import Image1 from '../assets/Image10.png';
import Image2 from '../assets/Image6.avif';
import Image3 from '../assets/Image11.png';
import { NavLink } from 'react-router-dom';

export const Blog = () => {
	return (
		<div className='flex flex-col md:flex-row my-10'>
			<div className='relative flex-shrink-0 md:w-1/2 mb-5 md:mb-0'>
				<div
					style={{
						backgroundImage: `url(${Image2})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
					}}
				/>
				<img
					src={Image1}
					alt=''
					className='w-full h-auto rounded-lg z-10 relative'
				/>
			</div>

			<div className='ml-0 md:ml-4 flex-1 md:w-2/3'>
				<div
					data-aos='fade-up'
					className='p-6 sm:p-8 md:p-10 h-full flex flex-col justify-center bg-slate-50 rounded-lg shadow-md'>
					<img
						src={Image3}
						alt=''
						className='w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] mb-4'
					/>
					<h1 className='text-lg sm:text-xl font-semibold py-2 mb-2'>
					`📝 Discover Insightful Stories
Explore the latest tips and trends!

Dive into our blog and stay informed while giving your pets the love they deserve.`


	
					</h1>
					{/* <p className='text-gray-800 font-medium text-lg sm:text-2xl'>Ubaid</p> */}
					{/* <p className='text-gray-500 pb-4'>Owner</p> */}
					<NavLink to='/blog'>
						<button className='rounded-full bg-[#F24C4C] px-4 py-2 font-semibold text-white sm:mt-0'>
							VIEW ALL
						</button>
					</NavLink>
				</div>
			</div>
		</div>
	);
};
