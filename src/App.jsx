import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/Auth/LoginPage";
import { ToastContainer } from "react-toastify";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import ChangePasswordPage from "./pages/Auth/ChangePasswordPage";
import AdminLayout from "./components/admin-layout/AdminLayout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ProductsPage from "./pages/Products/ProductsPage";
import UsersPage from "./pages/Users/UsersPage";
import SettingPage from "./pages/setting/SettingPage";
import CouponsPage from "./pages/Coupons/CouponsPage";
import OrdersPage from "./pages/Orders/OrdersPage";
import CategoryPage from "./pages/category/CategoryPage";
import CreateProductPage from "./pages/Products/CreateProductPage";
import EditProductPage from "./pages/Products/EditProductPage";
import ProductImagesPage from "./pages/Products/ProductImagesPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import UnauthorizedPage from "./pages/UnAuthorizedPage/UnauthorizedPage";
import ReviewPage from "./pages/review/ReviewPage";

function App() {
  return (
    <>
      <Routes>
        {/* public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgotPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* private Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="create-product" element={<CreateProductPage />} />
          <Route path="edit-product/:id" element={<EditProductPage />} />
          <Route path="product-images/:id" element={<ProductImagesPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="coupons" element={<CouponsPage />} />
          <Route path="settings" element={<SettingPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="reviews" element={<ReviewPage />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
