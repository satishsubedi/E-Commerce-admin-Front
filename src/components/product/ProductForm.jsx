import React from "react";
import { Save } from "lucide-react";
import useLoading from "../../hooks/useLoading";
import { useEffect } from "react";
import { getCategoryAction } from "../../redux/category/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormControl from "../../components/common-Input/FormControl";
import LoadingSpinner from "../../components/helper/LoadingSpinner";
import {
  addProductAction,
  updateProductAction,
} from "../../redux/product/productAction";
import {
  initialProductFormData,
  ProductFormControls,
} from "../../config/formCongif";

const ProductForm = ({
  handleFormClose,
  formData,
  setFormData,
  handleOnChange,
}) => {
  const dispatch = useDispatch();
  const { isLoading, startLoading, stopLoading } = useLoading();

  // redux store
  const { categories } = useSelector((state) => state.category);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  const handleSubmitProduct = (e) => {
    e.preventDefault();

    //validation
    if (
      !formData.title ||
      !formData.categoryId ||
      !formData.description ||
      !formData.price ||
      !formData.stock ||
      !formData.status
    ) {
      toast(" All  fields required ");
      return;
    }

    if (
      formData.price < 0 ||
      formData.stock < 0 ||
      formData.discountPrice < 0
    ) {
      toast("Price, stock, and discount price cannot be negative");
      return;
    }

    try {
      startLoading();

      const productData = {
        ...formData,
        tags: (formData?.tags || "")
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
        sizes: (formData?.sizes || "")
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        colors: (formData?.colors || "")
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c),
      };

      // Check if we're editing or creating based on formData._id
      if (formData._id) {
        // Update existing product
        dispatch(updateProductAction(formData._id, productData));
      } else {
        // Create new product
        dispatch(addProductAction(productData));
      }

      // Reset form and close
      if (handleFormClose) {
        handleFormClose();
      }
    } catch (err) {
      console.error("Failed to save product", err);
      toast.error("Failed to save product");
    } finally {
      stopLoading();
    }
  };

  // Recursive function to show nested categories with indent
  const renderCategoryOptions = (categories, depth = 0) => {
    let options = [];
    categories.forEach((cat) => {
      options.push({
        value: cat._id,
        label: `${Array(depth).fill("\u00A0\u00A0\u00A0").join("")}${cat.name}`,
      });
      if (cat.children?.length > 0) {
        options = options.concat(
          renderCategoryOptions(cat.children, depth + 1)
        );
      }
    });
    return options;
  };

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
        {formData._id ? "Edit Product" : "Basic Information"}
      </h2>

      <form
        onSubmit={handleSubmitProduct}
        className="space-y-4"
        autoComplete="on"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ProductFormControls.map((field, index) => (
            <div
              key={index}
              className={field.type === "textarea" ? "col-span-full" : ""}
            >
              <FormControl
                label={field.label}
                handleOnChange={handleOnChange}
                inputAttributes={{
                  type: field.type,
                  name: field.name,
                  value: formData[field.name],
                  placeholder: field.placeholder,
                  autoComplete: field.autoComplete,
                  id: field.name,
                }}
                options={
                  field.name === "categoryId"
                    ? renderCategoryOptions(categories)
                    : field.options
                }
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium"
          >
            <Save className="w-4 h-4" />
            {isLoading ? (
              <LoadingSpinner />
            ) : formData._id ? (
              "Update Product"
            ) : (
              "Create Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
