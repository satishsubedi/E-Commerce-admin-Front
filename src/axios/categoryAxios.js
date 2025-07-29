import { axiosApiCall } from "./axiosApiCall";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/category`;

// GET the category tree | GET | PUBLIC
export const getCategoryTree = () => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/getallCategory`,
    // isPrivate: true,
  });
};

// ADD a new category | POST | PRIVATE
export const addCategory = (category) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/addCategory`,
    data: category,
    // isPrivate: true,
  });
};

// DELETE a category | DELETE | PRIVATE
export const deleteCategory = (categoryId) => {
  return axiosApiCall({
    method: "delete",
    url: `${USER_API_URL}/product/category/${categoryId}`,
    // isPrivate: true,
  });
};

// UPDATE a category | PATCH | PRIVATE
export const updateCategory = (categoryId, categoryobj) => {
  return axiosApiCall({
    method: "patch",
    url: `${USER_API_URL}/product/category/${categoryId}`,
    data: categoryobj,
    // isPrivate: true,
  });
};
