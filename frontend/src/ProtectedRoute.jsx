import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ isLoggedIn, to = "" }) {
  return isLoggedIn ? <Outlet /> : <Navigate to={to ?? "/login"} />;
}
