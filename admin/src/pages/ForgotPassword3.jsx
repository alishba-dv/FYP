import React from 'react';
import { useState } from 'react';
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { TfiWrite } from 'react-icons/tfi';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link,useLocation,useNavigate } from 'react-router-dom';

import axios from 'axios';


const ForgotPassword3 = () => {
const navigate=useNavigate();
const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
	const [newpassword,setNewPassword]=useState('');
	const [confirmPassword,setConfirmPassword]=useState('');


  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get('email') ;
		

	const ResetPassword = async ()=>{

		
   console.log(newpassword);
   console.log(email);
   const token=localStorage.getItem('token');
   if(newpassword!=confirmPassword){
	toast.error(`Passwords don't match`, {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
            });
			return;
		}
   try {
    const response = await axios.post(`http://${host}:8080/api/reset`, {
        newpassword,
        email,
    },
	

);
    console.log("Response:", response.data);
toast.success(`Password reset Successful`,{
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
            });	
			navigate('/forgot3');
} catch (error) {
    console.error("Error resetting password:", error.response?.data || error.message);
   toast.error(`Password reset failed `, {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
            });
}

	};
	return (
		<div className='flex flex-col items-center justify-center my-28'>
			<div className='flex justify-center items-center mb-8'>
				<TfiWrite className=' w-24 h-24' />
			</div>

			<div className='w-full max-w-xl text-center'>
				<h1 className='text-5xl font-bold mb-4'>Reset Password</h1>
				<h2 className='text-sm text-gray-400 mb-16'>
					Kindly set your new password
				</h2>

				<div className='space-y-6'>
					<label
						htmlFor='new-password'
						className='font-bold text-2xl text-gray-700 block text-left'>
						New Password
					</label>
					<input
						type='password'
						id='new-password'
						value={newpassword}
						 onChange={(e) => setNewPassword(e.target.value)} 

						className='w-full p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F24C4C]'
						placeholder='Enter your new password'
					/>

					<label
						htmlFor='confirm-password'
						className='font-bold text-2xl text-gray-700 block text-left'>
						Re-enter Password
					</label>
					<input
						type='password'


						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)} 

						id='confirm-password'
						className='w-full p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F24C4C]'
						placeholder='Re-enter your password'
					/>

					{/* <Link
						to='/forgot3'
						className='block'> */}
						<button onClick={ResetPassword} className='w-full bg-[#F24C4C] text-white py-4 rounded-full hover:bg-[#d43b3b] focus:outline-none'>
							Reset Password
						</button>
					{/* </Link> */}
				</div>
			</div>

			<div className='flex items-center mt-12'>
				<FaArrowLeft className='text-[#F24C4C] w-6 h-6 mr-2' />
				<Link
					to='/forgot1'
					className='text-[#F24C4C] text-lg font-medium hover:underline'>
					Back to Page
				</Link>
			</div>
		</div>
	);
};

export default ForgotPassword3;
