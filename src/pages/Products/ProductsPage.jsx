import { useEffect, useState } from "react";
import {
  Plus,
  Package,
  Edit,
  Trash2,
  Eye,
  Search,
  Image,
  Palette,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProductAction,
  getAllProductsAction,
} from "../../redux/product/productAction";
import { useNavigate } from "react-router-dom";
import PageLoadingSpinner from "../../components/helper/PageLoadingSpinner";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redux store
  const { products, isLoading } = useSelector((state) => state.product);
  console.log("products", products);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");

  // Fetch products on component mount
  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "inactive":
        return <Badge className="bg-red-100 text-gray-800">Inactive</Badge>;
      default:
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
    }
  };

  //format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Calculate discount percentage
  const calculateDiscountPercentage = (price, discountPrice) => {
    return Math.round(((price - discountPrice) / price) * 100);
  };

  // Filter Products based on search input
  const filteredProducts = (products || []).filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesBrand = brandFilter === "all" || product.brand === brandFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;

    return matchesSearch && matchesBrand && matchesStatus;
  });

  // Extract unique brands from products
  const uniqueBrands = [
    ...new Set(products?.map((product) => product.brand).filter(Boolean)),
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PageLoadingSpinner />
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
            onClick={() => navigate("/admin/create-product")}
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
                {products?.filter((product) => product.status === "active")
                  .length || 0}
              </div>
              <p className="text-xs text-muted-foreground">Active products</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Out of Stock
              </CardTitle>
              <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products?.filter(
                  (product) => product.status === "out-of-stock"
                ).length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Out of stock products
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Inactive Products
              </CardTitle>
              <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products?.filter((p) => p.status === "inactive").length || 0}
              </div>
              <p className="text-xs text-muted-foreground">Inactive products</p>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Product List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products by title or slug..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              <Select value={brandFilter} onValueChange={setBrandFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {uniqueBrands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand.charAt(0).toUpperCase() + brand.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Products Table */}
            <div className="rounded-md overflow-hidden border">
              {products && products.length > 0 ? (
                filteredProducts.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SN</TableHead>
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
                      {filteredProducts.map((product, index) => (
                        <TableRow key={product._id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <img
                                src={
                                  product.thumbnail ||
                                  "https://via.placeholder.com/40x40?text=No+Image"
                                }
                                alt={product.title}
                                className="w-15 h-15 rounded-lg object-cover"
                              />
                              <div>
                                <div className="font-medium">
                                  {product.title}
                                </div>
                                <div className="text-sm text-gray-500 truncate max-w-[200px]">
                                  {product.description}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {product.categoryPath ||
                                product.productPath ||
                                "Uncategorized"}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  ${product.discountPrice}
                                </span>
                                {product.price !== product.discountPrice && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    ${product.price}
                                  </span>
                                )}
                              </div>
                              {product.price !== product.discountPrice && (
                                <div className="text-sm text-green-600">
                                  {calculateDiscountPercentage(
                                    product.price,
                                    product.discountPrice
                                  )}
                                  % off
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`font-medium ${
                                (product.stock || 0) < 5
                                  ? "text-red-600"
                                  : (product.stock || 0) < 10
                                  ? "text-yellow-600"
                                  : "text-green-600"
                              }`}
                            >
                              {product.stock || 0}
                            </span>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(product.status)}
                          </TableCell>

                          <TableCell>{product.brand || "N/A"}</TableCell>
                          <TableCell>{formatDate(product.createdAt)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-2">
                              {/* images  button */}
                              <Button
                                onClick={() =>
                                  navigate(
                                    `/admin/product-images/${product._id}`
                                  )
                                }
                                variant="ghost"
                                size="sm"
                              >
                                <Image className="h-4 w-4" />
                              </Button>
                              {/* edit button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  navigate(`/admin/edit-product/${product._id}`)
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              {/* delete button */}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you Sure Want to delete this product?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        dispatch(
                                          deleteProductAction(product?._id)
                                        )
                                      }
                                    >
                                      Continue
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex justify-center items-center h-32 text-lg font-semibold text-gray-600 dark:text-gray-300">
                    No products found matching your search
                  </div>
                )
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
                    onClick={() => navigate("/admin/create-product")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Product
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductsPage;
