import React, { useEffect, useState } from "react";
import axios from "axios";
//This one is dinesh backend
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
      sizes: [{ size: "", stock: 0 }],
      tags: "",
    },
  });
  //This is for fetching the categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get(`${API_BASE}/getCategories`);
    setCategories(res.data);
  };
  //this is for subcategories
  const fetchSubcategories = async (categoryId) => {
    const res = await axios.get(`${API_BASE}/getSubCategories/${categoryId}`);
    setSubcategories(res.data);
  };
  //This is for categories already exist
  const handleCategoryChange = (e) => {
    const id = e.target.value;
    setSelectedCategory(id);
    setFormData({
      ...formData,
      product: { ...formData.product, category: id },
    });
    fetchSubcategories(id);
  };
  //this is for subcategories already exist
  const handleSubcategoryChange = (e) => {
    const id = e.target.value;
    setFormData({
      ...formData,
      product: { ...formData.product, subcategory: id },
    });
  };
  //This is for adding the product
  const handleProductInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      product: {
        ...formData.product,
        [name]: value,
      },
    });
  };
  //This is for adding the new categories
  const handleAddCategory = async () => {
    await axios.post(`${API_BASE}/addCategory`, {
      name: formData.categoryName,
      slug: formData.categoryName.toLowerCase().replace(/ /g, "-"),
    });
    fetchCategories();
  };

  //This is for adding the new subcategories
  const handleAddSubcategory = async () => {
    await axios.post(`${API_BASE}/addSubCategory`, {
      name: formData.subcategoryName,
      slug: formData.subcategoryName.toLowerCase().replace(/ /g, "-"),
      parentCategory: selectedCategory,
    });
    fetchSubcategories(selectedCategory);
  };
  //This is for adding sizes as well
  const handleAddProduct = async () => {
    const { product } = formData;
    await axios.post(`${API_BASE}/addProduct`, {
      ...product,
      sizes: product.sizes,
      tags: product.tags.split(","),
    });
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
            className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-6 py-2 transition"
          >
            Add Category
          </button>
        </div>
      </section>

      {/* Add Subcategory */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">Add Subcategory</h3>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <select
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
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
            className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleAddSubcategory}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md px-6 py-2 transition"
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
            onChange={handleProductInput}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="description"
            placeholder="Product Description"
            onChange={handleProductInput}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleProductInput}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="tags"
            placeholder="Tags (comma-separated)"
            onChange={handleProductInput}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            onChange={handleCategoryChange}
            value={formData.product.category}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            onChange={handleSubcategoryChange}
            value={formData.product.subcategory}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={handleAddProduct}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md px-8 py-3 w-full md:w-auto transition"
          >
            Add Product
          </button>
        </div>
      </section>
    </div>
  );
};

export default AddProduct;
