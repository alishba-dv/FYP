import React, { useState, useEffect } from 'react';
import Image1 from '../assets/image5.jpg';
import { currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 	{
// 		_id: 1,
// 		name: 'Product 1',
// 		description: 'Description for Product 1',
// 		price: 10.99,
// 		image: Image1,
// 		Pro_category: 'Food Product',
// 		Animal_Category: 'Cats',
// 		Food_Category: 'Beef',
// 		quantity: 10,
// 	},
// 	{
// 		_id: 2,
// 		name: 'Product 2',
// 		description: 'Description for Product 2',
// 		price: 15.99,
// 		image: Image1,
// 		Pro_category: 'Medicine',
// 		Animal_Category: 'Dogs',
// 		Food_Category: 'Chicken',
// 		quantity: 5,
// 	},
// ];

export const List = () => {
	
	const host = window.location.hostname === 'localhost'
	? 'localhost'
	: '0.0.0.0'; // Or container name if you're accessing between Docker containers



	const categories = {
		"Food Product": ["Chicken", "Beef", "Fish", "Others"],
		"Medicine": ["Tablets", "Syrups", "Injections", "Others"],
		"Accessories": [ "Sand", "Toys", "Others"],
	  };


	  const animalCategory = ["Cats", "Dogs", "Others"];

		const [selectedCategory, setSelectedCategory] = useState("");
		const [selectedSubcategory, setSelectedSubcategory] = useState("");
		const [selectedAnimal, setSelectedAnimal] = useState("");
	  
	  
	  
		
	const [products, setProducts] = useState([]);
	const [editingProduct, setEditingProduct] = useState(null);
useEffect(() => {
		

		return () => {
      toast.dismiss();
    };
	}, []);
	
	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = localStorage.getItem('token');
				console.log('Token from list of admin: ', token);
				const response = await axios.post(
					`http://${host}:8080/api/admin/auth/List`,
					{},
					{
					withCredentials:true,	
					}
				);

				toast.success(response.data.message);
				console.log('Response: ', response);
				setProducts(response.data.data);
			} catch (error) {
				if(error.response.status==400){
  toast.error(`Session expired.`, {
                position: 'top-right',
                // style: { marginRight: '100px' },

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
						href='/'
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
				});
		}
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, []);

	const handleEdit = (product) => {
		setEditingProduct(product);
	};

	const handleSave = async (e) => {
		e.preventDefault();
       console.log("Edited data: ",editingProduct)
		try {
			const token = localStorage.getItem('token');
			console.log('Token: update product ', token);
			const response = await axios.post(
				`http://${host}:8080/api/admin/auth/updateProduct`,
				{
					pid: editingProduct._id,
					productDetails: editingProduct,
				},
				{
				   withCredentials:true,	
				}
			);
			// toast.success(response.data.message, {
            //     position: 'top-right',
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     theme: 'colored',
			// 	// style: { marginRight: '100px' },
            // });
if (response.status ===400) {
				toast.error("Invalid", {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: 'colored',
				})};
			if (response.status === 200) {
				toast.success(`Product updated successfully`, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: 'colored',
				});
				window.location.reload();


			} else {
				toast.error(`Failed to update product`, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: 'colored',
				});
			}
		} catch (error) {
			console.error('Error updating product:', error);
			toast.error(error.response.data.message, {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: 'colored',
			});
		}
	};
	const handleCategoryChange = (e) => {
		const { name, value } = e.target;
		setEditingProduct({ ...editingProduct, [name]: value });
	 };
	 
	 const handleDelete = async (productId) => {
		toast(
			<div style={{
			  backgroundColor: '#fff',
			  padding: '25px 30px',
			  borderRadius: '12px',
			  textAlign: 'center',
			  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
			  minWidth: '300px',
			  fontFamily: 'Arial, sans-serif',
			}}>
			  <div style={{
				fontSize: '28px',
				color: '#e74c3c',
				marginBottom: '10px',
			  }}>
				⚠️
			  </div>
			  <h3 style={{
				margin: '0 0 10px',
				fontSize: '18px',
				color: '#e74c3c',
			  }}>
				Confirm Deletion
			  </h3>
			  <p style={{
				margin: 0,
				color: '#555',
				fontSize: '14px'
			  }}>
				Are you sure you want to delete this product?
			  </p>
		  
			  <div style={{
				marginTop: '20px',
				display: 'flex',
				justifyContent: 'center',
				gap: '15px',
			  }}>
				<button
				  onClick={() => {
					deleteProduct(productId);
					toast.dismiss();
				  }}
				  style={{
					backgroundColor: '#e74c3c',
					color: '#fff',
					border: 'none',
					padding: '10px 20px',
					borderRadius: '6px',
					cursor: 'pointer',
					fontWeight: 'bold',
				  }}
				  onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
				  onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
				>
				  Yes, Delete
				</button>
				<button
				  onClick={() => toast.dismiss()}
				  style={{
					backgroundColor: '#fff',
					color: '#e74c3c',
					border: '2px solid #e74c3c',
					padding: '10px 20px',
					borderRadius: '6px',
					cursor: 'pointer',
					fontWeight: 'bold',
				  }}
				  onMouseOver={(e) => e.target.style.backgroundColor = '#fbeaea'}
				  onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
				>
				  Cancel
				</button>
			  </div>
			</div>,
			{
			  position: "top-center",
			  autoClose: false,
			  closeOnClick: false,
			  draggable: false,
			  closeButton: false,
			  theme: 'light',
			}
		  );
			  
		
	};
	
	const deleteProduct = async (productId) => {
		const token = localStorage.getItem('token');
	
		try {
			const response = await axios.post(
				'http://${host}:8080/api/admin/auth/deleteProduct',
				{ pid: productId },
				{
					withCredentials:true,
				}
			);
	
			toast.dismiss(); // Close any open confirmation toast
	
			if (response.status === 200) {
				toast.success(`Product deleted successfully`, { position: 'top-right', autoClose: 3000 });
				// setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
				window.location.reload();
			}
		} catch (err) {
			toast.dismiss(); // Close any open confirmation toast
	
			if (err.response?.status === 400) {
				localStorage.clear();
	
				toast.error(`Session expired. Please Login again`, {
					position: 'top-right',
					autoClose: false,
					theme: 'colored',
				});
	
				toast.info(
					<div>
						Login Here!{' '}
						<a href='/login' style={{ color: 'red', textDecoration: 'underline' }}>
							Login
						</a>
					</div>,
					{ position: 'top-right', autoClose: false }
				);
			} else if (err.response?.status === 404) {
				toast.error(`No product found`, { position: 'top-right', autoClose: 3000 });
			} else {
				toast.error(`Failed to delete product`, { position: 'top-right', autoClose: 3000 });
			}
		}
	};
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditingProduct({ ...editingProduct, [name]: value });
	};

	 
