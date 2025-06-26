import { Save, Sparkle, UploadCloud, X, Image } from "lucide-react";
import useLoading from "../../hooks/useLoading";
import { useEffect, useState } from "react";
import { getCategoryAction } from "../../redux/category/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormControl from "../../components/common-Input/FormControl";
import LoadingSpinner from "../../components/helper/LoadingSpinner";
import {
  addProductAction,
  updateProductAction,
} from "../../redux/product/productAction";
import { ProductFormControls } from "../../config/formCongif";
import useForm from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { generateAIDescription } from "../../services/service";
import { Button } from "../../components/ui/button";
import { uploadMedia } from "../../axios/uploadAxios";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const ProductForm = ({ initialFormData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { formData, handleOnChange, setFormData } = useForm(initialFormData);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);

  // redux store
  const { categories } = useSelector((state) => state.category);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  // Sync form state with initialFormData prop
  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData, setFormData]);

  // Handle thumbnail file selection
  const handleThumbnailSelection = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      setThumbnailFile(file);
    }
  };

  // Handle thumbnail upload
  const handleThumbnailUpload = async () => {
    if (!thumbnailFile) {
      toast.error("Please select a thumbnail image first");
      return;
    }

    const formData = new FormData();
    formData.append("images", thumbnailFile);

    try {
      startLoading();
      setThumbnailUploadProgress(0);

      const response = await uploadMedia(formData, (progress) => {
        setThumbnailUploadProgress(progress);
      });

      if (response.status === "success") {
        const uploaded = response.payload;
        let thumbnailUrl = "";

        if (Array.isArray(uploaded)) {
          thumbnailUrl = uploaded[0].secure_url;
        } else if (uploaded && uploaded.secure_url) {
          thumbnailUrl = uploaded.secure_url;
        }

        // Update form data with thumbnail URL
        setFormData((prev) => ({ ...prev, thumbnail: thumbnailUrl }));
        setThumbnailFile(null);
        setThumbnailUploadProgress(0);
        toast.success("Thumbnail uploaded successfully!");
      }
    } catch (error) {
      console.error("Thumbnail upload error:", error);
      toast.error("Failed to upload thumbnail. Please try again.");
    } finally {
      stopLoading();
      setThumbnailUploadProgress(0);
    }
  };

  // Remove thumbnail
  const handleRemoveThumbnail = () => {
    setFormData((prev) => ({ ...prev, thumbnail: "" }));
    setThumbnailFile(null);
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();

    //validation
    if (
      !formData.title ||
      !formData.categoryId ||
      !formData.description ||
      !formData.price ||
      !formData.stock ||
      !formData.status ||
      !formData.thumbnail
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

      // Navigate back to products list on success
      navigate("/admin/products");
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

  // Helper to get category name from id
  const getCategoryName = (categoryId) => {
    const findCategory = (cats) => {
      for (const cat of cats) {
        if (cat._id === categoryId) return cat.name;
        if (cat.children) {
          const found = findCategory(cat.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findCategory(categories) || "not specified";
  };

  // AI Description Handler
  const handleAIDescription = async () => {
    startLoading();
    try {
      const aiDesc = await generateAIDescription({
        title: formData.title,
        category: getCategoryName(formData.categoryId),
        tags: formData.tags,
        brand: formData.brand,
      });
      setFormData((prev) => ({ ...prev, description: aiDesc }));
    } catch (err) {
      toast.error("Failed to generate AI description");
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
        {formData._id ? "Edit Product Details" : "Basic Information"}
      </h2>

      <form
        onSubmit={handleSubmitProduct}
        className="space-y-4"
        autoComplete="on"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ProductFormControls.map((field, index) => {
            return (
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
                {/* AI Description Button for Description Field */}
                {field.name === "description" && (
                  <Button
                    type="button"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    onClick={handleAIDescription}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Sparkle className="h-4 w-4 animate-pulse" />
                        <span>Auto-Generate Description</span>
                      </div>
                    )}
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {/* Custom Thumbnail Upload Section */}
        <div className="col-span-full">
          <Label className="block text-sm font-medium text-gray-700 mb-3">
            Product Thumbnail *
          </Label>

          {/* Thumbnail Preview */}
          {formData.thumbnail && (
            <div className="mb-4">
              <div className="relative inline-block">
                <img
                  src={formData.thumbnail}
                  alt="Product thumbnail"
                  className="h-32 w-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={handleRemoveThumbnail}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Thumbnail Upload */}
          {!formData.thumbnail && (
            <div className="space-y-4">
              <div className="relative">
                <Input
                  id="thumbnail-upload"
                  onChange={handleThumbnailSelection}
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-gray-50">
                  <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 text-center">
                    <span className="font-medium text-primary">
                      Click to upload thumbnail
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </div>

              {/* Selected File Preview */}
              {thumbnailFile && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Selected thumbnail
                  </h4>
                  <div className="flex items-center gap-3 mb-4">
                    <Image className="h-8 w-8 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {thumbnailFile.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setThumbnailFile(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Upload Button */}
                  <Button
                    type="button"
                    onClick={handleThumbnailUpload}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <LoadingSpinner />
                        <span>Uploading... {thumbnailUploadProgress}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <UploadCloud className="h-4 w-4" />
                        <span>Upload Thumbnail</span>
                      </div>
                    )}
                  </Button>

                  {/* Progress Bar */}
                  {isLoading && thumbnailUploadProgress > 0 && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${thumbnailUploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
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
