import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const ManageSubscription = () => {
  const navigate = useNavigate();
  const [plans, plansSet] = useState(null);
  const token = localStorage.getItem("token");
  const [loading, loadingSet] = useState(true);
  const [cancelOpen, cancelOpenSet] = useState(false);
  const toggleCancelModal = id => cancelOpenSet(pre => (pre ? false : id));
  const host = window.location.hostname === 'localhost'
  ? 'localhost'
  : '0.0.0.0'; 
  async function getPlans() {
    try {
      const response = await axios.get(`http://${host}:8080/api/auth/subscription/getByUserId`, {
      withCredentials:true, 
      });
      if (response?.data) {
        console.log("Plans of response",response)
        plansSet(response.data.plans);
      }
    } catch (err) {
      console.log(err);
    } finally {
      loadingSet(false);
    }
  }

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <>
      {cancelOpen && <CancelModal id={cancelOpen} toggleCancelModal={toggleCancelModal} token={token} />}
      <div className="container max-w-screen-xl mx-auto  flex flex-col gap-6 items-center sm:items-start px-6 py-8 sm:py-2">
        <h1 className="text-[#F24C4C] text-5xl font-semibold text-center  sm:pt-12 sm:text-left" style={{ fontFamily: "Playfair Display, serif" }}>
          Manage <span className="text-black">Membership</span>
        </h1>
        <h2 className="text-2xl  font-semibold  mb-2">Plan Details</h2>

        {loading ? (
          <div className="min-h-96 text-center flex items-center justify-center mx-auto">Loading ...</div>
        ) : plans?.length ? (
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans?.map((plan, index) => {
              
              const { subscription } = plan;
              return (
                <div
                  key={index}
                  onClick={() => navigate(`/manage/productDetail/${subscription._id}`)}
                  className="cursor-pointer relative z-0 flex-1 max-w-sm bg-white rounded-lg shadow-md border border-gray-200 flex flex-col text-center pb-4"
                >
                  <div className={`relative bg-[#F24C4C]  rounded-t-lg py-4`}>
                    <h3 className="text-white text-lg font-bold">{subscription.name}</h3>
                    <p className="text-white text-2xl font-extrabold">{subscription.price}</p>
                    <p className="text-white text-sm mt-1 uppercase">{subscription.timeFrame}</p>
                    <div className={`absolute w-4 h-4  -bottom-2 left-1/2 transform -translate-x-1/2 rotate-45`} />
                  </div>

                  <ul className="flex-1 p-6 space-y-4 text-left">
                    {subscription.features.map((feature, i) => (
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

                  <div className="flex flex-col gap-4 px-6 z-50 relative">
                    <button disabled className={`w-full py-3 text-black font-bold rounded-lg bg-red-500 hover:opacity-90 disabled:bg-gray-300`}>
                      {dayjs(plan.expiryDate).diff(dayjs(), "days")} days left
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleCancelModal(plan._id);
                      }}
                      className={`w-full py-3 text-white font-bold rounded-lg bg-red-500 hover:opacity-90 disabled:bg-gray-400`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="min-h-96 items-center justify-center w-full flex flex-col gap-4">
            <div>You don't have subscribed to any plan yet!</div>
            <button onClick={() => navigate("/sub3")} className="bg-red-500 p-3 text-white rounded-lg shadow-lg font-bold">
              Click to learn more!
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageSubscription;

export function CancelModal({ id, toggleCancelModal, token }) {
  const [loading, loadingSet] = useState(false);
  const navigate = useNavigate();

  async function cancel() {
    loadingSet(true);
    try {
      const response = await axios.delete(`http://${host}:8080/api/auth/subscription/cancel/${id}`, {
       withCredentials:true,
      });
      if (response?.data) {
        toast.success(`Subscription Cancelled Successfully`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        navigate("/sub3");
      }
    } catch (err) {
      toast.error(`Failed to cancel Subscription`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      loadingSet(false);
    }
  }
  return (
    <>
      <div className="fixed z-[1000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg border p-5 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div className="text-2xl font-bold text-red-500">Cancel</div>
          <div className="">Are you sure you want to cancel subscription ?</div>
        </div>

        <div className="flex items-center gap-2 justify-end">
          <button onClick={toggleCancelModal} className={`w-fit p-3 text-white font-bold rounded-lg bg-gray-400 hover:opacity-90 disabled:bg-gray-400`}>
            Back
          </button>
          <button onClick={cancel} className={`w-fit p-3 text-white font-bold rounded-lg bg-red-500 hover:opacity-90 disabled:bg-gray-400`}>
            {loading ? "Cancelling ..." : "Confirm"}
          </button>
        </div>
      </div>

      <div onClick={toggleCancelModal} className="fixed inset-0 bg-black/10 z-50" />
    </>
  );
}
