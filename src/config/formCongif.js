export const LogInFormControls = [
  {
    name: "userEmail",
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
  userEmail: "",
  password: "",
};
//This is for forgot password
export const ForgotPasswordFormControls = [
  {
    name: "userEmail",
    label: "Email Address",
    type: "email",
    placeholder: "Enter  your email address",
    autoComplete: "email",
  },
];

//Initial forgot password form
export const initialForgotPasswordFormData = {
  userEmail: "",
};

//This is for change password
export const initialChangePasswordFormData = {
  password: "",
  confirmPassword: "",
};
