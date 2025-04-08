import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie"; // Importing the js-cookie library

export const Myprofile = () => {
  // Get user data and token from cookies
  const token = Cookies.get("token"); // Use Cookies to get JWT token
  const userName = Cookies.get("curr_Name");
  const userEmail = Cookies.get("curr_userEmail");
  console.log("USername and emmail : ",userName,userEmail)
  const host = window.location.hostname === 'localhost'
  ? 'localhost'
  : '0.0.0.0'; 
  const [userData, setData] = useState({
    name: userName,
    email: userEmail,
  });
  const [isEdit, setEdit] = useState(false);

  const handleSave = async () => {
    // Get token from cookies
    const token = Cookies.get("token");

    let newName = userName === userData.name ? userName : userData.name;
    let newEmail = userEmail === userData.email ? userEmail : userData.email;

    if (!newName===userData.name && !newEmail===userData.email) {
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
      originalEmail: userEmail,
      updatedFields,
    };

    try {
      const response = await axios.put(`http://${host}:8080/api/auth/editProfile`, newData, {
        withCredentials: true,
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

        // Update user info in cookies
        Cookies.set("user", JSON.stringify({ ...rest })); // Store updated user data
        Cookies.set("curr_userEmail", response.data.email);  // Set updated email in cookies
        Cookies.set("curr_Name", response.data.name);  // Set updated name in cookies

      }
    } catch (error) {
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
          <h1 className="text-[#F24C4C] text-3xl sm:text-4xl font-semibold">
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
          <button onClick={handleSave} className="bg-[#F24C4C] text-white py-2 px-6 rounded-md hover:bg-[#d43b3b] transition-colors">
            Save
          </button>
        ) : (
          <>
            <button onClick={() => setEdit(true)} className="bg-[#F24C4C] text-white py-2 px-6 rounded-md hover:bg-[#d43b3b] transition-colors">
              Edit
            </button>
            <NavLink to={"/"}>
              <button className="bg-[#F24C4C] ml-5 text-white py-2 px-6 rounded-md hover:bg-[#d43b3b] transition-colors">Cancel</button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};
