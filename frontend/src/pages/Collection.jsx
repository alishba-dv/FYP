import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { IoIosArrowForward } from 'react-icons/io';
import { FoodProductItem } from '../components/FoodProductItem';
import axios from 'axios';

const Collection = () => {
	const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
	const { search, showSearch } = useContext(ShopContext);
	const [products, setProducts] = useState([]); // Fixed initial state
	const [filterProducts, setFilterProducts] = useState([]);
	const [category, setCategory] = useState(null);
	const [subcategory, setSubcategory] = useState(null);
	const [value, setValue] = useState(false);

	const handleFilter = (selectedCategory) => {
		setCategory((prev) =>
			prev === selectedCategory ? null : selectedCategory
		);
	};

	const handleFilterSub = (selectedSubcategory) => {
		setSubcategory((prev) =>
			prev === selectedSubcategory ? null : selectedSubcategory
		);
	};

	const applyFilter = () => {
		let filtered = [...products]; // Copy the product array

		if (search && showSearch) {
			filtered = filtered.filter((item) =>
				item.name.toLowerCase().includes(search.toLowerCase())
			);
		}

		if (category) {
			filtered = filtered.filter((item) => item.Animal_Category === category);
		}

		if (subcategory) {
			filtered = filtered.filter((item) => item.subcategory === subcategory);
		}

		setFilterProducts(filtered);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.post(
					`http://${host}:8080/api/collection`
				);
				console.log('Response:', response.data.data);
				setProducts(response.data.data);
				setFilterProducts(response.data.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		applyFilter();
	}, [category, subcategory, search, showSearch]);

	return (
		<div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
			{/* Filter Section */}
			<div className='min-w-[200px] sm:min-w-[250px]'>
				<p
					onClick={() => setValue(!value)}
					className='my-4 ml-4 text-2xl font-semibold flex items-center cursor-pointer gap-2 hover:text-[#F24C4C] transition duration-300 ease-in-out sm:hidden'>
					Filter
					<IoIosArrowForward
						className={`pt-1 transform ${
							value ? 'rotate-90' : ''
						} transition-transform duration-300`}
					/>
				</p>

				{/* Pet Categories */}
				<div className={`pl-5 py-4 mt-4 ${value ? '' : 'hidden sm:block'}`}>
					<p className='mb-3 text-lg font-semibold text-gray-800'>
						PET CATEGORIES
					</p>
					<div className='flex flex-col gap-3 text-sm font-medium text-gray-600'>
						<p
							className={`cursor-pointer px-2 py-1 ${
								category === 'Cats' ? 'text-[#F24C4C]' : 'text-gray-600'
							}`}
							onClick={() => handleFilter('Cats')}>
							Cats
						</p>
						<hr className='border-t border-gray-300' />
						<p
							className={`cursor-pointer px-2 py-1 ${
								category === 'Dogs' ? 'text-[#F24C4C]' : 'text-gray-600'
							}`}
							onClick={() => handleFilter('Dogs')}>
							Dogs
						</p>
						<hr className='border-t border-gray-300' />
						<p
							className={`cursor-pointer px-2 py-1 ${
								category === 'Others' ? 'text-[#F24C4C]' : 'text-gray-600'
							}`}
							onClick={() => handleFilter('Others')}>
							Others
						</p>
						<hr className='border-t border-gray-300' />
					</div>
				</div>

				{/* Food Categories */}
				<div className={`pl-5 py-4 my-6 ${value ? '' : 'hidden sm:block'}`}>
					<p className='mb-3 text-lg  font-semibold text-gray-800'>
						FOOD CATEGORIES
					</p>
					<div className='flex flex-col gap-3 text-sm font-medium text-gray-600'>
						<p
							className={`cursor-pointer px-2 py-1 ${
								subcategory === 'Beef' ? 'text-[#F24C4C]' : 'text-gray-600'
							}`}
							onClick={() => handleFilterSub('Beef')}>
							Beef
						</p>
						<hr className='border-t border-gray-300' />
						<p
							className={`cursor-pointer px-2 py-1 ${
								subcategory === 'Fish' ? 'text-[#F24C4C]' : 'text-gray-600'
							}`}
							onClick={() => handleFilterSub('Fish')}>
							Fish
						</p>
						<hr className='border-t border-gray-300' />
						<p
							className={`cursor-pointer px-2 py-1 ${
								subcategory === 'Chicken' ? 'text-[#F24C4C]' : 'text-gray-600'
							}`}
							onClick={() => handleFilterSub('Chicken')}>
							Chicken
						</p>
						<hr className='border-t border-gray-300' />
						<p
							className={`cursor-pointer px-2 py-1 ${
								subcategory === 'Others' ? 'text-[#F24C4C]' : 'text-gray-600'
							}`}
							onClick={() => handleFilterSub('Others')}>
							Others
						</p>
						<hr className='border-t border-gray-300' />
					</div>
				</div>
			</div>

			{/* Product Grid */}
			<div className='flex-1'>
				<h1
					data-aos='fade-down'
					className='text-[#F24C4C] text-5xl sm:ml-0 ml-4 font-semibold sm:text-left mb-10'>
					FOOD <span className='text-black'>COLLECTION</span>
				</h1>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 justify-items-center'>
					{filterProducts.map((item) => (
						<div
							data-aos='fade-right'
							key={item._id}
							className='w-full max-w-[280px] bg-white pb-4 rounded-lg border border-gray-300'>
							<FoodProductItem
								id={item._id}
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

export default Collection;
