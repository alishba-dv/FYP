import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { BsJournalBookmark } from "react-icons/bs";
import { MdAddCircleOutline } from "react-icons/md";
import { MdBorderColor } from "react-icons/md";
import { RiLogoutBoxLine, RiUserFollowFill } from "react-icons/ri";
import { IoIosGitPullRequest } from "react-icons/io";
import { RiProfileFill } from "react-icons/ri";
import { IoMdAnalytics } from "react-icons/io";
import { FaUsersRectangle } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaShoppingCart } from 'react-icons/fa';  // Import the icon from React Icons

export const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="w-[18%] min-h-screen border-r-2 bg-red-#[DADADA]  ">
      <div className="flex flex-col gap-4 text-[15px]">
        <div className="flex items-center justify-center h-20 shadow-md bg-red-500">
          <MdOutlineAdminPanelSettings className=" text-2xl text-white"></MdOutlineAdminPanelSettings>
          <h1 className=" pl-2 font-bold text-white hidden md:block">FurLiva</h1>
        </div>

        <div className="flex flex-col gap-4 px-4">
          <NavLink to="/analytics" className="flex items-center gap-3 px-3 py-2 rounded-l">
            <IoMdAnalytics className="w-5 h-5"></IoMdAnalytics>
            <p className="hidden sm:block">Analytics</p>
          </NavLink>

          <NavLink to="/subscription" className="flex items-center gap-3 px-3 py-2 rounded-l">
            <RiProfileFill className="w-5 h-5"></RiProfileFill>
            <p className="hidden sm:block">Subscriptions</p>
          </NavLink>
          
          <NavLink to="/subscribers" className="flex items-center gap-3 px-3 py-2 rounded-l">
            <RiUserFollowFill className="w-5 h-5" />
            <p className="hidden sm:block">Subscribers</p>
          </NavLink>

          <NavLink to="/add" className="flex items-center gap-3 px-3 py-2 rounded-l">
            <MdAddCircleOutline className="w-5 h-5"></MdAddCircleOutline>
            <p className="hidden sm:block">Add Product</p>
          </NavLink>

          <NavLink to="/list" className="flex items-center gap-3 px-3 py-2 rounded-l">
            <MdBorderColor className="w-5 h-5"></MdBorderColor>
            <p className="hidden sm:block">Inventory</p>
          </NavLink>
          <NavLink to="/order" className="flex items-center gap-3 px-3 py-2 rounded-l">
            <BsJournalBookmark className="w-5 h-5"></BsJournalBookmark>
            <p className="hidden sm:block">Orders</p>
          </NavLink>
          <NavLink to="/adoption" className="flex items-center gap-3 px-3 py-2 rounded-l">
            <IoIosGitPullRequest className="w-5 h-5"></IoIosGitPullRequest>
            <p className="hidden sm:block">Adoption Requests</p>
          </NavLink>
          <NavLink to="/users" className="flex items-center gap-3 px-3 py-2 rounded-l">
            <FaUsersRectangle className="w-5 h-5"></FaUsersRectangle>
            <p className="hidden sm:block">Users</p>
          </NavLink>
          <NavLink to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-l">
            <RiProfileFill className="w-5 h-5"></RiProfileFill>
            <p className="hidden sm:block">Profile</p>
          </NavLink>
          <NavLink
          to="/sales"  // Link to the sales management page
          className="flex items-center gap-3 px-3 py-2 rounded-l"
        >
          <FaShoppingCart className="w-5 h-5" />  {/* Icon for Sales */}
          <p>Sale</p>
        </NavLink>
          <button
            onClick={e => {
              e.preventDefault();

              localStorage.removeItem("Role");
              localStorage.removeItem("token");
              localStorage.removeItem("curr_adminEmail");
              logout();

              toast.error("Logged out successfully.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
              });
            }}
            className="flex items-center gap-3 px-3 py-2 rounded-l"
          >
            <RiLogoutBoxLine className="w-5 h-5"></RiLogoutBoxLine>
            <p className="hidden sm:block">Logout</p>
          </button>
        </div>
      </div>

      <div className="ml-64 flex-1 p-4"></div>
    </div>
  );
};
