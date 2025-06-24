import { useState, useEffect } from "react";
import { Plus, Layers } from "lucide-react";
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
} from "../../redux/category/categoryAction";
import useForm from "../../hooks/useForm";
import { initialCategoryState } from "../../config/formCongif";

const CategoryPage = () => {
  const dispatch = useDispatch();

  // Local state
  const [expandedCategories, setExpandedCategories] = useState({});
  const { formData, handleOnChange, setFormData } =
    useForm(initialCategoryState);
  // redux store
  const { categories } = useSelector((state) => state.category);
  // console.log("categories", categories);

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
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(`${API}/product/category/${categoryId}`);
      dispatch(getCategoryAction()); // Refresh categories from Redux
    } catch (err) {
      console.error("Failed to delete category", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Category Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your e-commerce product categories
          </p>
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
      </div>

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
            <span>Category Hierarchy</span>
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
              onDeleteCategory={handleDeleteCategory}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryPage;
