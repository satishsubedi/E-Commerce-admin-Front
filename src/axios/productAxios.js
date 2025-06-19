import { axiosApiCall } from "./axiosApiCall";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1`;

// ADD a new product | POST | PRIVATE
export const addProduct = (product) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/product/addProduct`,
    data: product,
    // isPrivate: true,
  });
};
