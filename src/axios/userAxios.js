import { axiosApiCall } from "./axiosApiCall";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/auth`;

// Get new access token using refresh token | GET | PRIVATE
// This function is used to get a new access token using the refresh token
//  when the current access token is expired.

export const getNewAccessJwt = () => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/accessjwt`,
    isPrivate: true,
    useRefreshToken: true,
  });
};

// LOGIN USER | POST | /login  | PUBLIC
export const loginUser = (loginData) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/login`,
    data: loginData,
  });
};

// GET the user | GET | PRIVATE
export const getUser = () => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/user-info`,
    isPrivate: true,
  });
};

//GET all the users | GET | PRIVATE
export const getAllUsers = () => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/all-users`,
    // isPrivate: true,
  });
};

//CREATE a new user | POST | PRIVATE
export const createUser = (userData) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/register`,
    data: userData,
    // isPrivate: true,
  });
};

//UPDATE a user | PATCH | PRIVATE
export const updateUser = (userId, userData) => {
  return axiosApiCall({
    method: "patch",
    url: `${USER_API_URL}/update/${userId}`,
    data: userData,
    // isPrivate: true,
  });
};

//DELETE a user | DELETE | PRIVATE
export const deleteUser = (userId) => {
  return axiosApiCall({
    method: "delete",
    url: `${USER_API_URL}/delete/${userId}`,
    // isPrivate: true,
  });
};

//LOGOUT USER | POST | PRIVATE
export const logoutUser = (email) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/logout`,
    data: { email },
    isPrivate: true,
  });
};

//FORGET PASSWORD | /forget-password | POST | PUBLIC
export const forgetPasswordEmail = (formData) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/forget-password`,
    data: formData,
  });
};

// CHANGE PASSWORD | /change-password | PATCH
export const changePassword = (data) => {
  return axiosApiCall({
    method: "patch",
    url: `${USER_API_URL}/change-password`,
    data: data,
  });
};
