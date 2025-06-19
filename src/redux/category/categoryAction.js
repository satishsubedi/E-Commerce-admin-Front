import { toast } from "react-toastify";
import { setCategories } from "./categorySlice";
import { getCategoryTree } from "../../axios/categoryAxios";

//Redux Thunk
//Get Category Action
export const getCategoryAction = () => async (dispatch) => {
  const response = await getCategoryTree();
  //   console.log("Category Tree:", response);

  if (response?.status == "error") {
    return toast.error(response.message || "Something went wrong!");
  }
  // If the response is successful, dispatch the setcategories action with the category data
  dispatch(setCategories(response.data));

  return response;
};
