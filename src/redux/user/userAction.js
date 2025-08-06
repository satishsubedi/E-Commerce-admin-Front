import {
  createUser,
  deleteUser,
  getAllUsers,
  getNewAccessJwt,
  getUser,
  logoutUser,
  updateUser,
} from "../../axios/userAxios";
import { toast } from "react-toastify";
import { resetUser, setAccessJWT, setUser, setUsers } from "./userSlice";

//Redux Thunk
// GET USER ACTION
export const getUserAction = () => async (dispatch) => {
  const response = await getUser();

  if (response?.status == "error") {
    toast.error(response.message || "Error getting user");
    return response;
  }
  // If the response is successful, dispatch the setUser action with the user data
  dispatch(setUser(response.payload));

  return response;
};

//GET ALL USER ACTION
export const getAllUsersAction = () => async (dispatch) => {
  const response = await getAllUsers();

  if (response?.status == "error") {
    toast.error(response?.message || "Error getting users!");
    return response;
  }
  // If the response is successful, dispatch the setUser action with the user data

  dispatch(setUsers(response.payload));
};

//CREATE USER ACTION
export const createUserAction = (formData) => async (dispatch) => {
  try {
    const response = await createUser(formData);

    if (response?.status === "error") {
      toast.error(response.message || "Error creating user!");
      return response;
    }

    // If the response is successful, refresh the users list
    dispatch(getAllUsersAction());
    return response;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Error creating user!";
    toast.error(errorMessage);
    throw error; // Re-throw to be handled by the component
  }
};

//UPDATE USER ACTION
export const updateUserAction = (userId, formData) => async (dispatch) => {
  try {
    const response = await updateUser(userId, formData);

    if (response?.status === "error") {
      toast.error(response.message || "Error updating user!");
      return response;
    }
    // If the response is successful, refresh the users list
    await dispatch(getAllUsersAction());
    return response;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Error updating user!";
    toast.error(errorMessage);
    throw error; // Re-throw to be handled by the component
  }
};

//DELETE USER ACTION
export const deleteUserAction = (userId) => async (dispatch) => {
  try {
    const response = await deleteUser(userId);

    if (response?.status === "error") {
      toast.error(response.message || "Error deleting user!");
      return response;
    }
    toast.success(response.message || "User deleted!");
    // If the response is successful, refresh the users list after successful deletion
    dispatch(getAllUsersAction());
    return response;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Error deleting user!";
    toast.error(errorMessage);
    throw error; // Re-throw to be handled by the component
  }
};

// LOGOUT USER ACTION
export const logoutUserAction = (email) => async (dispatch) => {
  try {
    // call api to delete session and update user's refesh token
    const response = await logoutUser(email);

    if (response?.status === "success") {
      // remove tokens from storage
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");

      // clear state
      dispatch(resetUser({}));
      toast.success(response.message);
      return response;
    }
    toast.error(response.message);
    return response;
  } catch (error) {
    toast.error(error.message || "Logout failed");
    throw error;
  }
};

// AUTOLOGIN
export const autoLoginAction = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");

  if (!accessJWT && refreshJWT) {
    const response = await getNewAccessJwt();

    if (response?.status === "success") {
      const newToken = response.payload.accessJWT;

      // Update Redux state with new access token
      dispatch(setAccessJWT(newToken));

      // Fetch user data after getting new access token
      dispatch(getUserAction());
      return;
    }
  }
  // Have accessJWT - validate it by getting user
  if (accessJWT) {
    dispatch(setAccessJWT(accessJWT));
    dispatch(getUserAction());
    return;
  }
};