// const initialData = [

	return (
		<div className='mt-12 sm:mt-10 px-8 sm:px-10 lg:px5'>
		<div className='mb-10 sm:mb-12'>
			<h1 className='text-2xl sm:text-4xl text-red-500 font-semibold'>
				ALL PRODUCT <span className='text-black'>LIST</span>
			</h1>
		</div>

		{/* Check if products array is empty */}
		{products?.length === 0 ? (
			<div className="text-center text-lg font-bold text-gray-500 my-10">
				No products available. Add new products to showcase them here!
			</div>
		) : (
			<div className='flex flex-col gap-3'>
				<div className='hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center py-3 px-4 text-white bg-red-500 rounded-md text-xs sm:text-sm'>
					<b>Image</b>
					<b>Name</b>
					{/* <b>Diptionscr</b> */}
					<b>Product Cat.</b>
					<b>Animal Cat.</b>
					<b>Sub Cat.</b>
					<b>Price</b>
					<b>Quantity</b>
					<b className='text-center'>Actions</b>
				</div>

				{/* Mapping through products */}
				{products?.map((item) => (
					<div
						key={item._id}
						className='grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border'
					>
						<div className='flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory p-6'>
							{(Array.isArray(item.image) ? item.image : [item.image]).map((img, index) => (
								<img
									key={index}
									src={`http://${host}:8080/uploads/${img}`}
									alt={`${item.name} - ${index + 1}`}
									className='w-20 h-20 object-cover rounded-md'
								/>
							))}
						</div>

						<p className='text-center md:text-left font-medium'>{item.name}</p>
						<p className='text-center md:text-left text-sm text-gray-600'>{item.Pro_category}</p>
						<p className='text-center md:text-left text-sm text-gray-600'>{item.Animal_Category}</p>
						<p className='text-center md:text-left text-sm text-gray-600'>{item.subcategory}</p>
						<p className='text-center md:text-left font-medium'>{currency}{item.price}</p>
						<p className='text-center md:text-left font-medium'>{item.quantity}</p>

						<div className='flex justify-center gap-2'>
							<button
								onClick={() => handleEdit(item)}
								className='text-white py-2 px-3 bg-gray-600 hover:bg-gray-500 rounded-md text-sm transition-colors duration-200'>
								Edit
							</button>
							<button
								onClick={() => handleDelete(item._id)}
								className='text-white py-2 px-3 bg-red-500 hover:bg-red-500 rounded-md text-sm transition-colors duration-200'>
								Remove
							</button>
						</div>
					</div>
				))}
			</div>
		)}

{editingProduct && (
    <div className='p-4 bg-gray-100 rounded-lg shadow-md'>
<h1 className='text-2xl sm:text-4xl text-red-500 font-semibold'>
				Edit <span className='text-black'>Product</span>
			</h1>        
        <form onSubmit={handleSave} className="space-y-4">
            {/* Name */}
            <div>
                <label className='block text-sm font-medium'>Name</label>
                <input
                    type="text"
                    name="name"
                    value={editingProduct.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
			<div>
                <label className='block text-sm font-medium'>Description</label>
                <input
                    type="text"
                    name="description"
                    value={editingProduct.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            {/* Product Category Dropdown */}
            <div>
                <label className='block text-sm font-medium'>Product Category</label>
                <select
                    name="Pro_category"
                    value={editingProduct.Pro_category}
                    onChange={handleCategoryChange}
                    className="w-full px-3 py-2 border rounded-md"
                >
                    <option value="">Select Category</option>
                    {Object.keys(categories).map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {/* Subcategory Dropdown */}
            <div>
                <label className='block text-sm font-medium'>Subcategory</label>
                <select
                    name="subcategory"
                    value={editingProduct.subcategory}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                >
                    <option value="">Select Subcategory</option>
                    {categories[editingProduct.Pro_category]?.map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                    ))}
                </select>
            </div>

            {/* Animal Category Dropdown */}
            <div>
                <label className='block text-sm font-medium'>Animal Category</label>
                <select
                    name="Animal_Category"
                    value={editingProduct.Animal_Category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                >
                    <option value="">Select Animal</option>
                    {animalCategory.map((animal) => (
                        <option key={animal} value={animal}>{animal}</option>
                    ))}
                </select>
            </div>

            {/* Price */}
            <div>
                <label className='block text-sm font-medium'>Price</label>
                <input
                    type="number"
                    name="price"
                    value={editingProduct.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>

            {/* Quantity */}
            <div>
                <label className='block text-sm font-medium'>Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    value={editingProduct.quantity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>

            {/* Save Button */}
            <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-md ">
                Save Changes
            </button>
        </form>
    </div>
)}

		</div>
	);
};