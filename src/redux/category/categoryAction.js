import { toast } from "react-toastify";
import { setCategories, setLoading } from "./categorySlice";
import {
  addCategory,
  deleteCategory,
  getCategoryTree,
  updateCategory,
} from "../../axios/categoryAxios";

//Redux Thunk
//Get Category Action
export const getCategoryAction = () => async (dispatch) => {
  dispatch(setLoading(true));
  const response = await getCategoryTree();

  if (response?.status == "error") {
    dispatch(setLoading(false));
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

// Delete Category Action
export const deleteCategoryAction = (categoryId) => async (dispatch) => {
  try {
    const response = await deleteCategory(categoryId);

    if (response.success || response.status === "success") {
      toast.success(response.message || "Category deleted successfully!");

      //  again fetch getCategoryAction to get updated categories
      dispatch(getCategoryAction());
    } else {
      toast.error(response.message || "Failed to delete category.");
    }
  } catch (error) {
    console.error("Delete category error:", error);
    const message =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while deleting the category.";
    toast.error(message);
  }
};
