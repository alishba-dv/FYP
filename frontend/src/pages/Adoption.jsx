import React, { useState } from 'react';
import petadoption from '../assets/img99.jpg';
import axios from 'axios';
import { FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Adoption = () => {
	const [images, setImages] = useState([]);

	const [formData, setFormData] = useState({
		customerName: '',
		email: '',
		address: '',
		phone: '',
		petName: '',
		breed: '',
		color: '',
		petType: '',
		petAge: '',
		reason: '',
		petImage: [],
		Date: new Date(),
		Status: 'False',
	});

	const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other']; // Pet type options

	const validateFormData = () => {
		const errors = {};

		// Name validation (Only letters and spaces)
		const nameRegex = /^[A-Za-z\s]+$/;

		if (!formData.customerName.trim()) {
			errors.customerName = 'Customer name is required';
		} else if (!nameRegex.test(formData.customerName)) {
			errors.customerName =
				'Customer name must contain only letters and spaces';
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!formData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!emailRegex.test(formData.email)) {
			errors.email = 'Invalid email format';
		}
		const addressRegex = /^[A-Za-z0-9\s]+$/;

		// Address validation (minimum 5 characters)
		if (!formData.address.trim()) {
			errors.address = 'Address is required';
		} else if (formData.address.length < 5) {
			errors.address = 'Address must be at least 5 characters long';
		} else if (!addressRegex.test(formData.address)) {
			errors.address = 'Address name must contain only letters and spaces';
		}

		// Phone validation (Only digits, length 10-15)
		const phoneRegex = /^\d{10,15}$/;
		if (!formData.phone.trim()) {
			errors.phone = 'Phone number is required';
		} else if (!phoneRegex.test(formData.phone)) {
			errors.phone = 'Phone number must be 10-15 digits';
		}

		// Pet Name, Breed, and Color validation (Only letters and spaces)
		if (!formData.petName.trim()) {
			errors.petName = 'Pet name is required';
		} else if (!nameRegex.test(formData.petName)) {
			errors.petName = 'Pet name must contain only letters and spaces';
		}

		if (!formData.breed.trim()) {
			errors.breed = 'Breed is required';
		} else if (!nameRegex.test(formData.breed)) {
			errors.breed = 'Breed must contain only letters and spaces';
		}

		if (!formData.color.trim()) {
			errors.color = 'Color is required';
		} else if (!nameRegex.test(formData.color)) {
			errors.color = 'Color must contain only letters and spaces';
		}

		// Pet Type validation (Must be a valid type)
		const validPetTypes = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Fish', 'Other'];
		if (!formData.petType.trim()) {
			errors.petType = 'Pet type is required';
		} else if (!validPetTypes.includes(formData.petType)) {
			errors.petType = `Invalid pet type. Pet type must be "Dog", "Cat", "Rabbit", "Bird", "Fish", "Other"`;
		}

		// Pet Age validation (Positive integer)
		if (!formData.petAge) {
			errors.petAge = 'Pet age is required';
		} else if (
			isNaN(formData.petAge) ||
			formData.petAge < 0 ||
			!Number.isInteger(Number(formData.petAge))
		) {
			errors.petAge = 'Pet age must be a positive integer';
		}

		// Reason validation (Minimum 10 characters)
		if (!formData.reason.trim()) {
			errors.reason = 'Reason is required';
		} else if (formData.reason.length < 10) {
			errors.reason = 'Reason must be at least 10 characters long';
		}

		// Pet Image validation (Must contain at least one image)

		// Date validation (Cannot be in the future)
		const today = new Date();
		if (!formData.Date || new Date(formData.Date) > today) {
			errors.Date = 'Date must be valid and cannot be in the future';
		}

		const reason = formData.reason?.trim();

		if (!/^[A-Za-z\s]+$/.test(reason)) {
			errors.reasonForAdoption =
				'Reason for adoption can only contain letters and spaces.';
		} else {
			const wordCount = reason.split(/\s+/).length;

			if (wordCount < 10) {
				errors.reasonForAdoption =
					'Reason for adoption must be at least 10 words.';
			} else if (wordCount > 50) {
				errors.reasonForAdoption =
					'Reason for adoption must not exceed 50 words.';
			}
		}

		return errors;
	};

	const [previewImages, setPreviewImages] = useState([]);

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);

		// Validate and Preview Images
		const validImages = files.filter((file) => file.type.startsWith('image/'));

		if (validImages.length !== files.length) {
			toast.error(`Only image files are allowed`, {
				position: 'top-right',
				// style: { marginRight: '100px' },
				autoClose: true,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: 'colored',
			});
		}

		const previews = validImages.map((file) => URL.createObjectURL(file));
		setPreviewImages((prev) => [...prev, ...previews]);
		setImages((prev) => [...prev, ...validImages]);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleRemoveImage = (index) => {
		const updatedImages = images.filter((_, i) => i !== index);
		const updatedPreviews = previewImages.filter((_, i) => i !== index);
		setImages(updatedImages);
		setPreviewImages(updatedPreviews);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = validateFormData();

		if (Object.keys(errors).length > 0) {
			// Show only the first error
			const firstError = Object.values(errors)[0];
			toast.error(firstError, {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: 'colored',
			});
			return; // Stop form submission if there are errors
		}

		{
			const formDataToSend = new FormData();
			Object.entries(formData).forEach(([key, value]) => {
				formDataToSend.append(key, value);
			});

			images.forEach((image) => formDataToSend.append('petImage', image));

			try {
				
				const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
	const response = await axios.post(
					`http://${host}:8080/api/adoptionForm`,
					formDataToSend,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);
				console.log(formData);

				toast.success(`Form Submitted Successfully`, {
					position: 'top-right',
					style: { marginRight: '100px' },
					autoClose: true,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: 'colored',
				});
				console.log('Response:', response.data);
				//  window.reload();

				setFormData({
					customerName: '',
					email: '',
					address: '',
					phone: '',
					petName: '',
					breed: '',
					color: '',
					petType: '',
					petAge: '',
					reason: '',
					petImage: [],
					Date: new Date(),
					Status: 'False',
				});

				// Clear images and previews
				setImages([]);
				setPreviewImages([]);
			} catch (error) {
				console.error('Error submitting form:', error);
				toast.error(error.response.data.message, {
					position: 'top-right',
					style: { marginRight: '100px' },
					autoClose: true,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: 'colored',
				});
			}
		}
	};

	return (
		<div className='max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-2xl'>
			<img
				src={petadoption}
				alt='Random Pet'
				className='w-full h-64 object-cover rounded-xl mb-6'
			/>

			<h2 className='text-3xl font-bold mb-6 text-center bg-red-500 text-white py-4'>
				Pet Adoption Form
			</h2>

			<form
				onSubmit={handleSubmit}
				className='space-y-6'>
				{[
					{
						label: 'Full Name (Customer):',
						name: 'customerName',
						placeholder: 'Enter your name',
					},

					{
						label: 'Pet Age:',
						name: 'petAge',
						placeholder: 'Enter Age of your pet',
					},
					{
						label: 'Email Address:',
						name: 'email',
						placeholder: 'Enter your email',
					},
					{
						label: 'Address:',
						name: 'address',
						placeholder: 'Enter your address',
					},
					{
						label: 'Phone Number:',
						name: 'phone',
						placeholder: 'Enter your phone number',
					},
					{
						label: 'Pet Name:',
						name: 'petName',
						placeholder: 'Enter pet name',
					},
					{ label: 'Breed:', name: 'breed', placeholder: 'Enter breed' },
					{ label: 'Color:', name: 'color', placeholder: 'Enter color' },
				].map((field) => (
					<div key={field.name}>
						<label className='block mb-1'>{field.label}</label>
						<input
							type='text'
							name={field.name}
							value={formData[field.name]}
							onChange={handleChange}
							required
							className='w-full p-3 border rounded-lg'
							placeholder={field.placeholder}
						/>
					</div>
				))}
				<select
					name='petType'
					value={formData.petType}
					onChange={handleChange}
					className='w-full p-2 border rounded'
					required>
					<option value=''>Select Pet Type</option>
					{petTypes.map((type) => (
						<option
							key={type}
							value={type}>
							{type}
						</option>
					))}
				</select>

				<div>
					<label className='block mb-1'>Reason for Adoption:</label>
					<textarea
						name='reason'
						value={formData.reason}
						onChange={handleChange}
						required
						className='w-full p-3 border rounded-lg'
						placeholder='Why do you want to adopt?'
					/>
				</div>

				<div className='w-full border-2 border-dashed border-gray-300 rounded-lg p-4'>
					<p className='mb-2 font-medium text-gray-600'>Upload Images</p>
					<div className='flex gap-2 flex-wrap'>
						{previewImages.map((img, index) => (
							<div
								key={index}
								className='relative'>
								<img
									className='w-32 h-32 object-cover rounded-md'
									src={img}
									alt={`Preview ${index + 1}`}
								/>
								<button
									type='button'
									className='absolute top-0 right-0 bg-red-500 text-white rounded-full px-2'
									onClick={() => handleRemoveImage(index)}>
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

				<button
					onClick={handleSubmit}
					type='submit'
					className='w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600'>
					Submit Adoption Form
				</button>
			</form>
		</div>
	);
};

export default Adoption;
