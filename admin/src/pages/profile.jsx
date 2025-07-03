import React, { useEffect,useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Profile = () => {
  useEffect(() => {
		toast.dismiss(); 
	}, []);
  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user?.name);  // Safely access name
  console.log(user?.email);
   
  const [userData, setData] = useState({
    name: user?.name,
    email: user?.email,
  });
  const [isEdit, setEdit] = useState(false);
 
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
    
    let newName = user.name === userData.name ? null : userData.name;
    let newEmail = user.email === userData.email ? null : userData.email;

    if (!newName && !newEmail) {
      toast.error("No change detected", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    const updatedFields = {};
    if (newName) updatedFields.name = newName;
    if (newEmail) updatedFields.email = newEmail;
    const newData = {
      newName,
      newEmail,
      originalEmail: user.email,
      updatedFields,
    };

    try {
      const response = await axios.put(`http://${host}:8080/api/auth/editProfile`, newData, {
      withCredentials:true, 
      });

      if (response?.data) {
        const { message, ...rest } = response.data;
        toast.success("Profile updated", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        localStorage.setItem("user", JSON.stringify({ ...user, ...rest }));
      }
    } catch (error) {

      
				if(error.response.status==400){
          toast.error(`Session expired. `, {
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
      toast.error("Failed to edit profile", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }

    setEdit(false);

   
  };

  return (
    <div className="container mx-auto my-20 p-6 bg-white shadow-lg rounded-lg max-w-md border border-black/10">
      <div>
        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="text-red-500 text-3xl sm:text-4xl font-semibold">
            MY <span className="text-black">PROFILE</span>
          </h1>
        </div>

        {isEdit ? (
          <input
            className="bg-gray-100 text-2xl font-medium w-full p-2 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F24C4C]"
            type="text"
            name="name"
            value={userData.name}
            placeholder="Name"
            onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className="font-medium text-2xl text-gray-800 mt-4">{userData.name}</p>
        )}
        <hr className="my-4 border-gray-300" />

        <p className="text-gray-600 font-semibold mt-2">Email:</p>
        {isEdit ? (
          <input
            className="bg-gray-100 w-full p-2 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-[#F24C4C]"
            name="email"
            type="text"
            value={userData.email}
            placeholder="Email"
            onChange={e => setData(prev => ({ ...prev, email: e.target.value }))}
          />
        ) : (
          <p className="text-gray-700">{userData.email}</p>
        )}
      </div>

      <div className="text-center mt-6">
        {isEdit ? (
          <button onClick={handleSave} className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-colors">
            Save
          </button>
        ) : (
          <>
            <div className="flex items-center gap-3 justify-center">
              <button onClick={() => setEdit(true)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors">
                Edit
              </button>

              <NavLink to="/">
                <button className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">Cancel</button>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};