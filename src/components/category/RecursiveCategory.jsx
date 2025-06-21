import {
  ChevronDown,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Layers,
  Package,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CategoryForm from "./CategoryForm";

const RecursiveCategory = (props) => {
  // Destructuring props
  const {
    category,
    level = 1,
    expandedCategories,
    formData,
    toggleCategory,
    setFormData,
    handleAddCategory,
    onDeleteCategory,
    handleOnChange,
  } = props;

  const isExpanded = expandedCategories[category._id] || false;
  const hasChildren = category.children?.length > 0;

  return (
    <div className="space-y-2">
      {/* Category card */}
      <div
        className={`flex items-center justify-between p-4 rounded-lg border-2 mb-3 ${
          level === 1
            ? "bg-blue-50 border-blue-200 text-blue-900"
            : level === 2
            ? "bg-green-50 border-green-200 text-green-900"
            : "bg-purple-50 border-purple-200 text-purple-900"
        }`}
      >
        {/* Left side - name and expand button */}
        <div className="flex items-center space-x-3 flex-1">
          {hasChildren ? (
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-6 w-6"
              onClick={() => toggleCategory(category._id)}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          ) : (
            <div className="w-6" />
          )}

          <div className="flex items-center space-x-3 flex-1">
            {level === 1 ? (
              <Layers className="h-4 w-4" />
            ) : level === 2 ? (
              <Package className="h-4 w-4" />
            ) : (
              <Tag className="h-4 w-4" />
            )}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold text-lg">{category.name}</span>
                <Badge variant="secondary" className="text-xs">
                  Level {level}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - action buttons */}
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            onClick={() =>
              setFormData({
                name: "",
                parentId: category._id,
                showForm: true,
              })
            }
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Sub
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            onClick={() =>
              setFormData({
                id: category._id,
                name: category.name,
                parentId: category.parent || null,
                showForm: true,
              })
            }
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-red-600 hover:text-red-700"
            onClick={() => onDeleteCategory(category._id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      {/* Add/Edit Subcategory Form */}
      {formData.parentId === category._id && formData.showForm && (
        <CategoryForm
          formData={formData}
          setFormData={setFormData}
          handleOnChange={handleOnChange}
          handleAddCategory={handleAddCategory}
        />
      )}
      {/* Render children if expanded */}
      {isExpanded && hasChildren && (
        <div className="ml-6">
          {category.children.map((child) => (
            <RecursiveCategory
              key={child._id}
              category={child}
              level={level + 1}
              expandedCategories={expandedCategories}
              formData={formData}
              setFormData={setFormData}
              handleOnChange={handleOnChange}
              toggleCategory={toggleCategory}
              handleAddCategory={handleAddCategory}
              onDeleteCategory={onDeleteCategory}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecursiveCategory;
