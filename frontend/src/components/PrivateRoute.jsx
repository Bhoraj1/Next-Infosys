import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const adminDetails = useSelector((state) => state.admin);
  return adminDetails.isAdmin ? <Outlet /> : <Navigate to="/" />;
}
