import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { IoIosArrowForward } from 'react-icons/io';
import { MedProductItem } from '../components/MedProductItem';
import axios from 'axios';

export default function MedicineCollection() {
	const { search, showSearch } = useContext(ShopContext);
	const [value, setValue] = useState(false);
	const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
	// Store API data
	const [medicineProducts, setMedicineProducts] = useState([]);
	const [filterProducts, setFilterProducts] = useState([]);
	const [category, setCategory] = useState(null);
	const [subcategory, setSubcategory] = useState(null);

	// Fetch data from API
	useEffect(() => {
		const fetchMedicines = async () => {
			try {
				const response = await axios.post(
					`http://${host}:8080/api/Medicines`
				);
				setMedicineProducts(response.data.data);
			} catch (error) {
				console.error('Error fetching medicine data:', error);
			}
		};
		fetchMedicines();
	}, []);

	// Toggle Category Filter
	const handleFilter = (categoryValue) => {
		setCategory((prev) => (prev === categoryValue ? null : categoryValue));
	};

	// Toggle Subcategory Filter
	const handleFilterSub = (subcategoryValue) => {
		setSubcategory((prev) =>
			prev === subcategoryValue ? null : subcategoryValue
		);
	};

	// Apply Search and Category/Subcategory Filters
	const applyFilter = () => {
		let filtered = [...medicineProducts];
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

	// Apply Filters when dependencies change
	useEffect(() => {
		applyFilter();
	}, [category, subcategory, search, showSearch, medicineProducts]);

	return (
		<div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
			<div className='min-w-[200px] ml-4 mt-0 sm:mt-16 sm:min-w-[250px]'>
				<p
					onClick={() => setValue(!value)}
					className='my-4 text-2xl font-semibold flex items-center cursor-pointer gap-2 hover:text-[#F24C4C] transition duration-300 ease-in-out sm:hidden'>
					Filter
					<IoIosArrowForward
						className={`pt-1 transform ${
							value ? 'rotate-90' : ''
						} transition-transform duration-300`}
					/>
				</p>

				{/* Pet Categories */}
				<div
					className={`pl-5 py-4 mt-4 transition-all duration-300 ease-in-out ${
						value ? '' : 'hidden sm:block'
					}`}>
					<p className='mb-3 text-lg font-semibold text-gray-800'>
						PET CATEGORIES
					</p>
					<div className='flex flex-col gap-3 text-sm font-medium text-gray-600'>
						{['Cats', 'Dogs'].map((pet) => (
							<div key={pet}>
								<p
									className={`cursor-pointer px-2 py-1 transition duration-300 ease-in-out ${
										category === pet ? 'text-[#F24C4C]' : 'text-gray-600'
									}`}
									onClick={() => handleFilter(pet)}>
									{pet}
								</p>
								<hr className='border-t border-gray-300' />
							</div>
						))}
					</div>
				</div>

				{/* Medicine Categories */}
				<div
					className={`pl-5 py-4 my-6 transition-all duration-300 ease-in-out ${
						value ? '' : 'hidden sm:block'
					}`}>
					<p className='mb-3 text-lg font-semibold text-gray-800'>
						MEDICINE CATEGORIES
					</p>
					<div className='flex flex-col gap-3 text-sm font-medium text-gray-600'>
						{['Tablets', 'Syrups', 'Injections', 'Others'].map((medicine) => (
							<div key={medicine}>
								<p
									className={`cursor-pointer px-2 py-1 transition duration-300 ease-in-out ${
										subcategory === medicine
											? 'text-[#F24C4C]'
											: 'text-gray-600'
									}`}
									onClick={() => handleFilterSub(medicine)}>
									{medicine}
								</p>
								<hr className='border-t border-gray-300' />
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Medicine Collection */}
			<div className='flex-1'>
				<div className='mb-10'>
					<h1
						data-aos='fade-down'
						className='text-[#F24C4C] text-5xl sm:ml-0 ml-4 font-semibold sm:text-left'>
						MEDICINES <span className='text-black'>COLLECTION</span>
					</h1>
				</div>

				{/* Display Filtered Products */}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 justify-items-center'>
					{filterProducts.map((item) => (
						<div
							data-aos='fade-right'
							key={item._id}
							className='w-full max-w-[280px] bg-white pb-4 rounded-lg border border-gray-300'>
							<MedProductItem
								id={item._id}
								image={item.image}
								price={item.price}
								name={item.name}
							/>
						</div>
					))}
					{filterProducts.length === 0 && (
						<p className='text-gray-500 col-span-full text-center'>
							No products found
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
