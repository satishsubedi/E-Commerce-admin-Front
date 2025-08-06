import { axiosApiCall } from "./axiosApiCall.js";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/review`;

//GET all the reviews
export const getAllReviews = () => {
  return axiosApiCall({
    method: "GET",
    url: `${USER_API_URL}/all`,
    isPrivate: true,
  });
};

//UPdate review status
export const updateReviewStatus = (reviewId, newStatus) => {
  return axiosApiCall({
    method: "PATCH",
    url: `${USER_API_URL}/update-status/${reviewId}`,
    data: { newStatus },
    isPrivate: true,
  });
};
