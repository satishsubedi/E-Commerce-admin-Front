import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import categoryReducer from "./category/categorySlice";
import productReducer from "./product/productSlice";

const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
  },
});
export default store;
