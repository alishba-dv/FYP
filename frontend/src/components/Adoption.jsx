import React from 'react';
import { NavLink } from 'react-router-dom';
import PetImage from '../assets/adoptCover.jpg';

export const Adoption = () => {
	return (
		<div className='flex flex-col md:flex-row my-10'>
			{/* Image Section with Overlay */}
			<div className='relative flex-shrink-0 md:w-1/2 mb-5 md:mb-0'>

				<img
					src={PetImage}
					alt='Adopt a Pet'
					className='w-full h-auto rounded-lg z-10 relative'
				/>
			</div>

			{/* Text and Button Section */}
			<div className='ml-0 md:ml-4 flex-1 md:w-2/3'>
           
				<div
					data-aos='fade-up'
					className='p-6 sm:p-8 md:p-10 h-full flex flex-col justify-center bg-slate-50 rounded-lg shadow-md'>
					<h1 className='text-lg sm:text-xl font-semibold py-2 mb-2'>
						Find Your New Best Friend 🐾
					</h1>
					<p className='text-gray-800 font-medium text-lg sm:text-2xl'>
						Adopt a loving pet today!
					</p>
					<p className='text-gray-500 pb-4'>
						Explore our adoption center and give a pet a forever home.
					</p>
					<NavLink
	to='/adoption'
	onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
>
	<button className='rounded-full bg-[#F24C4C] px-4 py-2 font-semibold text-white sm:mt-0'>
		VIEW ALL
	</button>
</NavLink>
				</div>
			</div>
		</div>
	);
};
