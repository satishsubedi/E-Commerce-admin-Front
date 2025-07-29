import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import categoryReducer from "./category/categorySlice";
import productReducer from "./product/productSlice";
import orderReducer from "./order/orderSlice";

const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    orders: orderReducer,
  },
});
export default store;
