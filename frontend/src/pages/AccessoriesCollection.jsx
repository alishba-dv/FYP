import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { IoIosArrowForward } from 'react-icons/io';
import { AccessProductItem } from '../components/AccessProductItem';
import axios from 'axios';

const AccessoriesCollection = () => {
	const { search, showSearch } = useContext(ShopContext);
	const [value, setValue] = useState(false);
	const [accessories, setAccessories] = useState([]); // Store fetched data
	const [filterProducts, setFilterProducts] = useState([]);
	const [category, setCategory] = useState('');
	const [subcategory, setSubcategory] = useState('');
	const host = window.location.hostname === 'localhost'
	? 'localhost'
	: '0.0.0.0';
	
	// Fetch data only once when the component mounts

	// Handle category filter
	const handleFilter = (e) => {
		const selectedCategory = e.target.value;
		setCategory((prev) => (prev === selectedCategory ? '' : selectedCategory));
	};

	// Handle subcategory filter
	const handleFilterSub = (e) => {
		const selectedSubcategory = e.target.value;
		setSubcategory((prev) =>
			prev === selectedSubcategory ? '' : selectedSubcategory
		);
	};

	const applyFilter = () => {
		let copy = accessories.slice();
		if (search && showSearch) {
			copy = copy.filter((item) =>
				item.name.toLowerCase().includes(search.toLowerCase())
			);
		}
		if (category) {
			copy = copy.filter((item) => item.Animal_Category === category);
		}
		if (subcategory) {
			copy = copy.filter((item) => item.subcategory === subcategory);
		}

		setFilterProducts(copy);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
				
				const response = await axios.post(
					`http://${host}:8080/api/Accessories`
				);
				console.log('Response: ', response);
				setAccessories(response.data.data); // Store original data
				setFilterProducts(response.data.data); // Initialize filtered data
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []); // Empty dependency array ensures it only runs once
	useEffect(() => {
		applyFilter();
	}, [category, subcategory, search, showSearch]);

	// useEffect(() => {
	// 	setFilterProducts(accessories);
	// }, [accessories]);

	return (
		<div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
			<div className='min-w-[200px] mt-0 sm:mt-16 sm:min-w-[250px]'>
				<p
					onClick={() => setValue(!value)}
					className='my-4 text-2xl ml-4 font-semibold flex items-center cursor-pointer gap-2 hover:text-[#F24C4C] transition duration-300 ease-in-out sm:hidden'>
					Filter
					<IoIosArrowForward
						className={`pt-1 transform ${
							value ? 'rotate-90' : ''
						} transition-transform duration-300`}
					/>
				</p>

				{/* Category Filter */}
				<div
					className={`pl-5 py-4 mt-4 transition-all duration-300 ease-in-out ${
						value ? '' : 'hidden sm:block'
					}`}>
					<p className='mb-3 text-lg font-semibold text-gray-800'>
						PET CATEGORIES
					</p>
					<div className='flex flex-col gap-3 text-sm font-medium text-gray-600'>
						<p
							className={`cursor-pointer px-2 py-1 transition duration-300 ease-in-out ${
								category === 'Cats' ? 'text-[#F24C4C]' : 'text-gray-600'
							}`}
							onClick={() => handleFilter({ target: { value: 'Cats' } })}>
							Cats
						</p>
						<hr className='border-t border-gray-300' />
						<p
							className={`cursor-pointer px-2 py-1 transition duration-300 ease-in-out ${
								category === 'Dogs' ? 'text-[#F24C4C]' : 'text-gray-600'
							}`}
							onClick={() => handleFilter({ target: { value: 'Dogs' } })}>
							Dogs
						</p>
					</div>
				</div>

				{/* Subcategory Filter */}
				<div
					className={`pl-5 py-4 my-6 transition-all duration-300 ease-in-out ${
						value ? '' : 'hidden sm:block'
					}`}>
					<p className='mb-3 text-lg font-semibold text-gray-800'>
						ACCESSORY CATEGORIES
					</p>
					<div className='flex flex-col gap-3 text-sm font-medium text-gray-600'>
						<p
							className={`cursor-pointer px-2 py-1 transition duration-300 ease-in-out ${
								subcategory === 'Toys' ? 'text-[#F24C4C]' : 'text-gray-600'
							}`}
							onClick={() => handleFilterSub({ target: { value: 'Toys' } })}>
							Toys
						</p>
						<hr className='border-t border-gray-300' />
						<p
							className={`cursor-pointer px-2 py-1 transition duration-300 ease-in-out ${
								subcategory === 'Sand' ? 'text-[#F24C4C]' : 'text-gray-600'
							}`}
							onClick={() => handleFilterSub({ target: { value: 'Sand' } })}>
							Sand
						</p>
						<hr className='border-t border-gray-300' />
						<p
							className={`cursor-pointer px-2 py-1 transition duration-300 ease-in-out ${
								subcategory === 'Others' ? 'text-[#F24C4C]' : 'text-gray-600'
							}`}
							onClick={() => handleFilterSub({ target: { value: 'Others' } })}>
							Others
						</p>{' '}
						<hr className='border-t border-gray-300' />
					</div>
				</div>
			</div>

			{/* Product Display */}
			<div className='flex-1'>
				<div className='mb-10'>
					<h1 className='text-[#F24C4C] text-5xl sm:ml-0 ml-4 font-semibold sm:text-left'>
						ACCESSORIES <span className='text-black'>COLLECTION</span>
					</h1>
				</div>

				{/* Filtered Products */}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 justify-items-center'>
					{Array.isArray(filterProducts) &&
						filterProducts.map((item, index) => (
							<div
								key={index}
								className='w-full max-w-[280px] bg-white pb-4 rounded-lg border border-gray-300'>
								<AccessProductItem
									id={item._id}
									// image=<img src='http://${host}:8080/uploads/${item.image}'/>
									image={item.image}
									price={item.price}
									name={item.name}
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default AccessoriesCollection;
