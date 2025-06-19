import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import categoryReducer from "./category/categorySlice";

const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer,
    category: categoryReducer,
  },
});
export default store;
