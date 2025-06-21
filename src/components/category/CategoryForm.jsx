import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { initialCategoryState } from "../../config/formCongif";

const CategoryForm = (props) => {
  // Destructure props
  const { formData, setFormData, handleAddCategory, handleOnChange } = props;

  return (
    <div className="ml-6 mb-4 p-4 bg-gray-50 rounded-lg border">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleOnChange}
          placeholder={formData.id ? "Edit category name" : "New category name"}
          className="border rounded-md px-3 py-1 flex-1"
        />
        <Button
          size="sm"
          onClick={handleAddCategory}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {formData.id ? "Update" : "Add"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFormData(initialCategoryState)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CategoryForm;
