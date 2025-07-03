import React from 'react';

import { GoPasskeyFill } from 'react-icons/go';
import { Link, NavLink } from 'react-router-dom';
const ForgotPassword4 = () => {
	return (
		<div>
			<div className='flex flex-col items-center justify-center my-28'>
				<div className='flex justify-center items-center mb-8'>
					<GoPasskeyFill className=' w-24 h-24' />
				</div>

				<div className='w-full max-w-xl text-center'>
					<h1 className='text-5xl font-bold mb-4'>Password changed!</h1>
					<h2 className='text-sm text-gray-400 mb-16'>
						You have successfully completed your password reset
					</h2>

					<NavLink to={'/'}>
						<button className='w-full bg-[#F24C4C] text-white py-4 rounded-full hover:bg-[#d43b3b] focus:outline-none'>
							Login in Now
						</button>
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword4;
