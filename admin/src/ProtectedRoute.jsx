import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Sidebar } from "./components/Sidebar";

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AuthContext); // ✅ Use AuthContext

  return isLoggedIn ? ( // 🔹 Check login status correctly
    <div className="flex w-full">
      <Sidebar />
      <div className="w-[70%] mx-auto ml-[max(5vm,25px)] my-8 text-gray-600 text-base">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/" /> // 🔹 Redirect to home if not logged in
  );
};

export default ProtectedRoute;
