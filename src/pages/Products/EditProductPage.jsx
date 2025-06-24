import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../../components/product/ProductForm";
import { Package, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { getAllProductsAction } from "../../redux/product/productAction";
import LoadingSpinner from "../../components/helper/LoadingSpinner";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // redux store
  const { products, isLoading } = useSelector((state) => state.product);
  const product = products?.find((product) => product._id === id);

  const handleFormClose = () => {
    navigate("/admin/products");
  };

  if (isLoading || (products.length === 0 && !product)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Button onClick={() => navigate("/admin/products")} className="mt-4">
          Back to Products
        </Button>
      </div>
    );
  }

  const productData = {
    ...product,
    tags: Array.isArray(product?.tags)
      ? product.tags.join(", ")
      : product?.tags || "",
    sizes: Array.isArray(product?.sizes)
      ? product.sizes.join(", ")
      : product?.sizes || "",
    colors: Array.isArray(product?.colors)
      ? product.colors.join(", ")
      : product?.colors || "",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-blue-600" />
                <h1 className="text-2xl font-semibold text-gray-900">
                  Edit Product
                </h1>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFormClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <ProductForm initialFormData={productData} />
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
