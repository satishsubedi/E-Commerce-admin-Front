export const SignUpFormControls = [
  {
    name: "fName",
    label: "First Name*",
    type: "text",
    placeholder: "Enter first name",
  },
  {
    name: "lName",
    label: "Last Name*",
    type: "text",
    placeholder: "Enter last name",
  },
  {
    name: "email",
    label: "Email Address*",
    type: "email",
    placeholder: "Enter  email address",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Phone Number*",
    type: "number",
    placeholder: "+61 123456789",
  },
  {
    name: "password",
    label: "Password*",
    type: "password",
    placeholder: "***********",
  },
  {
    address: "address",
    name: "address",
    label: "Address*",
    type: "textarea",
    placeholder: "Enter address",
  },
  {
    name: "role",
    label: "Role*",
    type: "select",
    placeholder: "Select role",
    options: [
      {
        value: "admin",
        label: "Admin",
      },
      {
        value: "user",
        label: "User",
      },
    ],
  },
  {
    name: "status",
    label: "Status*",
    type: "select",
    placeholder: "Select Stasus",
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

//initial signup form
export const initialSignupFormData = {
  fName: "",
  lName: "",
  email: "",
  phone: "",
  password: "",
  role: "user",
  status: "active",
};

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
    name: "brand",
    label: "Brand",
    type: "text",
    placeholder: "Enter  Product brand",
  },
  {
    name: "tags",
    label: "Tags",
    type: "text",
    placeholder: "Tags (separated commas)",
  },
  {
    name: "description",
    label: "Description*",
    type: "textarea",
    placeholder: "Enter  product description",
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
    placeholder: "Enter price after discount",
  },
  {
    name: "stock",
    label: "Stock*",
    type: "number",
    placeholder: "0",
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
    name: "status",
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
      {
        value: "out-of-stock",
        label: "out-of-stock",
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

//initial coupon form
export const initialCouponFormData = {
  code: "",
  value: "",
  expiryDate: "",
  usageLimit: "",
};

//coupon form controls
export const CouponFormControls = [
  {
    name: "code",
    label: "Coupon Code*",
    type: "text",
    placeholder: "e.g., SAVE20",
  },

  {
    name: "value",
    label: "Coupon Value*",
    type: "number",
    placeholder: "e.g., 20",
  },

  {
    name: "expiryDate",
    label: "Expiry Date*",
    type: "date",
    placeholder: "Enter  expiry date",
  },
  {
    name: "usageLimit",
    label: "Usage Limit*",
    type: "number",
    placeholder: "e.g., 100",
  },
];

export const personalInfoFields = [
  {
    label: "First Name",
    name: "fName",
    type: "text",
    placeholder: "Enter your first name",
  },
  {
    label: "Last Name",
    name: "lName",
    type: "text",
    placeholder: "Enter your last name",
  },
  {
    label: "Email Address",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    label: "Phone Number",
    name: "phone",
    type: "tel",
    placeholder: "Enter your phone number",
  },
  {
    label: "Address",
    name: "address",
    type: "textarea",
    placeholder: "Enter your full address",
  },
];

export const passwordFields = [
  {
    label: "New Password",
    name: "password",
    type: "password",
    placeholder: "Enter new password",
    isPassword: true,
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm new password",
    isPassword: true,
  },
];
