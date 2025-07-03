import React, { useContext, useEffect } from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Cookies from "js-cookie"; // Importing the js-cookie library

const Logout = () => {
  const { setDelivery_fee ,setdiscount} =
		useContext(ShopContext);
  localStorage.clear();
  Cookies.remove("token");
  Cookies.remove("userId");
  Cookies.remove("curr_userEmail");
  Cookies.remove("curr_Name");
  
  // Cookies.remove;
  setDelivery_fee(190);
  setdiscount(0);
  const { logout } = useContext(ShopContext);
  useEffect(() => logout(), []);

  return (
    <div className="flex items-center justify-center my-32 ">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-300">
        <img src={logo} alt="Logo" className="w-32 mx-auto" />
        <div className="flex justify-center mt-4">
          <div className="w-20 h-20 bg-[#F24C4C] rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414-1.414l-7.25 7.25-2.25-2.25a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mt-6">You have been logged out</h1>
        <h3 className="text-gray-600 mt-2">Thank you for using our services!</h3>
        <NavLink to={"/login"}>
          <button className="mt-6 bg-[#F24C4C] text-white py-2 px-6 rounded-md hover:bg-[#d43b3b] transition-colors">Sign in again</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Logout;
