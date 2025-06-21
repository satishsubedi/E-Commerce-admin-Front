import { FileText, Package, Save } from "lucide-react";
import useForm from "../../hooks/useForm";
import useLoading from "../../hooks/useLoading";
import {
  initialProductFormData,
  ProductFormControls,
} from "../../config/formCongif";
import { useEffect } from "react";
import { getCategoryAction } from "../../redux/category/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../axios/productAxios";
import { toast } from "react-toastify";
import FormControl from "../../components/common-Input/FormControl";
import LoadingSpinner from "../../components/helper/LoadingSpinner";

const ProductsPage = () => {
  const dispatch = useDispatch();

  const { formData, handleOnChange, setFormData } = useForm(
    initialProductFormData
  );
  const { isLoading, startLoading, stopLoading } = useLoading();
  // redux store
  const { categories } = useSelector((state) => state.category);
  // console.log("categories", categories);

  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  const handleAddProduct = async (e) => {
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
      const response = await addProduct({
        ...formData,
        tags: formData.split(",").map((t) => t.trim()),
        sizes: formData.split(",").map((s) => s.trim()),
        colors: formData.split(",").map((c) => c.trim()),
      });
      // console.log("Add Product Response:", response);

      if (response) {
        toast.success(response.message || "Product added successfully!");
      }
      setFormData(initialProductFormData);
    } catch (err) {
      console.error("Failed to add product", err);
      toast.error(err.response?.data?.message || "Failed to add product");
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

  // const getCategoryPath = (categoryId) => {
  //   // Flatten the tree for lookup
  //   const flatten = (cats) =>
  //     cats.reduce(
  //       (acc, cat) => [
  //         ...acc,
  //         cat,
  //         ...(cat.children ? flatten(cat.children) : []),
  //       ],
  //       []
  //     );
  //   const allCategories = flatten(categories);

  //   let path = [];
  //   let current = allCategories.find((cat) => cat._id === categoryId);
  //   while (current) {
  //     path.unshift(current.name);
  //     current = allCategories.find((cat) => cat._id === current.parent);
  //   }
  //   return path.join(" → ");
  // };

  return (
    <div className="min-h-screen bg-gray-50 p-6  ">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b ">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-semibold text-gray-900">
                Create New Product
              </h1>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* <div className="space-y-6"> */}
            <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Basic Information
            </h2>

            <form
              onSubmit={handleAddProduct}
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

                    {/* Category Path Display */}
                    {/* {field.name === "categoryId" && formData.categoryId && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-2">
                        <p className="text-sm text-blue-800">
                          <span className="font-medium">Category Path:</span>{" "}
                          {getCategoryPath(formData.categoryId)}
                        </p>
                      </div>
                    )} */}
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
                  {isLoading ? <LoadingSpinner /> : "Create Product"}
                </button>
              </div>
            </form>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
