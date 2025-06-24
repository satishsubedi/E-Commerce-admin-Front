import { axiosApiCall } from "./axiosApiCall";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/product`;

// GET all products | GET | PUBLIC
export const getAllProducts = () => {
  return axiosApiCall({
    method: "get",
    url: USER_API_URL,
  });
};

// GET a product | GET | PUBLIC
export const getProduct = (productId) => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/Id/${productId}`,
  });
};

// ADD a new product | POST | PRIVATE
export const addProduct = (productData) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/addProduct`,
    data: productData,
    // isPrivate: true,
  });
};

//update product | PATCH | PRIVATE
export const updateProduct = (productId, productData) => {
  return axiosApiCall({
    method: "patch",
    url: `${USER_API_URL}/${productId}`,
    data: productData,
    isPrivate: true,
  });
};

// DELETE a product | DELETE | PRIVATE
export const deleteProduct = (productId) => {
  return axiosApiCall({
    method: "delete",
    url: `${USER_API_URL}/deleteProducts/${productId}`,
  });
};
