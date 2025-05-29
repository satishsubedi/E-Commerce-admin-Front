import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { getUserAction } from "../../redux/user/userAction";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../helper/LoadingSpinner";
import { Link } from "react-router-dom";
import { loginUser } from "../../axios/userAxios";
const LoginForm = () => {
  const dispatch = useDispatch();

  const { formData, handleOnChange, setFormData } =
    useForm(initialLoginFormData); //useform from custom hook
  const { isLoading, startLoading, stopLoading } = useLoading(); //loading from custom hook
  const [showPassword, setShowPassword] = useState(false); //state

  // function handle form submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    startLoading();

    try {
      //api call
      const response = await loginUser(formData);

      if (response?.status === "error") {
        toast.error(response.message || "Login failed. Please try again.");
        return;
      }

      //store JTWs in session and local storage
      sessionStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      //dispatch action to get user
      dispatch(getUserAction());

      toast.success(response.message || "Login successful!");

      // Reset form data after successful login
      setFormData(initialLoginFormData);
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
                  <Label
                    className=" block font-bold mb-2  "
                    htmlFor={field.name}
                  >
                    {field.label}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleOnChange}
                      placeholder={field.placeholder}
                      required
                      id={field.name}
                      autoComplete="current-password"
                      className=" dark:text-white mb-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-600 focus-visible:z-10 sm:text-sm/6"
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
              {isLoading ? <LoadingSpinner /> : "Login"}
            </Button>
          </div>
        </form>

        {/* Forgot password */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Forgot password?
          <Link
            to="/forget-password"
            className="ml-1 text-sm text-blue-600 hover:underline"
          >
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
