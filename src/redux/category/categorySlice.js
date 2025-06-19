import { createSlice } from "@reduxjs/toolkit";

// initial statr for the category slice
const initialState = {
  categories: [],
  categoryForm: {
    mode: "add", // 'add' | 'edit'
    show: false,
    data: {
      id: null, // Required for edits
      name: "",
      parentId: null,
    },
  },
};

//create a slice for user-related state management

const categorySlice = createSlice({
  name: "category",
  initialState,

  //state Update reducers functions
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    // Open form in ADD mode
    showAddForm: (state, action) => {
      state.categoryForm = {
        mode: "add",
        show: true,
        data: {
          id: null,
          name: "",
          parentId: action.payload || null,
        },
      };
    },
    // Open form in EDIT mode
    showEditForm: (state, action) => {
      const category = state.categories.find((c) => c._id === action.payload);
      state.categoryForm = {
        mode: "edit",
        show: true,
        data: {
          id: category._id,
          name: category.name,
          parentId: category.parentId,
        },
      };
    },
    // Update form fields
    updateFormData: (state, action) => {
      state.categoryForm.data = {
        ...state.categoryForm.data,
        ...action.payload,
      };
    },
    // Close form
    closeForm: (state) => {
      state.categoryForm.show = false;
    },
  },
});

const { reducer: categoryReducer, actions } = categorySlice;

//destructure actions for easy access
export const {
  setCategories,
  showAddForm,
  showEditForm,
  updateFormData,
  closeForm,
} = actions;
export default categoryReducer;
