import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"
import getSubscriptionStatus from "../utils/getSubscriptionStatus";

export default function Subscribers() {
  const [plans, plansSet] = useState([]);
  const [option, optionSet] = useState("All");
  const [loading, loadingSet] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    toast.dismiss(); // Clear all previous toasts
  }, []);
  const host = window.location.hostname === 'localhost'
  ? 'localhost'
  : '0.0.0.0'; 
  useEffect(() => {
    const fetchData = async () => {
      !loading && loadingSet(true);
      try {
        // const token = localStorage.getItem("token");
        // console.log("Token from order list admin: ", token);
        const response = await axios.get(`http://${host}:8080/api/auth/subscription/getSubscribers/${option}`, {
          withCredentials:true, 
        });
        console.log("Plans ",response.data.plans);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          // theme: 'colored',
          // style: { marginRight: '100px' },
        });
        plansSet(response.data.plans);
      } catch (error) {
        if (error.response.status == 400) {
          toast.error(`Session expired. `, {
            position: "top-right",
            // style: { marginRight: '100px' },

            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });

          toast.info(
            <div>
              Login Here!{" "}
              <a href="/" style={{ color: "red", textDecoration: "underline" }}>
                Login
              </a>
            </div>,
            {
              position: "top-right",
              autoClose: false, // Auto-dismiss after 5 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        }
        console.error("Error fetching data:", error.message);
        toast.error(" Failed to fetch Orders.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          // style: { marginRight: '100px' },
        });
        // toast.error('Failed to fetch orders. Please try again.');
      } finally {
        loadingSet(false)
      }
    };
    fetchData();
  }, [option]);

  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-0 py-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-red-500 ">
          Subscribers <span className="text-black">List</span>
        </h1>


        <div className="flex items-center gap-2">
          {["Expired", "Active", "All"].map((val, index) => {
            const isActive = (val === option);
            return <button onClick={() => !isActive && optionSet(val)} key={index} className={`py-2 px-4 rounded-lg ${isActive ? "bg-red-500" : "bg-gray-600"} font-medium text-white`}>{val}</button>
          })}
        </div>
      </div>

      {loading ? <div className="text-gray-600 text-lg flex items-center justify-center w-full min-h-[500px]">Loading ...</div> :
        plans.length === 0 ? (
          <p className="text-gray-600 text-lg flex items-center justify-center w-full min-h-[500px]">No subscriber found.</p>
        ) : (
          <table className="w-full table-auto bg-white">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="py-5 px-4 text-left text-xl font-semibold">Name</th>
                <th className="py-5 px-4 text-left text-xl font-semibold">Email</th>
                <th className="py-5 px-4 text-left text-xl font-semibold">Plan Name</th>
                <th className="py-5 px-4 text-left text-xl font-semibold">On</th>
                <th className="py-5 px-4 text-left text-xl font-semibold">Expiry Date</th>
                <th className="py-5 px-4 text-left text-xl font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {plans.map((plan, index) => {

                const { isExpired, status } = getSubscriptionStatus(plan?.expiryDate);
                return <tr key={index} className={`transition-all ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-indigo-100`}>
                  <td className="py-5 px-4 text-gray-800 font-medium">{plan?.user?.name || "N/A"}</td>
                  <td className="py-5 px-4 text-gray-600">{plan?.user?.email || "N/A"}</td>
                  <td onClick={() => plan?.subscription && navigate("/subscription")} className={`py-5 hover:underline cursor-pointer px-4 ${plan?.subscription?.name ? "text-gray-600" : "text-red-500"}`}>{plan?.subscription?.name ?? "**Deleted**"}</td>
                  <td className="py-5 px-4 text-gray-600">{dayjs(plan?.startDate).format("DD-MM-YYYY")}</td>
                  <td className="py-5 px-4 text-gray-600">{dayjs(plan?.expiryDate).format("DD-MM-YYYY")}</td>
                  <td className={`py-5 px-4 text-gray-600 ${isExpired ? "text-red-500" : "text-green-600"}`}>{status}</td>
                </tr>
              })}
            </tbody>
          </table>
        )}
    </div>
  );
}
