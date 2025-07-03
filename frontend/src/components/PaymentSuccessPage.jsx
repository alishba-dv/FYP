import React from 'react';
import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

  
const PaymentSuccessPage = () => {
	useEffect(() => {
		// Clear cart from localStorage
		localStorage.removeItem('cart');
		console.log('Payment successful, cart cleared!');
	  }, []);
	return (
		<div className='flex justify-center items-center min-h-screen bg-gray-100'>
			<div className='bg-white rounded-lg p-8 w-full max-w-md shadow-lg text-center'>
				<div className='flex justify-center mb-6'>
					<FaCheckCircle className='text-[#F24C4C] text-6xl' />
				</div>

				<h2 className='text-2xl font-semibold text-gray-800 mb-4'>
					Payment Successful!
				</h2>

				<p className='text-gray-600 mb-6'>
					Your payment has been successfully processed. Thank you for your
					purchase!
				</p>

				<NavLink to='/collection'>
					<button className='w-full bg-[#F24C4C] text-white py-2 rounded-lg  transition'>
						Continue Shopping
					</button>
				</NavLink>

				<NavLink to='/order'>
					<button className='w-full mt-4 bg-[#F24C4C] text-white py-2 rounded-lg  transition'>
						View Orders
					</button>
				</NavLink>
			</div>
		</div>
	);
};

export default PaymentSuccessPage;
