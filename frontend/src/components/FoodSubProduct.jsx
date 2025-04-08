import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FoodProductItem } from './FoodProductItem';

export const FoodSubProduct = ({ category, subcategory }) => {
	const { product } = useContext(ShopContext);
	const [related, setRelated] = useState([]);

	useEffect(() => {
		if (product.length > 0) {
			const filteredProducts = product.filter(
				(item) => item.category === category && item.subcategory === subcategory
			);
			setRelated(filteredProducts);
			console.log(filteredProducts);
		}
	}, [product, category, subcategory]);

	return (
		<div className='my-24'>
			<div>
				<h1
					data-aos='fade-right'
					className='text-[#F24C4C] text-3xl  font-semibold ml-5'>
					RELATED <span className='text-black'>PRODUCTS</span>
				</h1>
			</div>
			<div
				data-aos='fade-right'
				className='grid mt-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
				{related.map((item) => (
					<FoodProductItem
						key={item._id}
						id={item._id}
						image={item.image}
						price={item.price}
						name={item.name}
					/>
				))}
			</div>
		</div>
	);
};
