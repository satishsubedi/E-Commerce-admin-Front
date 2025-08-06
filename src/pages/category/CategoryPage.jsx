import { useState, useEffect } from "react";
import { Plus, Layers, ChartColumnStacked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import RecursiveCategory from "../../components/category/RecursiveCategory";
import CategoryForm from "../../components/category/CategoryForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryAction,
  addCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
} from "../../redux/category/categoryAction";
import useForm from "../../hooks/useForm";
import { initialCategoryState } from "../../config/formCongif";
import PageLoadingSpinner from "../../components/helper/PageLoadingSpinner";

const CategoryPage = () => {
  const dispatch = useDispatch();

  // Local state
  const [expandedCategories, setExpandedCategories] = useState({});
  const { formData, handleOnChange, setFormData } =
    useForm(initialCategoryState);
  // redux store
  const { categories, loading } = useSelector((state) => state.category);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  // Toggle expand/collapse for a category
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Handle adding/editing a category using Redux actions
  const handleAddCategory = async () => {
    if (!formData.name) return toast("Category name is required");

    try {
      const categoryData = {
        name: formData?.name,
        slug: formData?.name.toLowerCase().replace(/ /g, "-"),
        description: formData?.description || "",
        brand: formData?.brand || "",
        tags: formData?.tags || "",
        parent: formData?.parentId || null,
      };

      // Dispatch addCategoryAction or updateCategoryAction
      formData?._id
        ? dispatch(updateCategoryAction(formData._id, categoryData))
        : dispatch(addCategoryAction(categoryData));

      // Reset form after dispatching action
      setFormData(initialCategoryState);
    } catch (err) {
      console.error("Failed to save category", err);
      toast.error("Failed to save category");
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (categoryId) => {
    dispatch(deleteCategoryAction(categoryId));
  };

  // Show loading spinner
  {
    loading && (
      <div className="flex items-center justify-center h-screen">
        <PageLoadingSpinner pageName={"categories"} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <ChartColumnStacked className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Category Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your e-commerce product categories
            </p>
          </div>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 mr-7"
          onClick={() =>
            setFormData({ name: "", parentId: null, showForm: true })
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Root Category
        </Button>
      </header>

      {/* Add/Edit Category Form */}
      {formData.showForm && formData.parentId === null && (
        <Card>
          <CardContent className="p-6">
            <CategoryForm
              formData={formData}
              setFormData={setFormData}
              handleOnChange={handleOnChange}
              handleAddCategory={handleAddCategory}
            />
          </CardContent>
        </Card>
      )}

      {/* Category Hierarchy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layers className="h-5 w-5" />
            <span>Category Hierarchy({categories.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-2">
          {categories?.map((category) => (
            <RecursiveCategory
              key={category._id}
              category={category}
              level={1}
              expandedCategories={expandedCategories}
              formData={formData}
              setFormData={setFormData}
              handleOnChange={handleOnChange}
              toggleCategory={toggleCategory}
              handleAddCategory={handleAddCategory}
              handleDeleteCategory={handleDeleteCategory}
            />
          ))}
          {categories.length === 0 && (
            <div className="text-center py-12">
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No categories found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Start by adding a new category
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryPage;
