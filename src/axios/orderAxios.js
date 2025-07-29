import { axiosApiCall } from "./axiosApiCall.js";
const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;

const orderApiEndPoint = `${apiBaseUrl}/api/v1/order`;

// Get all orders (Admin)
export const getOrderApi = () => {
  const token = localStorage.getItem("accessJWT");
  return axiosApiCall({
    url: `${orderApiEndPoint}/history`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Update order or payment status
export const orderStatus = (orderId, updatedData) => {
  const token = localStorage.getItem("accessJWT");
  return axiosApiCall({
    method: "patch",
    url: `${orderApiEndPoint}/status/${orderId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: updatedData, // { orderStatus: "Processing" } or { paymentStatus: "Refunded" }
  });
};
