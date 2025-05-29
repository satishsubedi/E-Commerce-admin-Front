import { getUser } from "../../axios/userAxios";
import { toast } from "react-toastify";
import { setUser } from "./userSlice";

//Redux Thunk
// GET USER ACTION
export const getUserAction = () => async (dispatch) => {
  const response = await getUser();
  console.log("getUserAction response: ", response);

  if (response?.status == "error") {
    return toast.error(response.message || "Something went wrong!");
  }
  // If the response is successful, dispatch the setUser action with the user data
  dispatch(setUser(response.data));
};

//UPDATE USER

// LOGOUT USER
