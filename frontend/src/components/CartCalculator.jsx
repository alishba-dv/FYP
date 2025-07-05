import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

export const CartCalculator = () => {
	const { currency, delivery_fee, getCartAmount, discount, // Add final total to context value
		cartAmount,setCartAmount  } = useContext(ShopContext);
	const [subscriptionDiscountAmount, setSubscriptionDiscountAmount] = useState(0);
	const [saleDiscountAmount, setSaleDiscountAmount] = useState(0);
	const [finalTotal, setFinalTotal] = useState(0);
	const [saleDiscount, setSaleDiscount] = useState(0); // State for sale discount percentage
	const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
	useEffect(() => {
		const fetchCartData = async () => {
			try {
				// Fetch both cart amount and sale discount data using Promise.all
				const [amount, saleResponse] = await Promise.all([
					getCartAmount(), // Get cart amount from context
					axios.get(`http://${host}:8080/api/getsale`), // Fetch sale discount from backend
				]);

				setCartAmount(amount);

				// Subscription discount logic
				const subDiscount = amount * discount;

				// Sale discount logic
				let saleDisc = 0;
				if (saleResponse.data && saleResponse.data.isActive) {
					setSaleDiscount(saleResponse.data.discountPercentage);
					saleDisc = amount * (saleResponse.data.discountPercentage / 100);
				}

				setSubscriptionDiscountAmount(subDiscount);
				setSaleDiscountAmount(saleDisc);

				// Calculate final total after discounts and add delivery fee
				const totalAfterDiscounts = amount - subDiscount - saleDisc;
				setFinalTotal(totalAfterDiscounts + delivery_fee);
				setCartAmount(totalAfterDiscounts + delivery_fee);
			}
				 catch (error) {
				  console.error('Error fetching cart data or sale:', error);
				}
				
		};

		fetchCartData(); // Call the fetch function on component mount
	}, [getCartAmount, discount, delivery_fee,cartAmount]);

	return (
		<div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
			<div className="mb-6">
				<h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 text-center">
					CART <span className="text-[#F24C4C]">TOTAL</span>
				</h1>
			</div>

			<div className="bg-white p-4 rounded shadow-md">
				<h2 className="text-xl font-bold mb-4">Cart Summary</h2>

				{/* Show sale discount message if active */}
				{saleDiscount > 0 && (
					<div className="text-green-600 font-semibold mb-3">
						🎉 Sale is ON! {saleDiscount}% OFF on all products!
					</div>
				)}
			</div>

			{/* Cart pricing section */}
			<div className="flex flex-col gap-4 text-sm">
				{/* Subtotal */}
				<div className="flex justify-between py-2 px-4 bg-gray-50 rounded-md shadow-sm">
					<p className="text-gray-700">Total </p>
					<p className="font-medium text-gray-800">
						{currency}{cartAmount.toFixed(2)}
					</p>
				</div>

				{/* Subscription Discount */}
				<div className="flex justify-between py-2 px-4 bg-gray-50 rounded-md shadow-sm">
					<p className="text-gray-700">Subscription Discount Applied</p>
					<p className="font-medium text-red-500">
						-{currency}{subscriptionDiscountAmount.toFixed(2)}
					</p>
				</div>

				{/* Sale Discount */}
				<div className="flex justify-between py-2 px-4 bg-gray-50 rounded-md shadow-sm">
					<p className="text-gray-700">Sale Discount Applied</p>
					<p className="font-medium text-red-500">
						-{currency}{saleDiscountAmount.toFixed(2)}
					</p>
				</div>

				{/* Delivery Fee */}
				<div className="flex justify-between py-2 px-4 bg-gray-50 rounded-md shadow-sm">
					<p className="text-gray-700">Delivery Fee</p>
					<p className="font-medium text-gray-800">
						{currency}{delivery_fee.toFixed(2)}
					</p>
				</div>

				<hr className="my-4" />

				{/* Total */}
				<div className="flex justify-between py-3 px-4 bg-gray-100 rounded-md">
					<b className="text-lg text-gray-800">Total</b>
					<b className="text-lg font-semibold text-gray-900">
						{currency}{finalTotal.toFixed(2)}
					</b>
				</div>
			</div>
		</div>
	);
};
