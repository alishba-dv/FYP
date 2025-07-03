import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie"; // Importing the js-cookie library
import "react-toastify/dist/ReactToastify.css";
const useLogout = () => {
  const navigate = useNavigate();

  function logout() {
    // localStorage.removeItem("Role");
    // localStorage.removeItem("token");
    // localStorage.removeItem("curr_adminEmail");
Cookies.remove("token");
Cookies.remove("curr_adminEmail");
    // Cookies.remove("Role");
    Cookies.remove("curr_adminName");
    Cookies.remove("curr_adminId");
    navigate("/");

    toast.error("Logged out successfully.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }

  return { logout };
};

export default useLogout;
