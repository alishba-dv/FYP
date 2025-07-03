import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { AccessProductItem } from "./AccessProductItem";

const SubscriptionPage4 = () => {
  const { id } = useParams();
  const [autoRenew, setAutoRenew] = useState(false);
  const [plan, planSet] = useState(null);
  const [loading, loadingSet] = useState(true);
  const citiesOfPakistan = [
    "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", 
    "Peshawar", "Quetta", "Sialkot", "Gujranwala", "Hyderabad", "Sargodha",
    "Bahawalpur", "Sukkur", "Larkana"
  ];
  const host = window.location.hostname === 'localhost'
  ? 'localhost'
  : '0.0.0.0';  
  const statesOfPakistan = [
    "Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Gilgit-Baltistan",
    "Azad Jammu & Kashmir", "Islamabad Capital Territory"
  ];
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    country: "Pakistan",
    state: "",
    zipcode: "",
    address: "",
    street:"",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  
  async function getPlan() {
    try {
      const response = await axios.get(`http://${host}:8080/api/auth/subscription/getById/${id}`, {
        withCredentials: true,
      });

      console.log(response);
      if (response?.data) {
        planSet(response.data.plan);
        setAutoRenew(response.data.plan.autoRenew || false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      loadingSet(false);
    }
  }

  useEffect(() => {
    getPlan();
  }, []);

  const handleAutoRenewToggle = (e) => {
    const newAutoRenewStatus = e.target.checked;
    setAutoRenew(newAutoRenewStatus);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    const regexZip = /^\d{5}(?:[-\s]\d{4})?$/; // Regex for Zipcode (Optional 5 or 9 digits)
    const regexPhone = /^\d{11}$/; // Regex for phone number (exactly 11 digits)

    // First Name Validation
    if (!formData.firstName) formErrors.firstName = "First name is required.";

    // Last Name Validation
    if (!formData.lastName) formErrors.lastName = "Last name is required.";

    // City Validation (should not be empty)
    if (!formData.city) formErrors.city = "City is required.";

    // State Validation (should not be empty)
    if (!formData.state) formErrors.state = "State is required.";

    // Country Validation (should not be empty)
    // if (!formData.country) formErrors.country = "Country is required.";

    // Zipcode Validation (must match regex)
    if (!formData.zipcode || !regexZip.test(formData.zipcode)) {
      formErrors.zipcode = "Valid zipcode is required.";
    }

    // Address Validation (should not be empty)
    if (!formData.address) formErrors.address = "Address is required.";

    // Phone Number Validation (should be 11 digits)
    if (!formData.phone || !regexPhone.test(formData.phone)) {
      formErrors.phone = "Phone number must be exactly 11 digits.";
    }
    if (!formData.street || formData.street.length < 3) {
      formErrors.street = "Street name must be at least 3 characters long.";
    }if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Valid email is required.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
 
  const subscribe = async (plan) => {
    if (!validateForm()) return;

    const body = {
      plan: {
        name: plan?.name,
        _id: plan?._id,
        price: plan?.price,
        timeFrame: plan?.timeFrame,
        autoRenew,
      },
      user: formData,  // Add user details to the subscription request
    };

    try {
      const stripe = await loadStripe("pk_test_51Qw1U8BCqcG9036LlgQ5ruG89O2Jx9CoiNVnfAaJwgULAxLTWaWvo1WU94flOX0Rk1BmmtzjGcZfCBsVS4ZInnk300gUQ4w3EJ");

      const response = await axios.post(`http://${host}:8080/api/auth/subscription/subscribe`, body, {
        withCredentials: true,
      });

      if (response?.data) {
        toast.success("Redirecting to Stripe checkout...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        const result = await stripe.redirectToCheckout({ sessionId: response.data.id });

        if (result.error) {
          toast.error("Failed to redirect to Stripe checkout.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        }
      }
    } catch (err) {
      toast.error("Failed to create Stripe session. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center lg:flex-row lg:items-start gap-4 container max-w-screen-2xl mx-auto bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-6 py-10">
      {loading ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading ...</div>
      ) : (
        <>
          {/* Plan Section */}
          <div className="w-full max-w-sm bg-white rounded-lg shadow-md border border-gray-200 flex flex-col text-center">
            <div className="relative bg-red-500 rounded-t-lg py-4">
              <h3 className="text-white text-lg font-bold">{plan?.name}</h3>
              <p className="text-white text-2xl font-extrabold">{plan?.price}</p>
              <p className="text-white text-sm mt-1 uppercase">{plan?.timeFrame}</p>
            </div>

            <ul className="flex-1 p-6 space-y-4 text-left">
              {plan?.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="mr-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.707a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Auto-Renewal Option */}
            <div className="w-full max-w-sm bg-white rounded-lg shadow-md border border-gray-200 flex flex-col text-center mt-4">
              <div className="px-6 py-4">
                <label className="text-xl text-gray-800 font-bold">Auto-Renew</label>
                <div className="flex justify-center items-center mt-2">
                  <input
                    type="checkbox"
                    checked={autoRenew}
                    onChange={handleAutoRenewToggle}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 transition duration-300 ease-in-out"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">Enable to automatically renew your subscription at the end of the period.</p>
              </div>
            </div>

            <div className="p-6">
              <button
                onClick={() => subscribe(plan)}
                className="w-full py-3 text-white font-bold rounded-lg bg-red-500 hover:opacity-90 disabled:bg-gray-400"
              >
                {"SUBSCRIBE NOW"}
              </button>
            </div>
          </div>

         {/* Personal Information Form */}
<div className="w-full max-w-lg bg-white rounded-lg shadow-md border border-gray-200 p-3 mt-1">
<h3 className="text-2xl font-bold mb-4">
  <span className="text-red-600">Personal</span>{' '}
  <span className="text-black">Information</span>
</h3>
  <form>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex flex-col">
      <label className="text-xl font-semibold text-gray-700 mb-2">First Name</label>
      <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
      </div>

      <div className="flex flex-col">
        <label className="text-xl font-semibold text-gray-700 mb-2">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
      </div>
    </div>

    <div className="flex flex-col">
      <label className="text-xl font-semibold text-gray-700 mb-2">Address</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
    </div>

    {/* New Row: Street and Email */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label className="text-xl font-semibold text-gray-700 mb-2">Street</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
      </div>

      <div className="flex flex-col">
        <label className="text-xl font-semibold text-gray-700 mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <div className="flex flex-col">
        <label className="text-xl font-semibold text-gray-700 mb-2">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>
  

   

      <div className="flex flex-col w-full">
      <label  className="text-xl font-semibold text-grey-700 mb-2">State:</label>
  <select
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="p-3 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"

        >
          <option value="">Select a state</option>
          {statesOfPakistan.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
</div>
</div> 

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 w-full">
      <div className="flex flex-col w-full">
       <label className="text-xl font-semibold text-grey-700 mb-2">City:</label>
       <select
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="p-3 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"

        >
          <option value="">Select a city</option>
          {citiesOfPakistan.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 w-full">
  <div className="flex flex-col w-full">
    <label className="text-xl font-semibold text-gray-700 mb-2">Zip Code</label>
    <input
      type="text"
      name="zipcode"
      value={formData.zipcode}
      onChange={handleChange}
      className="p-2 border rounded"
    />
    {errors.zipcode && <p className="text-red-500 text-sm">{errors.zipcode}</p>}
  </div>

  <div className="flex flex-col w-full">
    <label className="text-xl font-semibold text-gray-700 mb-2">Country</label>
    <input
      type="text"
      name="country"
      value="Pakistan"
      onChange={handleChange}
      className="p-2 border rounded"
    />
    {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
  </div>
</div>



    </div>
  </form>
</div>


          {/* Product Side */}
          <div className="bg-white rounded-lg shadow-lg p-12 w-full text-center animate-fade-in-up flex flex-col gap-8">
          <h3 className="text-4xl font-bold mb-4">
  <span className="text-red-600">Product</span>{' '}
  <span className="text-black">Plan</span>
</h3>            <div className="flex flex-col gap-4">
              {plan?.productGroup.map((grp, index) => {
                return (
                  <div key={index} className="flex items-start flex-col gap-2 flex-1">
                    <div className="text-2xl text-red-500 font-bold">
                      {index + 1}. {grp?.name}
                    </div>
                    <div className="flex flex-row flex-1 gap-4 flex-wrap">
                      {grp?.products.map((item, i) => {
                        return (
                          <div
                            data-aos="fade-left"
                            data-aos-anchor="#example-anchor"
                            data-aos-offset="500"
                            data-aos-duration="500"
                            key={i}
                            className="w-full border border-gray-300 max-w-[250px] bg-white rounded-lg"
                          >
                            <AccessProductItem noPrice noLink id={item._id} image={item.image} name={item.name} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SubscriptionPage4;
