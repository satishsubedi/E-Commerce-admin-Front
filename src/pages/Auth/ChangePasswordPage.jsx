import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowLeft, CheckCircle2, Eye, EyeOff, Key } from "lucide-react";
import useForm from "../../hooks/useForm";
import { initialChangePasswordFormData } from "../../config/formCongif";
import { toast } from "react-toastify";
import useLoading from "../../hooks/useLoading";
import { Link, useSearchParams } from "react-router-dom";
import { changePassword } from "../../axios/userAxios";
import LoadingSpinner from "../../components/helper/LoadingSpinner";

const ChangePasswordPage = () => {
  const { formData, handleOnChange } = useForm(initialChangePasswordFormData); //useform from custom hook
  const { password, confirmPassword } = formData; //  destructure formData
  const { isLoading, startLoading, stopLoading } = useLoading(); //loading from custom hook
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  //get the email and token from the url
  // const [params] = useSearchParams();
  // const userEmail = params.get("e");
  // const token = params.get("id");

  // Function to handle reset password submission
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }
    startLoading();
    try {
      // api call
      // const response = await changePassword({ formData, token, userEmail });

      // if (response?.status === "error") {
      //   toast.error(
      //     response.message || "Password reset failed. Please try again."
      //   );
      //   return;
      // }

      // if (response?.status === "success") {
      //   toast.success(response.message || "Password reset successfullly.");
      //   setIsSuccess(true);
      // }

      alert("Password reset successfullly.");
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  //if the password reset is successful, show a success message
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-green-50">
        <Card className="w-full max-w-md mx-auto shadow-xl rounded-xl overflow-hidden border-0 bg-gradient-to-b from-white to-green-50">
          <CardHeader className="p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
              <CheckCircle2
                className="h-10 w-10 text-green-600"
                strokeWidth={2}
              />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600 mt-4">
              Password Reset Successful!
            </CardTitle>
          </CardHeader>

          <CardContent className="px-8 pb-6">
            <p className="text-center text-gray-600">
              Your password has been successfully reset. You can now log in with
              your new password.
            </p>
          </CardContent>

          <CardFooter className="flex justify-center pb-8">
            <Button
              asChild
              variant="outline"
              className="w-full border-green-300 text-green-600 hover:bg-green-600 hover:text-white "
            >
              <Link to="/login" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md mx-auto shadow-lg rounded-xl overflow-hidden border-0">
        <CardHeader className="bg-green-600 p-6 text-center">
          <Key className="w-8 h-8 mx-auto text-white" strokeWidth={2} />
          <CardTitle className="text-2xl font-bold text-white mt-2">
            Reset Your Password
          </CardTitle>
          <CardDescription className="text-indigo-100">
            Choose a strong password for your sportify account
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleOnSubmit}>
            <div className="space-y-2 relative">
              <Label htmlFor="new-password" className="font-bold text-gray-700">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Enter your new password"
                  required
                  className="pr-10 focus-visible:ring-green-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2 relative mt-4">
              <Label
                htmlFor="confirm-password"
                className="font-bold text-gray-700"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Confirm your new password"
                  required
                  className="pr-10 focus-visible:ring-green-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              className="w-full mt-6 bg-green-600 hover:bg-green-700 h-10 font-medium"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : "Reset Password"}
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <p className="text-center ml-9 text-sm text-gray-500">
            Remember your password?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;
