import React from 'react';
import { NavLink } from 'react-router-dom';

const SubscriptionPage1 = () => {
	return (
		<>
			<div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-6'>
				<div className='bg-white rounded-lg shadow-lg p-12 max-w-2xl w-full text-center animate-fade-in-up'>
					<h4 className='text-lg font-semibold text-gray-600 mb-4'>
						STEP 1 OF 3
					</h4>
					<h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-6'>
						Create a password to start your subscription.
					</h1>
					<p className='text-gray-500 text-base md:text-lg mb-8'>
						You're just a few steps away from making your furry friend's life
						better! We keep things simple, just like you prefer.
					</p>

					<div className='flex flex-col gap-6 mb-8'>
						<input
							type='email'
							placeholder='Enter your email'
							className='px-5 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black w-full'
						/>
						<input
							type='password'
							placeholder='Create a password'
							className='px-5 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black w-full'
						/>
					</div>

					<NavLink to='/sub2'>
						<button className='w-full px-10 py-4 bg-[#F24C4C] hover:bg-[#e03b3b] text-white text-lg font-bold rounded-lg transition duration-300'>
							Next
						</button>
					</NavLink>
				</div>
			</div>
		</>
	);
};

export default SubscriptionPage1;
