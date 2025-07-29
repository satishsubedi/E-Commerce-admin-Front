import { toast } from "react-toastify";
import { setCategories } from "./categorySlice";
import {
  addCategory,
  getCategoryTree,
  updateCategory,
} from "../../axios/categoryAxios";

//Redux Thunk
//Get Category Action
export const getCategoryAction = () => async (dispatch) => {
  const response = await getCategoryTree();

  if (response?.status == "error") {
    return toast.error(response.message || "Something went wrong!");
  }
  // If the response is successful, dispatch the setcategories action with the category data
  dispatch(setCategories(response.payload));

  return response;
};

// Add Category Action
export const addCategoryAction = (categoryData) => async (dispatch) => {
  try {
    const response = await addCategory(categoryData);

    if (response.success || response.status === "success") {
      toast.success(response.message || ` Category added successfully!`);

      //  again fetch getCategoryAction to get updated categories
      dispatch(getCategoryAction());
    } else {
      toast.error(response.message || "Failed to add category.");
    }
  } catch (error) {
    toast.error("An error occurred while adding the category.");
  }
};

// Update Category Action
export const updateCategoryAction =
  (categoryId, categoryData) => async (dispatch) => {
    try {
      const response = await updateCategory(categoryId, categoryData);
      console.log("categoryData", categoryData);

      if (response.success || response.status === "success") {
        toast.success(`${categoryData.name} Category updated successfully!`);

        //  again fetch getCategoryAction to get updated categories
        dispatch(getCategoryAction());
      } else {
        toast.error(response.message || "Failed to update category.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the category.");
    }
  };
