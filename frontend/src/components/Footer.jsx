import React from "react";
import logo from "../assets/logo.png";
import { NavLink, Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import Image1 from "../assets/img6.svg";
import Image2 from "../assets/img7.svg";
export const Footer = () => {
  return (
    <div>
      <div className="bg-gray-200 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] py-5 px-3 gap-14 justify-self-end mt-10 text-sm">
        <div>
          <NavLink to="/">
            <img src={logo} alt="Logo" className="w-[120px] h-auto ml-3" />
          </NavLink>
          <p className="pl-3 pt-4 w-full md:w-2/3 text-gray-600">
            Furliva is a comprehensive pet care and adoption system designed to bring convenience, care, and community to pet lovers. It offers a seamless blend
            of e-commerce and pet services, providing a wide range of high-quality pet products, personalized care kits, and an intuitive adoption module.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link to={"/"}>
              {" "}
              <li>Home</li>
            </Link>
            <Link to={"/collection"}>
              {" "}
              <li>Collection</li>
            </Link>
            <Link to={"/adoption"}>
              {" "}
              <li>Adoption</li>
            </Link>
            <Link to={"/blog"}>
              {" "}
              <li>Blog</li>
            </Link>
            <Link to={"/about"}>
              {" "}
              <li>About us</li>
            </Link>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-medium mb-5">FOLLOW US</h3>
          <div className="flex space-x-4 text-lg">
            <FaTwitter className="cursor-pointer  text-2xl hover:text-blue-500" />
            <FaFacebookF className="cursor-pointer  text-2xl hover:text-blue-600" />
            <FaYoutube className="cursor-pointer text-2xl hover:text-red-500" />
            <FaInstagram className="cursor-pointer text-2xl hover:text-pink-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
