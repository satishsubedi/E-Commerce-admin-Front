import {
  getOrderApi,
  orderStatus,
  orderNote,
  sendOrderNoteEmail,
} from "../../axios/orderAxios";
import {
  setOrders,
  setOrderLoading,
  setOrderError,
  updateOrderStatus,
  updateOrderNote,
} from "./orderSlice";
import { toast } from "react-toastify";
//This is for get order action
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

//This is for order status action
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

//This is for the add order note
export const addOrderNoteAction = (orderId, note) => async (dispatch) => {
  try {
    dispatch(setOrderLoading(true));

    const response = await orderNote(orderId, note);
    console.log("Raw response from orderNote:", response);

    // const { data } = await orderNote(orderId, note);
    // console.log("Add note response:", data);
    const data = response.data || response;
    console.log("Add note data:", data);

    dispatch(updateOrderNote({ orderId, note: data.order.orderNotes }));

    toast.success("Note added successfully");
  } catch (error) {
    dispatch(
      setOrderError(error.response?.data?.message || "Failed to add note")
    );
    toast.error(error.response?.data?.message || "Failed to add note");
  } finally {
    dispatch(setOrderLoading(false));
  }
};

//This is for sending the email
export const sendOrderNoteEmailAction = (orderId, note) => async (dispatch) => {
  try {
    const { data } = await sendOrderNoteEmail(orderId, note);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
