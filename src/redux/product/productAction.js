import { toast } from "react-toastify";
import { setIsLoading, setProduct, setProducts } from "./productSlice";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../../axios/productAxios";

//Redux Thunk
//Get all the  Product Action
export const getAllProductsAction = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await getAllProducts();
    //   console.log("response:", response);

    if (response?.status == "error") {
      return toast.error(response.message || "Something went wrong!");
    }
    // If the response is successful, dispatch the setcategories action with the category data
    dispatch(setProducts(response.payload || []));

    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    toast.error("Failed to fetch products. Please try again.");
    dispatch(setProducts([]));
  } finally {
    dispatch(setIsLoading(false));
  }
};

//get a product details by id
export const getProductAction = (productId) => async (dispatch) => {
  const response = await getProduct(productId);
  //   console.log("response:", response);

  if (response?.status == "error") {
    return toast.error(response.message || "Something went wrong!");
  }
  // If the response is successful, dispatch the setcategories action with the category data
  dispatch(setProduct(response.data));

  return response;
};

// Add Product Action
export const addProductAction = (productData) => async (dispatch) => {
  try {
    const response = await addProduct(productData);
    console.log("response", response);

    if (response.success || response.status === "success") {
      toast.success(`${productData.title} Product added successfully!`);
    } else {
      toast.error(response.message || "Failed to add product.");
    }
    //  again fetch getProductAction to get updated products
    dispatch(getAllProductsAction());
  } catch (error) {
    toast.error("An error occurred while adding the product.");
  }
};

//Update category Action
export const updateProductAction =
  (productId, productData) => async (dispatch) => {
    try {
      const response = await updateProduct(productId, productData);
      console.log("productData", productData);

      if (response.success || response.status === "success") {
        toast.success(`${productData.title} Product updated successfully!`);
      } else {
        toast.error(response.message || "Failed to update product.");
      }
      //  again fetch getAllProductsAction to get updated products
      dispatch(getAllProductsAction());
    } catch (error) {
      toast.error("An error occurred while updating the product.");
    }
  };

//Delete products
export const deleteProductAction = (productId) => async (dispatch) => {
  try {
    const response = await deleteProduct(productId);
    if (response.success || response.status === "success") {
      toast.success(response.message || "Product deleted successfully!");
    } else {
      toast.error(response.message || "Failed to delete product.");
    }
    //  again fetch getAllProductsAction to get updated products
    dispatch(getAllProductsAction());
  } catch (error) {
    toast.error("An error occurred while deleting the product.");
  }
};
