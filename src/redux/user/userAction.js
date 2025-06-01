import { getUser, logoutUser } from "../../axios/userAxios";
import { toast } from "react-toastify";
import { setUser } from "./userSlice";

//Redux Thunk
// GET USER ACTION
export const getUserAction = () => async (dispatch) => {
  const response = await getUser();

  if (response?.status == "error") {
    return toast.error(response.message || "Something went wrong!");
  }
  // If the response is successful, dispatch the setUser action with the user data
  dispatch(setUser(response.payload));

  return response;
};

//UPDATE USER

// LOGOUT USER
export const logoutUserAction = (email) => async (dispatch) => {
  try {
    // call api to delete session and update user's refesh token
    const response = await logoutUser(email);
    console.log("logout response", response);

    if (response?.status === "success") {
      // remove tokens from storage
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");

      // clear state
      dispatch(setUser({}));
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
