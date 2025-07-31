import { getOrderApi, orderStatus } from "../../axios/orderAxios";
import {
  setOrders,
  setOrderLoading,
  setOrderError,
  updateOrderStatus,
} from "./orderSlice";

export const getOrderAction = () => async (dispatch) => {
  try {
    dispatch(setOrderLoading(true));
    const response = await getOrderApi();
    // console.log("Orders API Raw Response:", response);

    if (response?.success) {
      dispatch(setOrders(response.orders));
    } else {
      dispatch(setOrderError(response.message || "Failed to load orders"));
    }
  } catch (error) {
    dispatch(setOrderError(error.message));
  } finally {
    dispatch(setOrderLoading(false));
  }
};

export const updateOrderStatusAction =
  (orderId, updatedData) => async (dispatch) => {
    try {
      dispatch(setOrderLoading(true));
      const response = await orderStatus(orderId, updatedData);

      if (response?.success) {
        dispatch(updateOrderStatus({ orderId, updatedData }));
      } else {
        dispatch(setOrderError(response.message));
      }
    } catch (error) {
      dispatch(setOrderError(error.message));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
