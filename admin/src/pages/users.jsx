import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const User = () => {

	const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
	const [users, setUsers] = useState([]);
	useEffect(() => {
		toast.dismiss(); // Clear all previous toasts
	}, []);
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				// const token = localStorage.getItem('token');
				const response = await axios.get(`http://${host}:8080/api/admin/auth/users`, {
				withCredentials:true,	
				});
				console.log('Users: ', response.data.users);

				setUsers(response.data.users);
				toast.success('User list fetched successfully!', {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: 'colored',
				});
			} catch (error) {

				if(error.response.status==400){
					toast.error(`Session expired. `, {
								  position: 'top-right',
								  // style: { marginRight: '100px' },
				  
								  autoClose: true,
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
									  autoClose: true, // Auto-dismiss after 5 seconds
									  hideProgressBar: false,
									  closeOnClick: true,
									  pauseOnHover: true,
									  draggable: true,
								  });
								}

				console.error('Error fetching users:', error);
				toast.error('Failed to fetch users. Try again later.', {
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

		fetchUsers();
	}, []);

	return (
		<div className='min-h-screen bg-gradient-to-br from-white to-gray-200 p-6'>
			<h1 className='text-5xl font-extrabold text-left text-red-500 mb-12'>
      User <span className='text-black'>List</span>
    </h1>
  <div className='mx-auto w-[80%]'>
    

    <div className=' shadow-lg p-6 hover:shadow-xl transition-shadow duration-200'>
      <table className='w-full table-auto bg-white'>
        <thead className='bg-red-500 text-white'>
          <tr>
            <th className='py-6 px-8 text-left text-xl font-semibold'>Name</th>
            <th className='py-6 px-8 text-left text-xl font-semibold'>Email</th>
            <th className='py-6 px-8 text-left text-xl font-semibold'>Total Orders</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              className={`transition-all ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              } hover:bg-gray-100`}
            >
              <td className='py-6 px-8 text-gray-800 font-medium'>{user.name || 'N/A'}</td>
              <td className='py-6 px-8 text-gray-600'>{user.email || 'N/A'}</td>
              <td className='py-6 px-8 text-gray-600'>{user.orderCount ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

	);
};
