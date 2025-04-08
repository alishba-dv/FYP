import axios from "axios";
import React, { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const Subscription = () => {
  const [packages, setPackages] = useState([]);
  const [loading, loadingSet] = useState(true);
  const navigate = useNavigate();
  const goToAddSubscriptionPage = () => navigate("/subscription/add");
  const host = window.location.hostname === 'localhost'
  ? 'localhost'
  : '0.0.0.0'; 
  const { pathname } = useLocation();
  const isAddSubscriptionPage = useMemo(() => pathname === "/subscription/add", [pathname]);
  // const token = localStorage.getItem("token");
  const [editSubscription, editSubscriptionSet] = useState(null);

  function edit(sub) {
    editSubscriptionSet(sub);

    navigate("/subscription/add?edit=true");
  }

  useEffect(() => {
		toast.dismiss(); // Clear all previous toasts
	}, []);
  async function getSubscriptions() {
    
    try {
      const response = await axios.get(`http://${host}:8080/api/auth/subscription`, {
       withCredentials:true,
      });
      if (response?.data) {
        setPackages(response.data.subscriptions);
      }
    } catch (err) {
    } finally {
      loadingSet(false);
    }
  }

  useEffect(() => {
    getSubscriptions();
  }, []);

  async function deleteSubscription(subId, index) {
    try {
      const response = await axios.delete(`http://${host}:8080/api/auth/subscription/${subId}`, {
        withCredentials:true,
      });
      if (response?.data) {
        toast.success("Deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setPackages(prevItems => prevItems.filter((_, idx) => idx !== index));
      }

      
    } catch (err) {
      
     

        toast.error("Deletion failed", {
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
  

  return (
    <div className="container mx-auto p-8 bg-gradient-to-b from-white-100 to-indigo-200 min-h-screen flex flex-col gap-8">
      <div className="flex items-center justify-between">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-red-500 ">
          Subscription <span className="text-black">Management</span>
        </h1>        {!isAddSubscriptionPage ? (
          <button onClick={goToAddSubscriptionPage} className="bg-red-500 rounded-lg text-white p-2">
            Add New
          </button>
        ) : null}
      </div>

      <Outlet context={{ setPackages, editSubscription }} />
      {!isAddSubscriptionPage ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border rounded-lg p-2">
          {!loading ? (
            packages?.length ? (
              packages.map((pkg, index) => (
                <div key={pkg._id} className="bg-white rounded-lg shadow-lg p-6">
                  {/* Editable Package Name */}
                  <div className="text-2xl font-semibold w-full mb-4 border-b focus:outline-none">{pkg.name}</div>

                  {/* Editable Package Price */}
                  <div className="text-xl w-full mb-6 border-b focus:outline-none">Price: {pkg.price} PKR</div>

                  <div className="text-xl text-center w-full mb-6 bg-gray-200 p-1 rounded-lg">{pkg?.timeFrame}</div>

                  <div className="flex flex-col gap-2">
                    <div className="font-bold">Features:</div>
                    <ul className="!flex-1">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 mb-3">
                          <input disabled type="text" value={feature} className="text-lg w-full border p-2 rounded-lg focus:outline-none" />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="font-bold">Product Group:</div>
                    <ul className="!flex-1 flex flex-col">
                      {pkg.productGroup.map((prodGroup, index) => (
                        <li key={index} className="flex items-center gap-3 mb-3">
                          <input disabled type="text" value={prodGroup.name} className="text-lg w-full border p-2 rounded-lg focus:outline-none" />
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Save Button */}
                  <button onClick={() => edit(pkg)} className="mt-6 bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-red-700 w-full">
                    Edit Subscription
                  </button>

                  {/* Save Button */}
                  <button
                    onClick={() => deleteSubscription(pkg._id, index)}
                    className="mt-6 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-700 w-full"
                  >
                    Delete Subscription
                  </button>
                </div>
              ))
            ) : (
              <div className="min-h-96 flex flex-col gap-2 items-center justify-center text-center col-span-3">
                <div>No subscriptions yet, Create One!</div>
                <button onClick={goToAddSubscriptionPage} className="bg-red-500 rounded-lg text-white p-2">
                  Add New
                </button>
              </div>
            )
          ) : (
            <div className="min-h-96 flex flex-col gap-2 items-center justify-center text-center col-span-3">
              <div>Loading ...</div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
