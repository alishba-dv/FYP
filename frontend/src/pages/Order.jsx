import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cartimage from '../assets/emptycart.png';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"; // Importing the js-cookie library

const Orders = () => {
	const navigate = useNavigate();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true); // To show loading state
	const [error, setError] = useState(null);
	const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				// const token = localStorage.getItem('token');
				const token=Cookies.get("token");
				// const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];



				console.log('Token from order.jsx: ', token);
				// const email = window.localStorage.getItem('curr_userEmail');
				const email=Cookies.get("curr_Name");
				console.log('Current user email at order fetch', email);

				const response = await axios.post(
					`http://${host}:8080/api/auth/orderFetch`,token,
					
					{
					  withCredentials: true, // This allows credentials to be sent
					}
				  );
				  

				console.log('Order.jsx response: ', response);

				// Ensure the response contains the correct data structure
				if (response.data && response.data.orderDetails) {
					setOrders(response.data.orderDetails);
					console.log('Orders: ', response.data.orderDetails);
				} else {
					setError('No orders found.');
				}
			} catch (err) {
				console.error('Error fetching orders:', err);
				if (err.response && err.response.status === 400) {
					// localStorage.clear();

					toast.error(`Session expired. Please Login again`, {
						position: 'top-right',
						style: { marginRight: '100px' },
						autoClose: false,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						theme: 'colored',
					});

					toast.info(
						<div>
							Login Here!{' '}
							<a
								href='/login'
								style={{ color: 'red', textDecoration: 'underline' }}>
								Login
							</a>
						</div>,
						{
							position: 'top-right',
							autoClose: false, // Auto-dismiss after 5 seconds
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
						}
					);
				}

				setError('Failed to load orders. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();

		return () => {
			toast.dismiss();
		};
	}, []);

	if (loading) {
		return <div>Loading orders...</div>;
	}

	if (error) {
		return <div className='text-red-500 text-center mt-4'>{error}</div>;
	}

	return (
		<div className='p-4'>
			<div className='my-8 sm:my-10'>
				<h1 className='text-[#F24C4C] text-3xl sm:text-5xl font-semibold sm:text-left'>
					YOUR <span className='text-black'>ORDERS</span>
				</h1>
			</div>
			{orders.length > 0 ? (
				<div className='overflow-x-auto'>
					<table className='min-w-full bg-white border border-gray-300'>
						<thead>
							<tr className='bg-[#F24C4C] text-white'>
								<th className='border p-2'>#</th>
								<th className='border p-2'>Name</th>
								<th className='border p-2'>Email</th>
								<th className='border p-2'>Phone</th>
								<th className='border p-2'>Total Price</th>
								<th className='border p-2'>Payment Status</th>
								<th className='border p-2'>Cart Items</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order, index) => (
								<tr
									key={order._id}
									className='text-center border-t'>
									<td className='border p-2'>{index + 1}</td>
									<td className='border p-2'>
										{order.firstName} {order.lastName}
									</td>
									<td className='border p-2'>{order.email}</td>
									<td className='border p-2'>{order.phone}</td>
									<td className='border p-2'>Rs {order.total_price}</td>
									<td className='border p-2'>{order.payment_status}</td>
									<td className='border p-2'>
										<div className='overflow-x-auto'>
											<table className='min-w-full'>
												<thead>
													<tr className='bg-[#F24C4C] text-white'>
														<th className='border p-2'>Product Name</th>
														<th className='border p-2'>Quantity</th>
														<th className='border p-2'>Price</th>
													</tr>
												</thead>
												<tbody>
													{order?.cartItem &&
														Object.keys(order.cartItem).map((key) => {
															const item = order.cartItem[key];
															return (
																<tr
																	key={key}
																	className='text-center border-t'>
																	<td className='border p-2'>{item.name}</td>
																	<td className='border p-2'>
																		{item.quantity}
																	</td>
																	<td className='border p-2'>{item.Price}</td>
																</tr>
															);
														})}
												</tbody>
											</table>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div className='flex flex-col items-center justify-center p-6'>
					<img
						src={cartimage}
						alt='Empty Cart'
						className='w-40 h-40 mb-4'
					/>
					<p className='text-2xl font-semibold text-gray-700'>
						🛒 No Orders Yet!
					</p>
					<p className='text-gray-500 mt-2'>
						Explore our store and place your first order.
					</p>
					<button
						onClick={() => navigate('/')}
						className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all'>
						Browse Products
					</button>
				</div>
			)}
		</div>
	);
};

export default Orders;
