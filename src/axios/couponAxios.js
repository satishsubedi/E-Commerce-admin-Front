import { axiosApiCall } from "./axiosApiCall.js";
const COUPON_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/coupon`;

//create a new coupon | POST | PRIVATE
export const createCoupon = (couponData) => {
  return axiosApiCall({
    method: "post",
    url: `${COUPON_API_URL}/createCoupon`,
    data: couponData,
    // isPrivate: true,
  });
};

//get all the coupons | GET | PRIVATE
export const getAllCoupons = () => {
  return axiosApiCall({
    method: "get",
    url: `${COUPON_API_URL}/getAllCoupon`,
    // isPrivate: true,
  });
};

//update a coupon | PATCH | PRIVATE
export const updateCoupon = (couponId, couponData) => {
  return axiosApiCall({
    method: "patch",
    url: `${COUPON_API_URL}/updateCoupon/${couponId}`,
    data: couponData,
    // isPrivate: true,
  });
};

//delete a coupon | DELETE | PRIVATE
export const deleteCoupon = (couponId) => {
  return axiosApiCall({
    method: "delete",
    url: `${COUPON_API_URL}/deleteCoupon/${couponId}`,
    // isPrivate: true,
  });
};
