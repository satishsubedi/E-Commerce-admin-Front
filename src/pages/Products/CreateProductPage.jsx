import ProductForm from "../../components/product/ProductForm";
import { initialProductFormData } from "../../config/formCongif";
import { Button } from "../../components/ui/button";
import { Package, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateProductPage = () => {
  const navigate = useNavigate();

  const handleFormClose = () => {
    navigate("/admin/products");
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
                  Create New Product
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
          <ProductForm initialFormData={initialProductFormData} />
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
