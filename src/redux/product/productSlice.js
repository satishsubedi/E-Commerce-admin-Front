import { createSlice } from "@reduxjs/toolkit";

//initial state for product slice
const initialState = {
  products: [],
  product: {},
  isLoading: false,
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
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    // New action for optimistic updates
    updateProductInList: (state, action) => {
      const { productId, updatedProduct } = action.payload;
      const index = state.products.findIndex(
        (product) => product._id === productId
      );
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updatedProduct };
      }
    },
  },
});

const { reducer: productReducer, actions } = productSlice;

//destructure actions for easy access
export const { setProducts, setProduct, setIsLoading, updateProductInList } =
  actions;
export default productReducer;
