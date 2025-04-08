import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export const Login = () => {
  const { login } = useContext(AuthContext);
  const [state, setState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
		toast.dismiss(); // Clear all previous toasts
	}, []);
  const submitHandler = async event => {
    event.preventDefault();
    setLoading(true);
    setError("");
	const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      // Login request
      const response = await axios.post(`http://${host}:8080/api/admin/login`, data);
      console.log("ISlogged in or not: ", Cookies.get("curr_adminEmail"));

      if (response.data.role === "admin" && response.status === 200) {
        const { token, message, ...rest } = response.data;
    
        // Corrected document.cookie syntax
        document.cookie = `curr_adminEmail=${response.data.email}; path=/;`;
        document.cookie = `Role=${response.data.role}; path=/;`;
        document.cookie = `token=${response.data.token}; path=/;`;

        // document.cookie = `name=${(response.data.name)}; path=/;`;
    
        login(rest); // Assuming this updates state
		const { name, email } = response.data;

		const user = { name, email };
		localStorage.setItem("user", JSON.stringify(user));
		
		toast.success("Login Successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
    
        navigate("./analytics");
      }
    } catch (err) {
      console.error("Error:", err);
    
      if (err.response?.status === 400) {
        toast.error("Unauthorized.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
      
      else {
        setError(err.response ? err.response.data.error : "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <form
      data-aos="flip-left"
      onSubmit={submitHandler}
      className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center w-[90%] sm:max-w-md m-auto gap-4 bg-white p-6 rounded-lg shadow-lg border border-black/10"
    >
      <p className="prata-regular text-3xl text-black font-bold">{state}</p>

      <div className="inline-flex i</div>tems-center justify-between w-full mb-4">
        <button
          type="button"
          onClick={() => {
            setState("Login");
            setError("");
          }}
          className={`w-1/2 py-2 ${(state === "Login", "bg-gradient-to-r  rounded-lg text-white")}`}
        >
          Login
        </button>
      </div>

      <input name="email" className="w-full px-3 py-2 border rounded-lg shadow-sm border-gray-300" required placeholder="Email Address" type="email" />

      <input name="password" className="w-full px-3 py-2 border rounded-lg shadow-sm border-gray-300" required placeholder="Password" type="password" />

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="w-full flex justify-between text-sm mt-2">
        {state === "Login" && (
          <Link to="/forgot">
            <p className="cursor-pointer">Forget password?</p>
          </Link>
        )}
        </div>
      <button className="mt-4 px-4 py-2 w-full bg-gradient-to-r bg-[#F44336] text-white rounded-lg" disabled={loading}>
        {loading ? "Processing..." : state === "Login" ? "Login" : "Signup"}
      </button>
    </form>
  );
};