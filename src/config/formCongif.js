export const LogInFormControls = [
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter  your email address",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter  your password",
    autComplete: "current-password",
  },
];

//initial login form
export const initialLoginFormData = {
  email: "",
  password: "",
};
//This is for forgot password
export const ForgotPasswordFormControls = [
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter  your email address",
    autoComplete: "email",
  },
];

//Initial forgot password form
export const initialForgotPasswordFormData = {
  email: "",
};

//This is for change password
export const initialChangePasswordFormData = {
  password: "",
  confirmPassword: "",
};

// this is for product initialFormData
export const initialProductFormData = {
  title: "",
  slug: "",
  description: "",
  price: "",
  discountPrice: "",
  stock: "",
  brand: "",
  sizes: [],
  colors: [],
  images: [],
  thumbnail: "",
  categoryId: "",
  categoryPath: "",
  tags: [],
  ratings: 0,
  status: "active",
};

// this is for product form controls
export const ProductFormControls = [
  {
    name: "title",
    label: "Product Name *",
    type: "text",
    placeholder: "Enter Product Name ",
  },
  {
    name: "categoryId",
    label: "Category* ",
    type: "select",
    placeholder: "Select  Product category",
  },

  {
    name: "description",
    label: "Description*",
    type: "textarea",
    placeholder: "Enter  product description",
  },
  {
    name: "Image",
    label: "Image*",
    type: "file",
    placeholder: "Upload images",
  },
  {
    name: "price",
    label: "Price*",
    type: "number",
    placeholder: "0.00",
  },

  {
    name: "discountPrice",
    label: "Discount Price",
    type: "number",
    placeholder: "0.00",
  },
  {
    name: "stock",
    label: "Stock*",
    type: "number",
    placeholder: "0",
  },
  {
    name: "brand",
    label: "Brand",
    type: "text",
    placeholder: "Enter  Product brand",
  },
  {
    name: "sizes",
    label: "Sizes",
    type: "text",
    placeholder: "Sizes (separated commas)",
  },
  {
    name: "colors",
    label: "Colors",
    type: "text",
    placeholder: "Colors (separated commas)",
  },

  {
    name: "tags",
    label: "Tags",
    type: "text",
    placeholder: "Tags (separated commas)",
  },
  {
    name: "Status",
    label: "Status*",
    type: "select",
    placeholder: "Enter  Product tags",
    options: [
      {
        value: "active",
        label: "Active",
      },
      {
        value: "inactive",
        label: "Inactive",
      },
    ],
  },
];

//this is for category form
export const initialCategoryState = {
  _id: null,
  name: "",
  parentId: null,
  showForm: false,
};
