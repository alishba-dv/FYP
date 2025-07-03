import { createContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();
import Cookies from "js-cookie"; // Importing the js-cookie library

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(() => {
    try {
<<<<<<< HEAD
      return  (Cookies.get('curr_adminEmail')); // Check if token exists in cookies
=======
      return  (Cookies.get('user')); // Check if token exists in cookies
>>>>>>> 90cd219c228b5a0141eeb0d030ff8eca3a3897ad
 
    } catch (error) {
      console.error("Error parsing user from cookie:", error);
      return null;
    }
  });

  // ✅ Update localStorage in login/logout instead of useEffect
  const login = (userData) => {
    setUser(userData);
    document.cookie=`user= ${JSON.stringify(user)};path=/;`;

  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user"); // Remove the user cookie
  };

  const value = {
    login,
    logout,
    isLoggedIn: !!user, // Convert user to boolean
    user,
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;
