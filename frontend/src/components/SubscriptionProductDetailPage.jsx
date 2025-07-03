import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AccessProductItem } from "./AccessProductItem";
import { IoArrowBackOutline } from "react-icons/io5";

const SubscriptionProductDetailPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const [plan, planSet] = useState(null);
  const [loading, loadingSet] = useState(true);
	const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
  async function getPlan() {
    try {
      const response = await axios.get(`http://${host}:8080/api/auth/subscription/getById/${id}`, {
        withCredentials:true,
      });
      if (response?.data) {
        console.log(response?.data);
        planSet(response.data.plan);
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

  return (
    <>
      <div className="min-h-screen relative flex flex-col items-center lg:flex-row lg:items-start gap-4 container max-w-screen-2xl mx-auto bg-gray-50 px-6 py-10">
        {loading ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading ...</div>
        ) : (
          <>
            {/** PRODUCT SIDE */}
            <div className="bg-white rounded-lg shadow-lg p-12 w-full text-center animate-fade-in-up flex flex-col gap-8">
              <div className="flex items-center gap-2">
                <button onClick={() => navigate("/manage")} className="p-2">
                  <IoArrowBackOutline className="size-8" color="#ef4444" />
                </button>
                <h1 className="text-2xl text-start md:text-4xl font-bold text-gray-800">Product Packs</h1>
              </div>

              <div className="flex flex-col gap-4">
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
    </>
  );
};

export default SubscriptionProductDetailPage;
