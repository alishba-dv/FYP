import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { NavLink } from 'react-router-dom';
import { AccessProductItem } from './AccessProductItem';
import axios from 'axios';

export const LatestCollectionAccessories = () => {
	// const { accessoriesProduct } = useContext(ShopContext);
	const [premimumProducts, setPremimumProducts] = useState([]);
	const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.post(
				`http://${host}:8080/api/Accessories`
			);
			setPremimumProducts(response.data.data.slice(0, 4));
			console.log('premium products :', response.data.data);
		};
		fetchData();
	}, []);

	return (
		<div className='my-10'>
			<div className='flex flex-col px-7 sm:flex-row sm:justify-between items-center sm:items-start'>
				<h1
					data-aos='fade-right'
					className='text-[#F24C4C] sm:text-5xl text-2xl font-semibold  sm:text-left'
					style={{ fontFamily: 'Playfair Display, serif' }}>
					Premium <span className='text-black'>PET ACCESSORIES</span>
				</h1>
				<NavLink to='/collection1'>
					<button
						data-aos='fade-left'
						className='rounded-full bg-[#F24C4C] px-4 py-3 font-semibold text-white mt-4 sm:mt-0'>
						VIEW ALL
					</button>
				</NavLink>
			</div>

			<div className='mt-[40px] sm:mt-8 mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center'>
				{premimumProducts.map((item, index) => (
					<div
						data-aos='fade-left'
						data-aos-anchor='#example-anchor'
						data-aos-offset='500'
						data-aos-duration='500'
						key={index}
						className='w-full border border-gray-300 pb-4 max-w-[280px] bg-white  rounded-lg'>
						<AccessProductItem
							id={item._id}
							image={item.image}
							price={item.price}
							name={item.name}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
