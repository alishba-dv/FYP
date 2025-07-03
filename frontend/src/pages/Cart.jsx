import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';

import { ShopContext } from '../context/ShopContext';
import { MdDelete } from 'react-icons/md';
import { CartCalculator } from '../components/CartCalculator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
const Cart = () => {
	const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
	const {
		currency,
		cartItem,
		updateQuantity,
		navigate,
		getCartAmount,
		setCartItem,
		delivery_fee,
		setDelivery_fee,
		setdiscount,
	} = useContext(ShopContext);
	useEffect(() => {
		toast.dismiss(); // Clear all toasts on component mount
	}, []);

	const [message, setMessage] = useState(''); // To manage the message state
	const [sale, setsale] = useState(0);

	const userId = Cookies.get('userId');
	const [cartData, setCartData] = useState([]);
	const [products, setProducts] = useState([]);
	const [accessories, setAccessories] = useState([]);
	const [medicines, setMedicines] = useState([]);

	useEffect(() => {
		const updatedCart = Object.entries(cartItem).map(([key, item]) => ({
			...item,
			_id: key,
		}));
		setCartData(updatedCart);
	}, [cartItem]);
	// Fetch data from APIs
	const fetchData = async () => {
		try {
			const productRes = await axios.post(
				`http://${host}:8080/api/collection`
			);
			const accessories = await axios.post(
				`http://${host}:8080/api/Accessories`
			);
			const medicineRes = await axios.post(
				`http://${host}:8080/api/Medicines`
			);

			setProducts(productRes.data.data);
			setAccessories(accessories.data.data);
			setMedicines(medicineRes.data.data);
		} catch (error) {
			console.error(`Error fetching products:`, error);
		}
	};

	// Update cart data based on items in the cart
	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const updatedCart = [];
		for (const key in cartItem) {
			if (cartItem[key].quantity > 0) {
				updatedCart.push({
					image: cartItem[key].image[0].toString,
					name: cartItem[key].name,
					price: cartItem[key].Price,
					_id: key,
					quantity: cartItem[key].quantity,
					type: cartItem[key].type,
				});
			}
		}
		setCartData(updatedCart);
	}, [cartItem]);

	// Handle Checkout
	const CheckCart = async () => {
		if (!userId) {
			setMessage('Please log in to apply subscribed package features if any.');
		} else {
			setMessage('log in already');
			// navigate("/checkout");
		}

		if (cartData.length === 0) {
			toast.error('🛒 Your cart is empty! Add items to proceed.', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: `colored`,
				style: { marginRight: `100px` },
			});
			return;
		}

		try {
			// Calculate the total price with discount applied to the cart amount
			const total_price = (await getCartAmount()) + delivery_fee; // Get the total cart amount
			//   const discountAmount = cartAmount * discount;  // Apply the discount to the total cart amount
			//   const totalPrice = cartAmount - discountAmount + delivery_fee;  // Subtract discount and add delivery fee

			const response = await axios.post(`http://${host}:8080/api/checkout`, {
				cartItem,
<<<<<<< HEAD
				total_price,userId
=======
				total_price,
>>>>>>> 90cd219c228b5a0141eeb0d030ff8eca3a3897ad
			});

			console.log('Response with features: ', response);
			setsale(response.data.saleDiscount);
			console.log('Sale discount: ', response.data.saleDiscount);

			response.data.features.forEach((feature) => {
				switch (feature.toLowerCase()) {
					case 'free delivery':
						console.log('User has free delivery.');
						setDelivery_fee(0); // Set delivery fee to 0 if the user has "free delivery"
						break;

					//   case "10% off":
					// 	console.log("User has 10% off.");
					// 	setdiscount(0.10);  // Set the discount to 10%
					// 	break;

					default:
						const percentage = parseFloat(feature) / 100;
						console.log(`User has ${percentage * 100}% off.`);
						setdiscount(percentage); // Set the discount dynamically based on the extracted percentage
						break;
				}
			});

			const queryParams = cartData
				.map((item) => {
					let productData;
					switch (item.type) {
						case 'product':
							productData = products.find((pro) => pro._id === item._id);
							break;
						case 'accessoriesProduct':
							productData = accessories.find((pro) => pro._id === item._id);
							break;
						case 'medicineProducts':
							productData = medicines.find((pro) => pro._id === item._id);
							break;
						default:
							return '';
					}
					return `item_quantity=${item.quantity}&item_type=${item.type}&item_name=${productData?.name}&item_price=${productData?.price}&sale=${response.data.saleDiscount}`;
				})
				.join('|');

			if (response.status === 200) {
				navigate(`/Placeorder?${queryParams}`);
			} else if (response.status === 400 || response.status === 404) {
				toast.error(response.data.message);
			}
		} catch (err) {
			console.error('Error:', err.response?.data || err.message);
			toast.error(err.response?.data?.message || 'Error placing order');
		}
	};

	return (
		<div className='border-t pt-10 sm:pt-14 px-4'>
			<div className='mb-8 sm:mb-10'>
				<h1 className='text-[#F24C4C] text-3xl sm:text-5xl font-semibold sm:text-left'>
					YOUR <span className='text-black'>CART</span>
				</h1>
			</div>

			<div className='bg-[#F24C4C] text-white py-4 px-1 grid grid-cols-5 text-center  items-center gap-1 text-sm'>
				<div className=' font-semibold'>Remove</div>
				<div className=' font-semibold'>Image</div>
				<div className=' font-semibold'>Name</div>
				<div className=' font-semibold'>Quantity</div>
				<div className=' font-semibold'>Price</div>
			</div>

			<div className=' py-8 px-2  text-black text-med'>
				{cartData.map((item, index) => {
					let productData;
					switch (item.type) {
						case 'product':
							productData = products.find((pro) => pro._id === item._id);
							break;
						case 'accessoriesProduct':
							productData = accessories.find((pro) => pro._id === item._id);
							break;
						case 'medicineProducts':
							productData = medicines.find((pro) => pro._id === item._id);
							break;
						default:
							break;
					}

					return (
						<div
							key={index}
							className='py-4 border-t border-b grid grid-cols-5 items-center gap-2'>
							<div>
								<MdDelete
									onClick={() => updateQuantity(item._id, 0)}
									className='w-6 h-6 ml-5 sm:ml-[150px] cursor-pointer text-red-500'
								/>
							</div>

							<div className='flex justify-center'>
								<img
									src={`http://${host}:8080/uploads/${productData?.image}`}
									className='w-12'
								/>
							</div>

							<div className='text-left'>
								<p className='text-sm font-medium text-red-500'>
									{productData?.name}
								</p>
							</div>

							<div className='text-center'>
								<input
									onChange={(e) => {
										const value = Number(e.target.value);
										if (value > 0) updateQuantity(item._id, value);
									}}
									className='border w-12 px-2 py-1 text-center'
									type='number'
									min={1}
									value={item.quantity}
								/>
							</div>

							<div className='text-right'>
								<p className='mr-2 text-sm'>
									{currency}
									{productData?.price}
								</p>
							</div>
						</div>
					);
				})}
			</div>

			<div className='mt-10'>
				<CartCalculator saleDiscount={sale} />

				<div className='w-full text-center'>
					{!userId && (
						<div className='text-red-500 mb-4'>
							<span>
								Please{' '}
								<NavLink
									to='/login'
									className='text-blue-500'>
									log in
								</NavLink>{' '}
								to apply subscribed package features.
							</span>
						</div>
					)}

					{userId && (
						<div className='text-red-500 my-10 '>
							<span>Subscribed features will be applied after checkout.</span>
						</div>
					)}
					<button
						onClick={CheckCart}
						className='mt-4 px-4 py-2 bg-[#F24C4C] text-white rounded-lg'>
						PROCEED TO CHECKOUT
					</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
