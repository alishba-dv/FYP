import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaUpload } from 'react-icons/fa'; // Import the upload icon
import Cookies from "js-cookie"; // Importing the js-cookie library

export const Add = () => {

	const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
	const navigate = useNavigate();

	const [images, setImages] = useState([]);
	const [previewImages, setPreviewImages] = useState([]);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [Pro_category, setCategory] = useState('Food Product');
	const [Animal_Category, setAnimalCategory] = useState('Cats');
	const [subcategory, setsubCategory] = useState('Chicken');
	const [quantity, setQuantity] = useState('');

	useEffect(() => {
		toast.dismiss(); // Clear all previous toasts
	}, []);

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    setImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };
	const subcategories = {
		'Food Product': ['Chicken', 'Beef', 'Fish', 'Others'],
		Medicine: ['Tablets', 'Syrups', 'Injections', 'Others'],
		Accessories: ['Collars', 'Leashes', 'Toys', 'Others'],
	};

	// Handle Image Upload & Preview
	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		const validImages = files.filter((file) => file.type.startsWith('image/'));

		if (validImages.length !== files.length) {
		  alert('Only image files are allowed.');
		}
		// Preview Images
		const imagePreviews = files.map((file) => URL.createObjectURL(file));
		setPreviewImages((prev) => [...prev, ...imagePreviews]);

		// Store Image Files
		setImages((prev) => [...prev, ...files]);
	};

	// Handle Form Submission
	const onSubmitHandler = async (event) => {
		event.preventDefault();
		const regex = /^(?=.*[A-Za-z])[A-Za-z0-9\s, ' -._'?"]+$/;


		if (!regex.test(name)) {
			toast.error('Product name must contain letters and cannot be only numbers.', {
			  position: 'top-right',
			  autoClose: 3000,
			  theme: 'colored',
			});
			return;
		  }
		  
		  if (!regex.test(description)) {
			toast.error('Description must contain letters and cannot be only numbers.', {
			  position: 'top-right',
			  autoClose: 3000,
			  theme: 'colored',
			});
			return;
		  }
		  

		const formData = new FormData();

		// Append multiple images
		images.forEach((image, index) => {
			formData.append(`images`, image);
		});

		formData.append('name', name);
		formData.append('description', description);
		formData.append('price', price);
		formData.append('Pro_category', Pro_category);
		formData.append('Animal_Category', Animal_Category);
		formData.append('quantity', quantity);
		formData.append('subcategory', subcategory);

		const token = localStorage.getItem('token');

		try {
			const response = await axios.post(
				`http://${host}:8080/api/admin/auth/add`,
				formData,
				{
					withCredentials:true,
				}
			);

			if (response.status === 201) {
				toast.success('Product added successfully', {
					position: 'top-right',
					autoClose: 3000,
					theme: 'colored',
				});
				navigate('/List'); // Redirect after success
			}
		} catch (error) {
			console.error('Error uploading product:', error.response.data.message);
			toast.error(error.response.data.message, {
				position: 'top-right',
				autoClose: 3000,
				theme: 'colored',
			});
		}
	};

	return (
		<div className='bg-white shadow-md rounded-lg max-w-lg mx-auto p-6'>
			<h2 className='text-2xl font-semibold text-red-500 mb-6'>
				Add <span className='text-black'>New Product</span>
			</h2>

			<form
				onSubmit={onSubmitHandler}
				className='flex flex-col gap-4'>
				<div className='w-full border-2 border-dashed border-gray-300 rounded-lg p-4'>
  <p className='mb-2 font-medium text-gray-600'>Upload Images</p>
  <div className='flex gap-2 flex-wrap'>
    {previewImages.map((img, index) => (
      <div key={index} className='relative w-32 h-32'>
        <img
          className='w-full h-full object-cover rounded-md'
          src={img}
          alt={`Preview ${index + 1}`}
        />
        <button
          type="button"
          className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 text-xs"
          onClick={() => handleRemoveImage(index)}
        >
          ✕
        </button>
      </div>
    ))}
  </div>

  <label
    htmlFor='images'
    className='cursor-pointer flex items-center gap-2 mt-4'>
    <input
      onChange={handleImageChange}
      type='file'
      id='images'
      multiple
      hidden
    />
    <FaUpload className='text-gray-500 w-6 h-6' />
    <p className='text-gray-500'>Click to upload multiple images</p>
  </label>
</div>

<div className='w-full'>
  <p className='mb-2 font-medium text-gray-600'>Product Name</p>
  <input
    type='text'
    placeholder='Product name'
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
    className='w-full px-4 py-2 border rounded-lg'
  />
</div>


				{/* Description */}
				<div className='w-full'>
					<p className='mb-2 font-medium text-gray-600'>Product Description</p>
					<textarea
						placeholder='Description of the product'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
						className='w-full px-4 py-2 border rounded-lg'
					/>
				</div>

				{/* Product Price & Quantity */}
				<div className='flex gap-4'>
					<div className='w-1/2'>
						<p className='mb-2 font-medium text-gray-600'>Price</p>
						<input
							type='number'
							placeholder='30'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							required
							className='w-full px-4 py-2 border rounded-lg'
						/>
					</div>

					<div className='w-1/2'>
						<p className='mb-2 font-medium text-gray-600'>Quantity</p>
						<input
							type='number'
							placeholder='10'
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
							required
							className='w-full px-4 py-2 border rounded-lg'
						/>
					</div>
				</div>

				{/* Product Category */}
				<div className='w-full'>
					<p className='mb-2 font-medium text-gray-600'>Product Category</p>
					<select
						value={Pro_category}
						onChange={(e) => setCategory(e.target.value)}
						className='w-full px-4 py-2 border rounded-lg'>
						<option value='Food Product'>Food Product</option>
						<option value='Medicine'>Medicine</option>
						<option value='Accessories'>Accessories</option>
					</select>
				</div>

				{/* Animal Category */}
				<div className='w-full'>
					<p className='mb-2 font-medium text-gray-600'>Animal Category</p>
					<select
						value={Animal_Category}
						onChange={(e) => setAnimalCategory(e.target.value)}
						className='w-full px-4 py-2 border rounded-lg'>
						<option value='Cats'>Cats</option>
						<option value='Dogs'>Dogs</option>
						<option value='Others'>Others</option>
					</select>
				</div>

				{Pro_category === 'Food Product' && (
					<div className='w-full md:w-1/2'>
						<p className='mb-2 font-medium text-gray-600'>Food Category</p>
						<select
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
							value={subcategory}
							onChange={(e) => setsubCategory(e.target.value)}>
							{subcategories['Food Product'].map((category, index) => (
								<option
									key={index}
									value={category}>
									{category}
								</option>
							))}
						</select>
					</div>
				)}

				{Pro_category === 'Medicine' && (
					<div className='w-full md:w-1/2'>
						<p className='mb-2 font-medium text-gray-600'>Medicine Category</p>
						<select
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
							value={subcategory}
							onChange={(e) => setsubCategory(e.target.value)}>
							{subcategories['Medicine'].map((category, index) => (
								<option
									key={index}
									value={category}>
									{category}
								</option>
							))}
						</select>
					</div>
				)}

				{Pro_category === 'Accessories' && (
					<div className='w-full md:w-1/2'>
						<p className='mb-2 font-medium text-gray-600'>Accessory Type</p>
						<select
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
							value={subcategory}
							onChange={(e) => setsubCategory(e.target.value)}>
							{subcategories['Accessories'].map((category, index) => (
								<option
									key={index}
									value={category}>
									{category}
								</option>
							))}
						</select>
					</div>
				)}

				<button className='mt-4 w-full py-3 bg-red-500 hover:bg-gray-600 text-white font-bold rounded-lg'>
					Add Product
				</button>
			</form>
		</div>
	);
};