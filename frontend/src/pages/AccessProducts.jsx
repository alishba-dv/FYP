import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { AccessSubProducts } from '../components/AccessSubProducts';
import axios from 'axios';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'; // Import the icons

const AccessProducts = () => {
	const { productid } = useParams();
	const { accessoriesProduct, currency, addToCart } = useContext(ShopContext);
	const [productData, setProductData] = useState(null);
	const [isOutOfStock, setIsOutOfStock] = useState(false); // State to track out-of-stock status
	const [currentIndex, setCurrentIndex] = useState(0);
	const host = window.location.hostname === 'localhost'
	? 'localhost'
	: '0.0.0.0';
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

				const acc = response.data.data.find((item) => item._id === productid);

				if (acc) {
					setProductData(acc);

					if (acc.quantity <= 0) {
						setIsOutOfStock(true);
					}
				} else {
					console.error('Product not found!');
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [productid]);

	const handleNext = (e) => {
		e.preventDefault();
		setCurrentIndex((prevIndex) => (prevIndex + 1) % productData.image.length);
	};

	const handlePrev = (e) => {
		e.preventDefault();
		setCurrentIndex(
			(prevIndex) =>
				(prevIndex - 1 + productData.image.length) % productData.image.length
		);
	};

	const handleAddToCart = () => {
		if (isOutOfStock) {
			alert('This product is out of stock.');
			return;
		}

		addToCart({
			itemId: productData._id,
			type: 'accessoriesProduct',
		});
	};

	if (!productData) return <div>Loading...</div>;

	return (
		<>
			<div className='mb-8 mt-10 sm:mb-10 flex flex-col items-center'>
				<h1 className='text-[#F24C4C] text-3xl sm:text-5xl text-center font-semibold'>
					PRODUCT <span className='text-black'>DETAILS</span>
				</h1>

				<div className='flex justify-center items-start  w-full max-w-6xl gap-16 sm:gap-16 flex-col sm:flex-row mt-8'>
					{/* Product Image with Navigation Icons */}
					<div className='overflow-hidden rounded-lg relative max-w-[500px] w-full'>
						{Array.isArray(productData.image) &&
						productData.image.length > 0 ? (
							<>
								<img
									src={`http://${host}:8080/uploads/${productData.image[currentIndex]}`}
									className='hover:scale-110 transition ease-in-out w-full object-contain max-h-[500px]'
									alt={productData.name || 'Product Image'}
								/>
								{productData.image.length > 1 && (
									<>
										<FaAngleLeft
											onClick={handlePrev}
											className='absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-70'
											size={30}
										/>
										<FaAngleRight
											onClick={handleNext}
											className='absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-70'
											size={30}
										/>
									</>
								)}
							</>
						) : (
							<p className='text-xl text-gray-600'>No image available</p>
						)}
					</div>

					{/* Product Details */}
					<div className='flex-1 sm:mt-20 sm:mx-0 mx-5 mt-2 max-w-[500px]'>
						<h1 className='font-medium text-2xl'>{productData.name}</h1>
						<p className='mt-5 text-3xl font-medium'>
							RS.
							{productData.price}
						</p>
						<p className='mt-5 text-gray-500'>{productData.description}</p>

						{isOutOfStock && (
							<p className='text-red-500 font-bold mt-5'>Out of Stock</p>
						)}

						<div className='flex mt-6'>
							<button
								onClick={handleAddToCart}
								className='bg-[#F24C4C] text-white px-8 py-3 text-sm'
								disabled={isOutOfStock}>
								{isOutOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}
							</button>

							<NavLink to='/cart'>
								<button className='bg-[#F24C4C] ml-5 text-white px-8 py-3 text-sm'>
									VIEW CART
								</button>
							</NavLink>
						</div>
					</div>
				</div>
			</div>
			{/* Related Products */}
			<AccessSubProducts
				category={productData.category}
				subcategory={productData.subcategory}
			/>
		</>
	);
};

export default AccessProducts;
