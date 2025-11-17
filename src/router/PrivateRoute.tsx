import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";


export default function PrivateRoute() {
    // Use real authentication logic here in production
  const isAuthenticated = Boolean(localStorage.getItem("token")); 

  useEffect(() => {
    console.log(isAuthenticated)
  }, [isAuthenticated])
  

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}