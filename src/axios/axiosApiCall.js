import axios from "axios";
import { getNewAccessJwt } from "./userAxios";

export const axiosApiCall = async (axiosParams) => {
  // Destructure the parameters from axiosParams
  const {
    method,
    url,
    data,
    isPrivate = false,
    useRefreshToken = false,
  } = axiosParams;

  // Determine the token based on whether to use refresh token or access token
  const token = useRefreshToken
    ? localStorage.getItem("refreshJWT")
    : sessionStorage.getItem("accessJWT");

  // Set headers based on whether the request is private or not
  const headers = {
    Authorization: isPrivate && token ? token : null,
  };

  try {
    // Make the API call using axios
    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    if (response.data.status === "error") {
      throw { message: response.data.message || "An error occurred" };
    }
    return response.data;
  } catch (error) {
    // handle error
    // If access token is expired, try to get new access token using the refresh token
    // and use that new access token to call api
    if (error.message === "jwt expired") {
      const response = await getNewAccessJwt();

      if (response?.status === "success") {
        sessionStorage.setItem("accessJWT", response.data);

        return axiosApiCall(axiosParams);
      }

      return {
        status: "error",
        message: error.message || "Something went wrong!",
      };
    }

    console.error(error);
    throw error;
  }
};
