import React, { useContext } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Add } from "./pages/Add";
import { List } from "./pages/List";
import { Login } from "./pages/Login";
import { Orders } from "./pages/Orders";
import { Profile } from "./pages/profile.jsx";
import { User } from "./pages/users";
import { DashBoard } from "./pages/DashBoard";
import ProtectedRoute from "./ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import { Adoption } from "./pages/adoption";
import { Subscription } from "./pages/subscriptions";
import AddSubscription from "./pages/AddSubscription";
import { AuthContext } from "./context/AuthContext";
import ForgotPage1 from "./pages/ForgotPage1";
import ForgotPassword2 from "./pages/ForgotPassword2";
import ForgotPassword3 from "./pages/ForgotPassword3";
import ForgotPassword4 from "./pages/ForgotPassword4";
import Subscribers from "./pages/Subscribers.jsx";
import {AdminSales} from "./pages/AdminSales.jsx";

export const currency = "RS.";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Routes>
      <Route element={isLoggedIn ? <Navigate to="/analytics" /> : <Outlet />}>
        <Route path="/" element={<Login />} />
        <Route path="/forgot" element={<ForgotPage1></ForgotPage1>} />
        <Route path="/forgot1" element={<ForgotPassword2></ForgotPassword2>} />
        <Route path="/forgot2" element={<ForgotPassword3></ForgotPassword3>} />
        <Route path="/forgot3" element={<ForgotPassword4></ForgotPassword4>} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/list" element={<List />} />
        <Route path="/add" element={<Add />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<User />} />
        <Route path="/analytics" element={<DashBoard />} />
        <Route path="/adoption" element={<Adoption />} />
        <Route path="/sales" element={<AdminSales />} />
        <Route path="/subscription" element={<Subscription />}>
          <Route path="/subscription/add" element={<AddSubscription />} />
        </Route>
        <Route path="/subscribers" element={<Subscribers />} />
      </Route>
    </Routes>
  );
};

export default App;
