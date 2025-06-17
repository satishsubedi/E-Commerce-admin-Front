import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8000/api/v1";

const AddProduct = () => {
  const [categoryTree, setCategoryTree] = useState([]);
  const [formData, setFormData] = useState({
    product: {
      title: "",
      description: "",
      price: 0,
      categoryId: "",
      tags: "",
      sizes: "",
    },
    newCategory: {
      name: "",
      parentId: "",
    },
  });

  // Fetch nested categories
  useEffect(() => {
    fetchCategoryTree();
  }, []);

  const fetchCategoryTree = async () => {
    try {
      const res = await axios.get(`${API}/product/category/tree`);
      setCategoryTree(res.data.data);
    } catch (err) {
      console.error("Failed to fetch category tree", err);
    }
  };

  // Recursive function to show nested categories with indent
  const renderCategoryOptions = (categories, depth = 0) => {
    return categories.map((cat) => (
      <React.Fragment key={cat._id}>
        <option value={cat._id}>
          {Array(depth).fill("\u00A0\u00A0\u00A0").join("")}
          {cat.name}
        </option>
        {cat.children?.length > 0 &&
          renderCategoryOptions(cat.children, depth + 1)}
      </React.Fragment>
    ));
  };

  const handleProductInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      product: { ...prev.product, [name]: value },
    }));
  };

  const handleCategoryInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      newCategory: { ...prev.newCategory, [name]: value },
    }));
  };

  const handleAddCategory = async () => {
    const { name, parentId } = formData.newCategory;

    if (!name) return alert("Category name is required");

    try {
      await axios.post(`${API}/product/category/add`, {
        name,
        slug: name.toLowerCase().replace(/ /g, "-"),
        parent: parentId || null,
      });
      alert("Category added");
      setFormData((prev) => ({
        ...prev,
        newCategory: { name: "", parentId: "" },
      }));
      fetchCategoryTree(); // refresh list
    } catch (err) {
      console.error("Failed to add category", err);
    }
  };

  const handleAddProduct = async () => {
    const { title, description, price, categoryId, tags, sizes } =
      formData.product;

    if (!title || !price || !categoryId) {
      alert("Fill required fields: title, price, category");
      return;
    }

    try {
      await axios.post(`${API}/product/addProduct`, {
        title,
        description,
        price,
        categoryId,
        tags: tags.split(",").map((t) => t.trim()),
        sizes: sizes.split(",").map((s) => s.trim()),
      });
      alert("Product added");
      setFormData((prev) => ({
        ...prev,
        product: {
          title: "",
          description: "",
          price: 0,
          categoryId: "",
          tags: "",
          sizes: "",
        },
      }));
    } catch (err) {
      console.error("Failed to add product", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-700 text-center">
        Add Product & Categories
      </h2>

      {/* Create Category */}
      <section>
        <h3 className="font-semibold text-gray-600">Create New Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={formData.newCategory.name}
            onChange={handleCategoryInput}
            className="border rounded-md px-4 py-2"
          />
          <select
            name="parentId"
            value={formData.newCategory.parentId}
            onChange={handleCategoryInput}
            className="border rounded-md px-4 py-2"
          >
            <option value="">Root Category</option>
            {renderCategoryOptions(categoryTree)}
          </select>
        </div>
        <button
          onClick={handleAddCategory}
          className="mt-3 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Category
        </button>
      </section>

      {/* Add Product */}
      <section>
        <h3 className="font-semibold text-gray-600">Create New Product</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <input
            name="title"
            value={formData.product.title}
            onChange={handleProductInput}
            placeholder="Title"
            className="border rounded-md px-4 py-2"
          />
          <input
            name="description"
            value={formData.product.description}
            onChange={handleProductInput}
            placeholder="Description"
            className="border rounded-md px-4 py-2"
          />
          <input
            name="price"
            type="number"
            value={formData.product.price}
            onChange={handleProductInput}
            placeholder="Price"
            className="border rounded-md px-4 py-2"
          />
          <select
            name="categoryId"
            value={formData.product.categoryId}
            onChange={handleProductInput}
            className="border rounded-md px-4 py-2"
          >
            <option value="">Select Category</option>
            {renderCategoryOptions(categoryTree)}
          </select>
          <input
            name="tags"
            value={formData.product.tags}
            onChange={handleProductInput}
            placeholder="Tags (comma separated)"
            className="border rounded-md px-4 py-2"
          />
          <input
            name="sizes"
            value={formData.product.sizes}
            onChange={handleProductInput}
            placeholder="Sizes (comma separated)"
            className="border rounded-md px-4 py-2"
          />
        </div>
        <button
          onClick={handleAddProduct}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </section>
    </div>
  );
};

export default AddProduct;
