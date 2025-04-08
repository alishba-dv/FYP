import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShopContext } from "../context/ShopContext";

//implement jwt authentication in this file

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(ShopContext);
  const host = window.location.hostname === 'localhost'
  ? 'localhost'
  : '0.0.0.0'; 
  const submitHandler = async event => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };
    try {
      let response;
      if (state === "Sign Up") {
        // Sign up request
        response = await axios.post(
          `http://${host}:8080/api/signup`,

          data
        );
        console.log("Signup Response email:", response.data.email);
        toast.success(`Signup Successfully`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        // alert('Signup successful');
        console.log("Signup Response:", response.data);

        if (response.status == 200) {
          // localStorage.setItem("curr_userEmail", response.data.email);
          // localStorage.setItem("curr_Name", response.data.name);

          console.log("DATA OF RESPONSE: ", response.data);
        }

        if (response.status === 404) {
          toast.error(`Unauthorized Access`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          // alert("Unauthorized Access");
        }
        if (response.data.role == "user") {
          const {  message, ...rest } = response.data;
          // Store user information securely after successful login/signup
          // localStorage.setItem("token", response.data.token); // Store JWT token
          // console.log("token: ",token)
          // localStorage.setItem("curr_userEmail", response.data.email);
          // localStorage.setItem("curr_Name", response.data.name);
          // localStorage.setItem("user", JSON.stringify(rest));
          
          login(rest);
          // Navigate without query parameters
          navigate("/Myprofile");

          // navigate('/Myprofile?email='+response.data.email+'&name='+response.data.name); // Redirect to dashboard or home page
        }
      } else {
        // Login request
        response = await axios.post(`http://${host}:8080/api/login`, data);
        // localStorage.setItem("curr_userEmail", response.data.email);
        // localStorage.setItem("curr_Name", response.data.name);

        // const { token} = response.data;
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString(); // 7 days from now

        // Store token in cookies instead of localStorage
        document.cookie = `curr_userEmail=${response.data.email}; path=/;expires=${expires};`;
        document.cookie = `curr_Name=${response.data.name}; path=/;expires=${expires};`;
        document.cookie = `userId=${response.data.userId}; path=/;expires=${expires};`;

        document.cookie = `token=${response.data.token}; path=/; expires=${expires};`;
        console.log("Response: ", response.data);

        console.log("JWT token received from backend: ", response.data.token);
        //store the token in localstorage

        // localStorage.setItem("token", response.data.token);

        if (response.data.role == "user") {
          const { token, message, ...rest } = response.data;
          // localStorage.setItem("user", JSON.stringify(rest));
          login(rest);

          toast.success(`Login successful`, {
            position: "top-right",
            // style: { marginRight: "100px" },
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          // alert('Login successful');
          navigate("/Myprofile?email=" + response.data.email + "&name=" + response.data.name); // Redirect to dashboard or home page
        } else {
          toast.error(`UnAuthorized Access`, {
            position: "top-right",
            // style: { marginRight: "100px" },
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          // alert("Unauthorization");
        }
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.response ? err.response.data.error : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      data-aos="flip-left"
      onSubmit={submitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-14 gap-4 bg-white p-6 roun</form>ded-lg shadow-lg border border-black/10"
    >
      <p className="prata-regular text-3xl font-bold">{state}</p>

      <div className="inline-flex i</div>tems-center justify-between w-full mb-4">
        <button
          type="button"
          onClick={() => {
            setState("Login");
            setError("");
          }}
          className={`w-1/2 py-2 ${state === "Login" ? "bg-gradient-to-r bg-[#F24C4C] rounded-lg text-white" : "bg-gray-200 rounded-lg text-black"}`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => {
            setState("Sign Up");
            setError("");
          }}
          className={`w-1/2 py-2 ${state === "Sign Up" ? "bg-gradient-to-r bg-[#F24C4C] rounded-lg text-white" : "bg-gray-200 rounded-lg text-black"}`}
        >
          Signup
        </button>
      </div>

      {state === "Sign Up" && (
        <input name="name" className="w-full px-3 py-2 border rounded-lg shadow-sm border-gray-300" required placeholder="Name" type="text" />
      )}

      <input name="email" className="w-full px-3 py-2 border rounded-lg shadow-sm border-gray-300" required placeholder="Email Address" type="email" />

      <input name="password" className="w-full px-3 py-2 border rounded-lg shadow-sm border-gray-300" required placeholder="Password" type="password" />

      {state === "Sign Up" && (
        <input
          name="confirmPassword"
          className="w-full px-3 py-2 border rounded-lg shadow-sm border-gray-300"
          required
          placeholder="Confirm Password"
          type="password"
        />
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="w-full flex justify-between text-sm mt-2">
        {state === "Login" && (
          <Link to="/forgot">
            <p className="cursor-pointer">Forget password?</p>
          </Link>
        )}
        <p onClick={() => setState(state === "Login" ? "Sign Up" : "Login")} className="cursor-pointer">
          {state === "Login" ? "Create Account" : "Already have an account? Login"}
        </p>
      </div>

      <button className="mt-4 px-4 py-2 w-full bg-gradient-to-r bg-[#F24C4C] text-white rounded-lg" disabled={loading}>
        {loading ? "Processing..." : state === "Login" ? "Login" : "Signup"}
      </button>
    </form>
  );
};

export default Login;
