import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'; // Import the icons

export const FoodProductItem = ({ id, image, name, price }) => {
	const { currency } = useContext(ShopContext);
	const [currentIndex, setCurrentIndex] = useState(0);
	const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
	const handleNext = (e) => {
		e.preventDefault();
		setCurrentIndex((prevIndex) => (prevIndex + 1) % image.length);
	};

	const handlePrev = (e) => {
		e.preventDefault();
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + image.length) % image.length
		);
	};

	return (
		<Link
			className='text-gray-700 cursor-pointer'
			to={`/product/${id}`}>
			<div className='overflow-hidden rounded-lg relative'>
				{Array.isArray(image) && image.length > 0 ? (
					<>
						<img
							src={`http://${host}:8080/uploads/${image[currentIndex]}`}
							className='hover:scale-110 transition ease-in-out w-full'
							alt={name || 'Product Image'}
						/>
						{image.length > 1 && (
							<>
								<FaAngleLeft
									onClick={handlePrev}
									className='absolute left-2 top-1/2 transform -translate-y-1/2 text-black size-10 p-2 rounded-full cursor-pointer hover:bg-opacity-70'
									size={24}
								/>
								<FaAngleRight
									onClick={handleNext}
									className='absolute right-2 top-1/2 transform -translate-y-1/2 text-black size-10 p-2 rounded-full cursor-pointer hover:bg-opacity-70'
									size={24}
								/>
							</>
						)}
					</>
				) : (
					<p className='text-xl text-gray-600'>No image available</p>
				)}
			</div>
			<p
				className='pt-3 pb-1 text-3xl text-center'
				style={{ fontFamily: 'Playfair Display, serif' }}>
				{name}
			</p>
			<p className='font-medium text-2xl text-center'>
				{currency} <span className='text-[#F24C4C]'>{price}</span>
			</p>
		</Link>
	);
};
