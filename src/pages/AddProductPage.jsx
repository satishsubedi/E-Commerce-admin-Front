import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8000/api/v1/product";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    categoryName: "",
    subcategoryName: "",
    product: {
      title: "",
      description: "",
      price: 0,
      category: "",
      subcategory: "",
      sizes: "",
      tags: "",
    },
  });

  // Fetch all categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories from backend and reset subcategories & selections
  const fetchCategories = async () => {
    try {
      const res = await axios.post(`${API_BASE}/getCategories`);
      setCategories(res.data);
      // Reset subcategories and product category/subcategory on refresh
      setSubcategories([]);
      setSelectedCategory("");
      setFormData((prev) => ({
        ...prev,
        product: { ...prev.product, category: "", subcategory: "" },
      }));
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  // When user selects a parent category
  const handleCategoryChange = (e) => {
    const id = e.target.value;
    setSelectedCategory(id);

    // Update product.category to the selected parent category
    setFormData((prev) => ({
      ...prev,
      product: { ...prev.product, category: id, subcategory: "" }, // reset subcategory on category change
    }));

    // Filter subcategories whose parent matches selected category id
    const filteredSubcategories = categories.filter(
      (cat) => String(cat.parent) === id
    );
    setSubcategories(filteredSubcategories);
  };

  // When user selects a subcategory
  const handleSubcategoryChange = (e) => {
    const id = e.target.value;
    setFormData((prev) => ({
      ...prev,
      product: { ...prev.product, subcategory: id },
    }));
  };

  // Generic handler for other product input fields
  const handleProductInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      product: {
        ...prev.product,
        [name]: value,
      },
    }));
  };

  // Add new category (root)
  const handleAddCategory = async () => {
    try {
      await axios.post(`${API_BASE}/addCategory`, {
        name: formData.categoryName,
        slug: formData.categoryName.toLowerCase().replace(/ /g, "-"),
      });
      setFormData((prev) => ({ ...prev, categoryName: "" }));
      fetchCategories();
    } catch (err) {
      console.error("Failed to add category", err);
    }
  };

  // Add new subcategory under selected parent category
  const handleAddSubcategory = async () => {
    if (!selectedCategory) {
      alert("Please select a parent category first.");
      return;
    }
    try {
      await axios.post(`${API_BASE}/addCategory`, {
        name: formData.subcategoryName,
        slug: formData.subcategoryName.toLowerCase().replace(/ /g, "-"),
        parent: selectedCategory,
      });
      setFormData((prev) => ({ ...prev, subcategoryName: "" }));
      fetchCategories();
    } catch (err) {
      console.error("Failed to add subcategory", err);
    }
  };

  // Submit product creation
  const handleAddProduct = async () => {
    const { product } = formData;

    // Determine categoryId: prefer subcategory if selected, else parent category
    const categoryId = product.subcategory || product.category;

    if (!categoryId) {
      alert("Please select a category or subcategory for the product.");
      return;
    }

    // Find the selected category or subcategory object to get path
    const selectedCatObj = categories.find((cat) => cat._id === categoryId);
    if (!selectedCatObj) {
      alert("Selected category not found. Please try again.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/addProduct`, {
        ...product,
        tags: product.tags
          ? product.tags.split(",").map((tag) => tag.trim())
          : [],
        sizes: product.sizes
          ? product.sizes.split(",").map((size) => size.trim())
          : [],
        categoryId: categoryId,
        categoryPath: selectedCatObj.path,
      });

      alert("Product added successfully!");

      // Reset product form (optional)
      setFormData((prev) => ({
        ...prev,
        product: {
          title: "",
          description: "",
          price: 0,
          category: "",
          subcategory: "",
          sizes: "",
          tags: "",
        },
      }));

      // Reset selections and subcategories
      setSelectedCategory("");
      setSubcategories([]);
    } catch (err) {
      console.error("Failed to add product", err);
      alert("Failed to add product. Check console for details.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center">
        Add Products
      </h2>

      {/* Add Category */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">Add Category</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="New Category Name"
            value={formData.categoryName}
            onChange={(e) =>
              setFormData({ ...formData, categoryName: e.target.value })
            }
            className="flex-grow border border-gray-300 rounded-md px-4 py-2"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-2"
          >
            Add Category
          </button>
        </div>
      </section>

      {/* Add Subcategory */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">Add Subcategory</h3>
        <div className="flex gap-4">
          <select
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="flex-grow border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Select Parent Category</option>
            {categories
              .filter((cat) => !cat.parent)
              .map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
          <input
            type="text"
            placeholder="New Subcategory Name"
            value={formData.subcategoryName}
            onChange={(e) =>
              setFormData({ ...formData, subcategoryName: e.target.value })
            }
            className="flex-grow border border-gray-300 rounded-md px-4 py-2"
          />
          <button
            onClick={handleAddSubcategory}
            className="bg-green-600 hover:bg-green-700 text-white rounded-md px-6 py-2"
          >
            Add Subcategory
          </button>
        </div>
      </section>

      {/* Add Product */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-700">Add Product</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="title"
            placeholder="Product Title"
            value={formData.product.title}
            onChange={handleProductInput}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            name="description"
            placeholder="Product Description"
            value={formData.product.description}
            onChange={handleProductInput}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.product.price}
            onChange={handleProductInput}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            name="sizes"
            placeholder="Sizes (comma-separated)"
            value={formData.product.sizes}
            onChange={handleProductInput}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            name="tags"
            placeholder="Tags (comma-separated)"
            value={formData.product.tags}
            onChange={handleProductInput}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          <select
            onChange={handleCategoryChange}
            value={formData.product.category}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Select Category</option>
            {categories
              .filter((cat) => !cat.parent)
              .map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
          <select
            onChange={handleSubcategoryChange}
            value={formData.product.subcategory}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-md px-8 py-3 w-full md:w-auto"
        >
          Add Product
        </button>
      </section>
    </div>
  );
};

export default AddProduct;
