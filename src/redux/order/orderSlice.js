import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrderLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOrderError: (state, action) => {
      state.error = action.payload;
    },
    resetOrders: (state) => {
      state.orders = [];
      state.loading = false;
      state.error = null;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, updatedData } = action.payload;
      state.orders = state.orders.map((order) =>
        order._id === orderId
          ? {
              ...order,
              ...(updatedData.orderStatus && {
                orderStatus: updatedData.orderStatus,
              }),
              payment: updatedData.paymentStatus
                ? { ...order.payment, status: updatedData.paymentStatus }
                : order.payment,
            }
          : order
      );
    },
  },
});

export const {
  setOrders,
  setOrderLoading,
  setOrderError,
  resetOrders,
  updateOrderStatus,
} = orderSlice.actions;

export default orderSlice.reducer;
