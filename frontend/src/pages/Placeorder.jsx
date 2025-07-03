import React, { useContext, useState } from 'react';
import { CartCalculator } from '../components/CartCalculator';
import { ShopContext } from '../context/ShopContext';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const citiesOfPakistan = [
	'Karachi',
	'Lahore',
	'Islamabad',
	'Rawalpindi',
	'Faisalabad',
	'Multan',
	'Peshawar',
	'Quetta',
	'Sialkot',
	'Gujranwala',
	'Hyderabad',
	'Sargodha',
	'Bahawalpur',
	'Sukkur',
	'Larkana',
];

const statesOfPakistan = [
	'Punjab',
	'Sindh',
	'Khyber Pakhtunkhwa',
	'Balochistan',
	'Gilgit-Baltistan',
	'Azad Jammu & Kashmir',
	'Islamabad Capital Territory',
];

const Placeorder = () => {
	const queryParams = new URLSearchParams(window.location.search);
	const { navigate, cartItem,  delivery_fee, setCartItem,cartAmount } =
		useContext(ShopContext);
		const host = window.location.hostname === 'localhost'
		? 'localhost'
		: '0.0.0.0'; 
	useEffect(() => {
		toast.dismiss(); // Clear all toasts on component mount
	}, []);
	const sale = parseFloat(queryParams.get('sale')) || 0;

	const items = queryParams.getAll('item_id').map((id, index) => ({
		_id: id,
		quantity: queryParams.getAll('item_quantity')[index],
		type: queryParams.getAll('item_type')[index],
		name: queryParams.getAll('item_name')[index],
		price: queryParams.getAll('item_price')[index],
	}));

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		street: '',
		city: '',
		state: '',
		zipcode: '',
		country: 'Pakistan',
		phone: '',
		payment_status: '',
	});

	const proceedToCheckout = async () => {
		if (!validateFormData()) return;

		try {
			const total_price = (cartAmount);
			const response = await axios.post(`http://${host}:8080/api/order`, {
				...formData,
				cartItem,
				items,
				total_price,
			});

			if (response.status === 200) {
				toast.success('Order Placed Successfully');
				navigate('/Order');
				localStorage.removeItem('cart');
						setCartItem({});
			}
		} catch (err) {
			if (err.status === 404) {
				toast.success(err.data.message);
				// navigate('/Order');
				// setCartItem({});
			}
			console.error(err);
			toast.error('Error placing order');
		}
	};

	const handleStripePayment = async () => {
		if (!validateFormData()) return;

		try {
			const stripe = await loadStripe(
				'pk_test_51Qw1U8BCqcG9036LlgQ5ruG89O2Jx9CoiNVnfAaJwgULAxLTWaWvo1WU94flOX0Rk1BmmtzjGcZfCBsVS4ZInnk300gUQ4w3EJ'
			);
			const total_price =  cartAmount;

			const body = {
				products: Object.values(cartItem), // Ensure it's always an array
				customer_details: formData,
				metadata: {
					// cartItem: JSON.stringify(cartItem),
					total_price: total_price.toString(),
					...formData, // Spread formData fields to avoid duplication
				},
				items,
				total_price,
			};

			console.log('Body from placeorder.jsx: ', body);

			const response = await fetch(
				`http://${host}:8080/api/create-checkout-session`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body),
				}
			);

			if (!response.ok) {
				const errorMessage = await response.text();
				console.error('Error from backend:', errorMessage);
				toast.error(`Failed to create Stripe session. Please try again.`, {
					position: 'top-right',
					style: { marginRight: '100px' },

					autoClose: true,
				});
				return;
			}

			const session = await response.json();

			if (!session || !session.id) {
				toast.error(`Invalid Stripe session. Try again later`, {
					position: 'top-right',
					style: { marginRight: '100px' },

					autoClose: true,
				});
				return;
			}

			toast.success(`Redirecting to Stripe checkout...`, {
				position: 'top-right',
				style: { marginRight: '100px' },

				autoClose: true,
			});

			const result = await stripe.redirectToCheckout({ sessionId: session.id });
			if (result.error) {
				console.error('Stripe redirect error:', result.error);
				toast.error(`Failed to redirect to Stripe checkout`, {
					position: 'top-right',
					style: { marginRight: '100px' },

					autoClose: true,
				});
			}
		} catch (error) {
			console.error('Error during Stripe process:', error);
			toast.error(
				'An unexpected error occurred.',
				{
					position: 'top-right',
					style: { marginRight: '100px' },

					autoClose: true,
				}
			);
		}
	};

	const validateFormData = () => {
		const requiredFields = [
			'firstName',
			'lastName',
			'email',
			'street',
			'city',
			'state',
			'zipcode',
			'country',
			'phone',
			'payment_status',
		];

		for (let field of requiredFields) {
			const value = formData[field]?.trim() || '';

			if (!value) {
				toast.error(`${field} is missing`, {
					position: 'top-right',
					style: { marginRight: '100px' },
					autoClose: true,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: 'colored',
				});
				return false;
			}

			// Ensure fields like name, address, state, and country have at least one letter
			if (['firstName', 'lastName', 'street'].includes(field)) {
				if (!/[A-Za-z]/.test(value)) {
					toast.error(`${field} must contain at least one letter`, {
						position: 'top-right',
						style: { marginRight: '100px' },
						autoClose: true,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						theme: 'colored',
					});
					return false;
				}
			}

			// Email format validation

			if (field === 'email' && !/^[\w.-]+@[\w.-]+\.\w+$/.test(value)) {
				toast.error('Invalid email format', {
					position: 'top-right',
					style: { marginRight: '100px' },
					autoClose: true,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: 'colored',
				});
				return false;
			}

			// Phone number validation (min length 10)
			if (field === 'phone' && value.length < 10) {
				toast.error('Phone number must be at least 10 digits', {
					position: 'top-right',
					style: { marginRight: '100px' },
					autoClose: true,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: 'colored',
				});
				return false;
			}

			// Zipcode validation (min length 5)
			if (field === 'zipcode' && value.length < 5) {
				toast.error('Zipcode must be at least 5 digits', {
					position: 'top-right',
					style: { marginRight: '100px' },
					autoClose: true,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: 'colored',
				});
				return false;
			}
		}
		return true;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handlePaymentSelect = (method) => {
		setFormData({ ...formData, payment_status: method });
	};

	return (
		<div className='flex flex-col min-h-[80vh]'>
			<div className='flex flex-col gap-4 w-full sm:max-w-[480px] mx-auto'>
				<div className='my-10 text-center'>
					<h1 className='text-[#F24C4C] text-3xl sm:text-5xl font-semibold'>
						DELIVER <span className='text-black'>INFO</span>
					</h1>
				</div>

				{/* Other Inputs */}
				{['firstName', 'lastName', 'email', 'street', 'zipcode', 'phone'].map(
					(field) => (
						<input
							key={field}
							name={field}
							onChange={handleInputChange}
							value={formData[field]}
							type={field === 'email' ? 'email' : 'text'}
							className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
							placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
						/>
					)
				)}

				{/* City Dropdown */}
				<select
					name='city'
					value={formData.city}
					onChange={handleInputChange}
					className='border border-gray-300 rounded py-1.5 px-3.5 w-full'>
					<option value=''>Select City</option>
					{citiesOfPakistan.map((city) => (
						<option
							key={city}
							value={city}>
							{city}
						</option>
					))}
				</select>

				{/* State Dropdown */}
				<select
					name='state'
					value={formData.state}
					onChange={handleInputChange}
					className='border border-gray-300 rounded py-1.5 px-3.5 w-full'>
					<option value=''>Select State</option>
					{statesOfPakistan.map((state) => (
						<option
							key={state}
							value={state}>
							{state}
						</option>
					))}
				</select>

				{/* Fixed Country Field */}
				<input
					name='country'
					value='Pakistan'
					readOnly
					className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-100 text-gray-700'
				/>
			</div>

			{/* Payment Section */}
			<div className='mt-auto w-full flex flex-col lg:flex-row justify-center items-center'>
				<div className='lg:w-1/2 w-full lg:pr-8'>
					<div className='mt-14 p-4 min-w-80'>
						<CartCalculator saleDiscount={sale} />
					</div>
				</div>

				<div className='lg:w-1/2 w-full'>
					<div className='p-4 flex flex-col items-center mt-6'>
						<h1 className='text-[#F24C4C] text-center text-3xl sm:text-5xl font-semibold'>
							PAYMENT <span className='text-black'>METHOD</span>
						</h1>

						<div className='flex gap-3 mt-6 mb-4 items-start justify-center flex-col lg:flex-row'>
							<div
								className='flex items-center gap-3  p-2 px-3 cursor-pointer'
								onClick={() => handlePaymentSelect('stripe')}>
								<p
									className={`min-w-3.5 h-3.5 border rounded-full ${
										formData.payment_status === 'stripe' ? 'bg-green-400' : ''
									}`}></p>
								<p className='text-gray-500 text-sm py-1.5 font-medium'>
									Stripe
								</p>
							</div>
							<div
								className='flex items-center gap-3  p-2 px-3 cursor-pointer'
								onClick={() => handlePaymentSelect('cod')}>
								<p
									className={`min-w-3.5 h-3.5 border rounded-full ${
										formData.payment_status === 'cod' ? 'bg-green-400' : ''
									}`}></p>
								<p className='text-gray-500 text-sm py-1.5 font-medium'>
									Cash on Delivery
								</p>
							</div>
						</div>

						{formData.payment_status === 'stripe' && (
							<button
								onClick={handleStripePayment}
								className='mt-4 px-4 py-2 bg-[#F24C4C] text-white rounded-lg'>
								PAY
							</button>
						)}
						{formData.payment_status === 'cod' && (
							<button
								onClick={proceedToCheckout}
								className='mt-4 px-4 py-2 bg-[#F24C4C] text-white rounded-lg'>
								PLACE ORDER
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Placeorder;
