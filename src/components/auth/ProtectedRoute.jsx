import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { autoLoginAction } from "../../redux/user/userAction";
import PageLoadingSpinner from "../helper/PageLoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");

  useEffect(() => {
    // If no tokens exist, redirect to login
    if (!accessJWT && !refreshJWT) {
      return navigate("/login");
    }

    // If user is not loaded but tokens exist, try auto-login
    if (!user?._id && (accessJWT || refreshJWT)) {
      dispatch(autoLoginAction());
    }
  }, [user?._id, navigate, dispatch]);

  // Show loading while checking authentication
  if (!user?._id) {
    if (accessJWT || refreshJWT) {
      return (
        <div className="flex items-center justify-center h-screen">
          <PageLoadingSpinner pageName="Refresh page " />
        </div>
      );
    }

    return null; // redirect to login
  }

  // Check if user is admin
  if (user?.role !== "admin") {
    // Redirect non-admin users to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
