import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Image, Loader2, Upload, UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../../redux/product/productAction";
import { useParams } from "react-router-dom";
import { uploadMedia } from "../../axios/uploadAxios";
import useLoading from "../../hooks/useLoading";
import { updateProductAction } from "../../redux/product/productAction";
import LoadingSpinner from "../../components/helper/LoadingSpinner";
import { toast } from "react-toastify";

const ProductImagesPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { product } = useSelector((state) => state.product);
  const { isLoading, startLoading, stopLoading } = useLoading();

  // Fetch products on component mount
  useEffect(() => {
    if (id) {
      dispatch(getProductAction(id));
    }
  }, [dispatch, id]);

  // Handle file selection
  const handleFileSelection = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  // Remove selected file
  const removeSelectedFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (selectedFiles.length === 0) {
      return;
    }
    const imageFormData = new FormData();

    // Append all selected files
    selectedFiles.forEach((file) => {
      imageFormData.append("images", file);
    });

    try {
      startLoading();
      setUploadProgress(0);

      const response = await uploadMedia(imageFormData, (progress) => {
        setUploadProgress(progress);
      });

      if (response.status === "success") {
        const uploaded = response.payload;
        let newImageUrls = [];

        // Check if uploaded is an array
        if (Array.isArray(uploaded)) {
          newImageUrls = uploaded.map((img) => img.secure_url);
        } else if (uploaded && uploaded.secure_url) {
          newImageUrls = [uploaded.secure_url];
        }

        // Combine with existing images
        const updatedImages = [...(product.images || []), ...newImageUrls];

        // Update product with new images
        dispatch(
          updateProductAction(product._id, { images: updatedImages }, true)
        );

        // Show toast success message for image upload
        toast.success(`Images uploaded successfully!`);

        // Clear selected files after successful upload
        setSelectedFiles([]);
        setUploadProgress(0);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images. Please try again.");
    } finally {
      stopLoading();
      setUploadProgress(0);
    }
  };

  // Handle image remove
  const handleRemoveImage = (imageUrl, index) => {
    try {
      // Remove the image URL from the product
      const updatedImages = product.images.filter((_, i) => i !== index);
      dispatch(
        updateProductAction(product._id, { images: updatedImages }, true)
      );
      toast.success("Image removed successfully!");
    } catch (error) {
      console.error("Error removing image:", error);
      toast.error("Failed to remove image. Please try again.");
    }
  };

  return (
    <div className="mt-6 container mx-auto px-4">
      <div className="flex flex-col gap-6">
        {/* File Input Section */}
        <div className="w-full">
          <Label className="block text-sm font-medium text-gray-700 mb-3">
            Upload Product Images
          </Label>
          <div className="relative">
            <Input
              id="image-upload"
              onChange={handleFileSelection}
              type="file"
              name="images"
              multiple
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-gray-50">
              <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 text-center">
                <span className="font-medium text-primary">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          </div>
        </div>

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Selected file{selectedFiles.length > 1 ? "s" : ""} (
              {selectedFiles.length})
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="text-xs bg-white rounded-full px-3 py-2 flex items-center gap-2 border shadow-sm"
                >
                  <Image className="h-3 w-3 text-gray-500" />
                  <span className="max-w-32 truncate">{file.name}</span>
                  <button
                    onClick={() => removeSelectedFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Upload Button */}
            <Button
              onClick={handleImageUpload}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {/* <LoadingSpinner /> */}
                  <span>Uploading... {uploadProgress}%</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span>
                    Upload {selectedFiles.length} Image
                    {selectedFiles.length > 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </Button>

            {/* Progress Bar */}
            {isLoading && uploadProgress > 0 && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Existing Images Grid */}
        {product?.images && product.images.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Product Images ({product.images.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={image}
                  className="relative group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200"
                >
                  <img
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                    <Button
                      variant="ghost"
                      className="text-white bg-black/70 hover:bg-black/90 px-3 py-1 rounded-full text-xs transition-colors"
                      onClick={() => window.open(image, "_blank")}
                    >
                      View
                    </Button>
                    <Button
                      variant="destructive"
                      className="text-white hover:bg-red-700 px-3 py-1 rounded-full text-xs transition-colors"
                      onClick={() => handleRemoveImage(image, index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {(!product?.images || product.images.length === 0) && (
          <div className="text-center py-12">
            <UploadCloud className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No images uploaded yet
            </h3>
            <p className="text-gray-500">Upload some images to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImagesPage;
