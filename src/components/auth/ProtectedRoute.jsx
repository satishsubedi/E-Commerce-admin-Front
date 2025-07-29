import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { autoLoginAction } from "../../redux/user/userAction";
import LoadingSpinner from "../helper/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const accessJWT = sessionStorage.getItem("accessJWT");
    const refreshJWT = localStorage.getItem("refreshJWT");

    // If no tokens exist, redirect to login
    if (!accessJWT && !refreshJWT) {
      navigate("/login");
      return;
    }

    // If user is not loaded but tokens exist, try auto-login
    if (!user?._id && (accessJWT || refreshJWT)) {
      dispatch(autoLoginAction());
    }
  }, [dispatch, navigate, user?._id]);

  // Show loading while checking authentication
  if (!user?._id) {
    const accessJWT = sessionStorage.getItem("accessJWT");
    const refreshJWT = localStorage.getItem("refreshJWT");

    if (accessJWT || refreshJWT) {
      return (
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      );
    }

    return null; // Will redirect to login
  }

  // Check if user is admin
  if (user?.role !== "admin") {
    // Redirect non-admin users to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
