import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../../redux/product/productAction";
import { useParams } from "react-router-dom";
import { uploadMedia } from "../../axios/uploadAxios";
import useLoading from "../../hooks/useLoading";
import { updateProductAction } from "../../redux/product/productAction";
import LoadingSpinner from "../../components/helper/LoadingSpinner";
import { toast } from "react-toastify";
import ImageUploader from "../../components/common-Input/ImageUploader";

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
          <ImageUploader
            multiple={true}
            selectedFiles={selectedFiles}
            onFileChange={handleFileSelection}
            onRemoveSelected={removeSelectedFile}
            onUpload={handleImageUpload}
            isLoading={isLoading}
            uploadProgress={uploadProgress}
            uploadedImages={product?.images || []}
            onRemoveUploaded={handleRemoveImage}
            label="Upload Product Images"
            maxSizeMB={5}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImagesPage;
