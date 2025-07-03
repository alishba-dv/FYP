import React, { useContext } from "react";
import Image1 from "../assets/image25.jpg";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

export const Subscription = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(ShopContext);

  const handleSubmit = e => {
    navigate(isLoggedIn ? "/sub2" : "/login");
  };

  return (
    <>
      <div
        className="relative bg-cover bg-center h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${Image1})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-1 text-center text-white px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-10">Unlimited care, essentials, and more for your pets!</h1>

          <h2 className="text-md font-bold md:text-lg mb-6">
            Ready to pamper your furry friend? Subscribe and get started with our pet care kits.
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <button type="submit" className="px-8 py-4 bg-[#F24C4C] text-white text-lg font-bold rounded-lg">
                Get Started
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
