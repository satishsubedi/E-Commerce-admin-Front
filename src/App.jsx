import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/Auth/LoginPage";
import { ToastContainer } from "react-toastify";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import ChangePasswordPage from "./pages/Auth/ChangePasswordPage";
import AdminLayout from "./components/admin-layout/AdminLayout";

import AddProduct from "./pages/AddProductPage";

function App() {
  return (
    <>
      <Routes>
        {/* public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgotPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/addProduct" element={<AddProduct />} />
        {/* private Routes */}
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
