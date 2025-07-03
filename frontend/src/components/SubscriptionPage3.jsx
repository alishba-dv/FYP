import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [plans, plansSet] = useState([]);
  // const token = localStorage.getItem("token");
  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log("USER",user);
   
  
  const [loading, loadingSet] = useState(true);
  	const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0';  
  async function getSubscriptions() {
    try {
      const response = await axios.get(`http://${host}:8080/api/auth/subscription/getAll`, {
        withCredentials: true,
      });
      console.log("response", response.data);
      if (response?.data) {
        plansSet(response.data.subscriptions);
      }
    } catch (err) {
      console.log(err);
    } finally {
      loadingSet(false);
    }
  }

  useEffect(() => {
    getSubscriptions();
  }, []);

  async function subscribe(plan) {
    const body = {
      plan,
    };
    try {
      const stripe = await loadStripe("pk_test_51IfPckI9Cx0UeZSmDtoxrbcKjUokaCoNliigSjzJofNY9D6EWxDe1zO18YOZlMZeyBCNr36M1E1v79eEP6HPecTu00uWfvIR4R");

      const response = await axios.post("http://${host}:8080/api/auth/subscription/subscribe", body, {
       withCredentials:true,
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
          console.error("Stripe redirect error:", result.error);
          toast.error(`Failed to redirect to Stripe checkout`, {
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
    } finally {
    }
  }

  return (
    <>
      <div className=" min-h-screen bg-gradient-to-b r from-blue-100 via-purple-100 to-pink-100">
        <h1 className="text-3xl md:text-4xl pt-10 font-bold text-center">Choose your plan</h1>
        {loading ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading ...</div>
        ) : (
          <div className=" flex flex-wrap  justify-center sm:gap-6 p-8">
            {plans?.map((plan, index) => (
              <div key={index} className="w-full mt-10 sm:mt-15 max-w-sm bg-white rounded-lg shadow-md border border-gray-200 flex flex-col text-center">
                <div className={`relative bg-red-500  rounded-t-lg py-4`}>
                  <h3 className="text-white text-lg font-bold">{plan.name}</h3>
                  <p className="text-white text-2xl font-extrabold">{plan.price}</p>
                  <p className="text-white text-sm mt-1 uppercase">{plan.timeFrame}</p>
                  <div className={`absolute w-4 h-4  -bottom-2 left-1/2 transform -translate-x-1/2 rotate-45`} />
                </div>

                <ul className="flex-1 p-6 space-y-4 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={`flex items-center `}>
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

                <div className="p-6">
                  <button
                    onClick={() => navigate(`/sub4/${plan._id}`)}
                    disabled={plan?.isSubscribed}
                    className={`w-full py-3 text-white font-bold rounded-lg bg-red-500 hover:opacity-90 disabled:bg-gray-400`}
                  >
                    {plan?.isSubscribed ? "ALREADY SUBSCRIBED" : "SUBSCRIBE NOW"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        
      </div>
    </>
  )  };

export default SubscriptionPage;
