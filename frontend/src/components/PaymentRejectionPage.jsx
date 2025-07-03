import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const PaymentRejectionPage = ({ errorMessage }) => {
	return (
		<div className='flex justify-center items-center min-h-screen bg-gray-100'>
			<div className='bg-white rounded-lg p-8 w-full max-w-md shadow-lg text-center'>
				<div className='flex justify-center mb-6'>
					<FaTimesCircle className='text-red-500 text-6xl' />
				</div>

				<h2 className='text-2xl font-semibold text-gray-800 mb-4'>
					Payment Failed!
				</h2>

				<p className='text-gray-600 mb-6'>
					Your payment could not be processed. Please check your payment details
					and try again.
				</p>

				{errorMessage && <p className='text-red-500 mb-6'>{errorMessage}</p>}

				<NavLink to='/'>
					<button className='w-full mt-4 bg-[#F24C4C] text-white py-2 rounded-lg  transition'>
						Return to Homepage
					</button>
				</NavLink>
			</div>
		</div>
	);
};

export default PaymentRejectionPage;
