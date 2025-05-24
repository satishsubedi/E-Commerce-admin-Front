import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import useForm from "../../hooks/useForm";
import useLoading from "../../hooks/useLoading";
import { useState } from "react";
import {
  initialLoginFormData,
  LogInFormControls,
} from "../../config/formCongif";
import FormControl from "../common-Input/FormControl";
import { toast } from "react-toastify";
const LoginForm = () => {
  //useform from custom hook
  const { formData, handleOnChange, setFormData } =
    useForm(initialLoginFormData);

  //loading from custom hook
  const { isLoading, startLoading, stopLoading } = useLoading();

  //state
  const [showPassword, setShowPassword] = useState(false);

  // function handle form submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    startLoading();
    try {
      //api call
      alert("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="flex flex-col justify-center px-10 md:px-20">
      <div className="space-y-6 max-w-md mx-auto w-full">
        <div>
          <h2 className="text-2xl font-bold">Welcome back!</h2>
          <p className="text-sm text-muted-foreground">
            Enter your Credentials to access your account
          </p>
        </div>

        {/* form */}
        <form onSubmit={handleOnSubmit} className="space-y-4" autoComplete="on">
          {LogInFormControls.map((field, index) => (
            <div key={index}>
              {field.name === "password" ? (
                <div className="relative">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleOnChange}
                      placeholder={field.placeholder}
                      required
                      id={field.name}
                      className="pr-10"
                      autoComplete="current-password"
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-3 bg-transparent cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <FormControl
                  label={field.label}
                  handleOnChange={handleOnChange}
                  inputAttributes={{
                    type: field.type,
                    name: field.name,
                    value: formData[field.name],
                    placeholder: field.placeholder,
                    autoComplete: field.autoComplete,
                    required: true,
                    id: field.name,
                  }}
                />
              )}
            </div>
          ))}

          {/* Login button */}
          <div className="mt-6">
            <Button
              type="submit"
              className="w-full bg-green-800 hover:bg-green-900"
              disabled={isLoading}
            >
              Login
            </Button>
          </div>
        </form>

        {/* Forgot password */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Forgot password?
          <a
            href="/forget-password"
            className="ml-1 text-sm text-blue-600 hover:underline"
          >
            Click here
          </a>
        </p>
        {/* Divider */}
        {/* <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <span className="h-px bg-border flex-1" />
          <span>Or</span>
          <span className="h-px bg-border flex-1" />
        </div> */}
        {/* Social Login Buttons */}
        {/* <div className="flex  items-center justify-center space-x-5">
          <Button variant="outline" className="w-50 flex items-center gap-2">
            <FcGoogle className="text-xl" />
            Sign in with Google
          </Button>
          <Button variant="outline" className="w-50 flex items-center gap-2">
            <FaApple className="text-xl" />
            Sign in with Apple
          </Button>
        </div> */}
        {/* Sign up link */}
        {/* <p className="text-center text-sm">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default LoginForm;
