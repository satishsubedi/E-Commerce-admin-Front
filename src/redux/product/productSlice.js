import { createSlice } from "@reduxjs/toolkit";

//initial state for product slice
const initialState = {
  products: [],
  product: {},
};

//create a slice for product-related state management
const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

const { reducer: productReducer, actions } = productSlice;

//destructure actions for easy access
export const { setProducts, setProduct } = actions;
export default productReducer;
