import React from 'react';
import { NavLink } from 'react-router-dom';
import { TiTickOutline } from 'react-icons/ti';

const SubscriptionPage2 = () => {
	return (
		<>
			<div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-6 py-12'>
				<div className='bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full text-center animate-fade-in-up'>
					<h4 className='text-lg font-semibold text-gray-600 mb-4'>
						STEP 1 OF 2
					</h4>
					<h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-6'>
						Choose the perfect plan for your pet’s care.
					</h1>

					<div className='space-y-6 mb-8 text-left'>
						<div className='flex items-center justify-start gap-3'>
							<TiTickOutline className='text-red-500 w-8 h-8' />
							<p className='text-gray-500 text-base md:text-lg'>
								Enjoy tailored care packages.
							</p>
						</div>
						<div className='flex items-center justify-start gap-3'>
							<TiTickOutline className='text-red-500 w-8 h-8' />
							<p className='text-gray-500 text-base md:text-lg'>
								Cancel anytime.
							</p>
						</div>
						<div className='flex items-center justify-start gap-3'>
							<TiTickOutline className='text-red-500 w-8 h-8' />
							<p className='text-gray-500 text-base md:text-lg'>
								Get everything at an affordable price.
							</p>
						</div>
						<div className='flex items-center justify-start gap-3'>
							<TiTickOutline className='text-red-500 w-8 h-8' />
							<p className='text-gray-500 text-base md:text-lg'>
								No hidden fees.
							</p>
						</div>
					</div>

					<NavLink to='/sub3'>
						<button className='w-full px-10 py-4 bg-[#F24C4C] hover:bg-[#e03b3b] text-white text-lg font-bold rounded-lg transition duration-300'>
							Next
						</button>
					</NavLink>
				</div>
			</div>
		</>
	);
};

export default SubscriptionPage2;
