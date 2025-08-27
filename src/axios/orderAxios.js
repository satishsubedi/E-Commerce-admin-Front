import { axiosApiCall } from "./axiosApiCall.js";
const ORDER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/order`;

// Get all orders (Admin)
export const getOrderApi = () => {
  return axiosApiCall({
    url: `${ORDER_API_URL}/history`,
    method: "get",
    isPrivate: true,
  });
};

// Update order or payment status
export const orderStatus = (orderId, updatedData) => {
  return axiosApiCall({
    method: "patch",
    url: `${ORDER_API_URL}/status/${orderId}`,
    data: updatedData,
    isPrivate: true,
  });
};

//get dashboard data
export const getDashboardData = () => {
  return axiosApiCall({
    method: "get",
    url: `${ORDER_API_URL}/dashboard`,
    isPrivate: true,

  });
};

//get top product
export const getTopProduct = () => {
  return axiosApiCall({
    method: "get",
    url: `${ORDER_API_URL}/top-products`,
    isPrivate: true,

  });
};

//This is for adding notes to specific order
export const orderNote = (orderId, note) => {
  return axiosApiCall({
    method: "patch",
    url: `${ORDER_API_URL}/orders/${orderId}/note`,
    data: { note },
    isPrivate: true,
  });
};

//This is for sending the note abut order
export const sendOrderNoteEmail = (orderId, note) => {
  return axiosApiCall({
    method: "post",
    url: `${ORDER_API_URL}/orders/${orderId}/send-note-email`,
    data: { note },
    isPrivate: true,
  });
};
