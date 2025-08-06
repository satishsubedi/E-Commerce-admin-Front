import { useEffect, useState } from "react";
import {
  Plus,
  Package,
  Edit,
  Search,
  Image,
  PackageCheck,
  Calendar,
  PackageXIcon,
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
import FilterSelect from "../../components/helper/FilterSelect";

import { useSelector, useDispatch } from "react-redux";
import {
  deleteProductAction,
  getAllProductsAction,
} from "../../redux/product/productAction";
import { useNavigate } from "react-router-dom";
import PageLoadingSpinner from "../../components/helper/PageLoadingSpinner";
import StatsCard from "../../components/helper/StatsCard";
import StatusBadge from "../../components/helper/StatusBadge";
import ConfirmDelete from "../../components/helper/ConfirmDelete";
import formatDate from "../../utils/FormatDate";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redux store
  const { products, isLoading } = useSelector((state) => state.product);
  // console.log("products", products);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");

  // Fetch products on component mount
  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  //show stock color
  const getStockColor = (stock = 0) => {
    if (stock < 5) return "text-red-600";
    if (stock < 10) return "text-yellow-600";
    return "text-green-600";
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
      <div className="flex items-center justify-center h-screen">
        <PageLoadingSpinner pageName={"products"} />
      </div>
    );
  }

  // Main products list view
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className=" max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <header className="flex items-center justify-between">
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
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            label="Total Products"
            value={products?.length}
            icon={Package}
            color="text-gray-900"
            bgColor="bg-gray-100"
          />
          <StatsCard
            label=" Active Products"
            value={products?.filter((p) => p.status === "active").length || 0}
            icon={PackageCheck}
            color="text-green-600"
            bgColor="bg-green-100"
          />
          <StatsCard
            label="Inactive Products"
            value={products?.filter((p) => p.status === "inactive").length || 0}
            icon={Package}
            color="text-purple-600"
            bgColor="bg-purple-100"
          />

          <StatsCard
            label="Out of Stock"
            value={
              products?.filter((p) => p.status === "out-of-stock").length || 0
            }
            icon={PackageXIcon}
            color="text-red-600"
            bgColor="bg-red-100"
          />
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Product List({filteredProducts.length})</CardTitle>
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

              {/* Filter status */}
              <FilterSelect
                value={statusFilter}
                onValueChange={setStatusFilter}
                placeholder="Filter by status"
                options={[
                  { value: "all", label: "All Status" },
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                  { value: "out-of-stock", label: "Out of Stock" },
                ]}
              />
              {/* Filter brand */}
              <FilterSelect
                value={brandFilter}
                onValueChange={setBrandFilter}
                placeholder="Filter by brand"
                options={[
                  { value: "all", label: "All Brands" },
                  ...uniqueBrands.map((brand) => ({
                    value: brand,
                    label: brand.charAt(0).toUpperCase() + brand.slice(1),
                  })),
                ]}
              />
            </div>

            {/* Products Table */}
            <div className="rounded-md overflow-hidden border">
              <div className="max-h-[420px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="px-6 py-4 text-left text-xs font-medium tracking-wider">
                      <TableHead>SN</TableHead>
                      <TableHead>PRODUCT</TableHead>
                      <TableHead>CATEGORY</TableHead>
                      <TableHead>PRICE</TableHead>
                      <TableHead>STOCK</TableHead>
                      <TableHead>STATUS</TableHead>
                      <TableHead>BRAND</TableHead>
                      <TableHead>CREATED</TableHead>
                      <TableHead className="text-right">ACTIONS</TableHead>
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
                                product.thumbnail || "https://placehold.co/150"
                              }
                              alt={product.title}
                              className="w-15 h-15 rounded-lg object-cover"
                            />
                            <div>
                              <div className="font-medium">{product.title}</div>
                              <div className="text-sm text-gray-500 truncate max-w-[200px]">
                                {product.description}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right ">
                          <Badge variant="outline">
                            {product.productPath || "Uncategorized"}
                          </Badge>
                        </TableCell>
                        <TableCell>
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
                            className={`font-medium ${getStockColor(
                              product.stock
                            )}`}
                          >
                            {product.stock || 0}
                          </span>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={product.status} />
                        </TableCell>

                        <TableCell>{product.brand || "N/A"}</TableCell>
                        <TableCell className="text-nowrap">
                          <div className="text-sm text-gray-900 flex items-center gap-1 ">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            {formatDate(product.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            {/* images  button */}
                            <Button
                              onClick={() =>
                                navigate(`/admin/product-images/${product._id}`)
                              }
                              variant="ghost"
                              title="images"
                              className="text-blue-600  hover:text-blue-900"
                            >
                              <Image className="h-4 w-4" />
                            </Button>
                            {/* edit button */}
                            <Button
                              variant="ghost"
                              title="Edit Product"
                              onClick={() =>
                                navigate(`/admin/edit-product/${product._id}`)
                              }
                              className="text-green-600  hover:text-green-900"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            {/* delete button */}
                            <ConfirmDelete
                              onDelete={() =>
                                dispatch(deleteProductAction(product?._id))
                              }
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* show no products found while searching */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No products found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductsPage;
