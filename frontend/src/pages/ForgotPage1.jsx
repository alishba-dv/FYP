import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiQuestionnaireFill } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPage1 = () => {
  const [email, setemail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);
  const sendEmail = async event => {
    event.preventDefault();
    toast.info("Veriying Email For Password Recovery", {
      position: "top-right",
      style: { marginRight: "100px" },
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    console.log("Verifying email:", email);
    const token = localStorage.getItem("token");
    try {
      const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
      const response = await axios.post(`http://${host}:8080/api/forgot`, { email });
      console.log("Response:", response.data);
      // alert("Email verified For Password Recovery");

      if (response.status == 200) {
        toast.success("Email Verified For Password Recovery.", {
          position: "top-right",
          style: { marginRight: "100px" },
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        navigate("/forgot1?email=" + email);
      }

      toast.success(response.data, {
        position: "top-right",
        style: { marginRight: "100px" },
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (err) {
      toast.dismiss();
      const errormsg = err.response.data.message;

      toast.error(errormsg, {
        position: "top-right",
        style: { marginRight: "100px" },
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      console.error("Error occurred:", err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-28">
      <div className="flex justify-center items-center mb-8">
        <RiQuestionnaireFill className=" w-24 h-24" />
      </div>

      <div className="w-full max-w-xl text-center">
        <h1 className="text-5xl font-bold mb-4">Forgot Your Password?</h1>
        <h2 className="text-sm text-gray-400 mb-16">Enter your email below and we will send you a password reset link.</h2>

        <div className="space-y-6">
          <label htmlFor="email" className="font-bold text-2xl text-gray-700 block text-left">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setemail(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F24C4C]"
            placeholder="Enter your email"
          />
          <NavLink className="block" to="/forgot1">
            <button onClick={sendEmail} className="w-full bg-[#F24C4C] text-white py-4 rounded-full hover:bg-[#d43b3b] focus:outline-none">
              Send Email
            </button>
          </NavLink>
        </div>
      </div>
      <div className="flex items-center mt-12">
        <FaArrowLeft className="text-[#F24C4C] w-6 h-6 mr-2" />
        <Link to="/login" className="text-[#F24C4C] text-lg font-medium hover:underline">
          Back to Page
        </Link>
      </div>
    </div>
  );
};

export default ForgotPage1;
