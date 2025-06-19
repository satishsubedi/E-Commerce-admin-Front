import { useState, useEffect } from "react";
import { Plus, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import RecursiveCategory from "../../components/category/RecursiveCategory";
import { addCategory } from "../../axios/categoryAxios";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryAction } from "../../redux/category/categoryAction";
import { closeForm, showEditForm } from "../../redux/category/categorySlice";

const CategoryPage = () => {
  const dispatch = useDispatch();

  // Local state
  const [expandedCategories, setExpandedCategories] = useState({});
  const [newCategory, setNewCategory] = useState({
    name: "",
    parentId: null,
    showForm: false,
  });

  // redux store
  const { categories } = useSelector((state) => state.category);
  // console.log("categories", categories);

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

  // Handle adding a new category
  const handleAddCategory = async () => {
    if (!newCategory.name) return toast("Category name is required");

    try {
      // api call
      const response = await addCategory({
        name: newCategory.name,
        slug: newCategory.name.toLowerCase().replace(/ /g, "-"),
        parent: newCategory.parentId || null,
      });

      if (response.success || response.status === "success") {
        toast.success(`"${newCategory.name}" category added successfully!`, {});
      }
      dispatch(getCategoryAction()); // Refresh categories from Redux

      setNewCategory({ name: "", parentId: null, showForm: false }); // Reset form
    } catch (err) {
      console.error("Failed to add category", err);
      toast.error("Failed to add category");
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
            setNewCategory({
              name: "",
              parentId: null,
              showForm: true,
            })
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Root Category
        </Button>
      </div>

      {/* Add Root Category Form */}
      {newCategory.parentId === null && newCategory.showForm && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="New root category name"
                className="border rounded-md px-3 py-2 flex-1"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <Button
                onClick={handleAddCategory}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setNewCategory({
                    name: "",
                    parentId: null,
                    showForm: false,
                  })
                }
              >
                Cancel
              </Button>
            </div>
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
              newCategory={newCategory}
              toggleCategory={toggleCategory}
              setNewCategory={setNewCategory}
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
