import React, { useState, useEffect } from "react";
import { Plus, Package, Edit, Trash2, Eye, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import ProductForm from "../../components/product/ProductForm";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsAction } from "../../redux/product/productAction";
import useForm from "../../hooks/useForm";
import { initialProductFormData } from "../../config/formCongif";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Use form data directly instead of separate editProduct state
  const { formData, handleOnChange, setFormData } = useForm(
    initialProductFormData
  );

  // redux store
  const { products } = useSelector((state) => state.product);
  console.log("products", products);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  const getStatusBadge = (status) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        Active
      </Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleFormClose = () => {
    setShowCreateForm(false);
    setFormData(initialProductFormData);
  };

  const handleEditProduct = (product) => {
    // Create properly structured product data for editing
    const productData = {
      _id: product?._id,
      title: product?.title,
      slug: product?.slug,
      description: product?.description,
      price: product?.price,
      discountPrice: product?.discountPrice,
      stock: product?.stock,
      brand: product?.brand,
      categoryId: product?.categoryId,
      categoryPath: product?.categoryPath,

      tags: Array.isArray(product?.tags)
        ? product.tags.join(", ")
        : product?.tags || "",
      sizes: Array.isArray(product?.sizes)
        ? product.sizes.join(", ")
        : product?.sizes || "",
      colors: Array.isArray(product?.colors)
        ? product.colors.join(", ")
        : product?.colors || "",
      images: product?.images || [],
      thumbnail: product?.thumbnail,
      ratings: product?.ratings || 0,
      status: product?.status || "active",
      showForm: true,
    };

    setFormData(productData);
    setShowCreateForm(true);
  };

  const handleCreateProduct = () => {
    setFormData(initialProductFormData);
    setShowCreateForm(true);
  };

  // If form is shown, render the form page
  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6 text-blue-600" />
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {formData._id ? "Edit Product" : "Create New Product"}
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

            <div className="p-6">
              <ProductForm
                handleFormClose={handleFormClose}
                formData={formData}
                setFormData={setFormData}
                handleOnChange={handleOnChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main products list view
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600">Manage your product inventory</p>
            </div>
          </div>
          <Button
            onClick={handleCreateProduct}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Product
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products?.length || 0}</div>
              <p className="text-xs text-muted-foreground">
                {products?.length > 0
                  ? `+${products.length} products`
                  : "No products yet"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Products
              </CardTitle>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products?.filter((p) => p.status === "active").length || 0}
              </div>
              <p className="text-xs text-muted-foreground">Active products</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products?.reduce(
                  (sum, product) => sum + (product.stock || 0),
                  0
                ) || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Units in inventory
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <span className="text-sm font-medium">$</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatPrice(
                  products?.reduce(
                    (sum, product) =>
                      sum + (product.price || 0) * (product.stock || 0),
                    0
                  ) || 0
                )}
              </div>
              <p className="text-xs text-muted-foreground">Inventory value</p>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Product List</CardTitle>
          </CardHeader>
          <CardContent>
            {products && products.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={
                              product.thumbnail ||
                              "https://via.placeholder.com/40x40?text=No+Image"
                            }
                            alt={product.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium">{product.title}</div>
                            <div className="text-sm text-gray-500 truncate max-w-[200px]">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {product.categoryPath || "Uncategorized"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatPrice(product.price)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-medium ${
                            (product.stock || 0) < 10
                              ? "text-red-600"
                              : (product.stock || 0) < 50
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {product.stock || 0}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell>{product.brand || "N/A"}</TableCell>
                      <TableCell>{formatDate(product.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Get started by creating your first product.
                </p>
                <Button
                  onClick={handleCreateProduct}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Product
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductsPage;
