import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "react-toastify";
import { AlertCircle, ArrowLeft, CheckCircle2, Key } from "lucide-react";
import useForm from "../../hooks/useForm";
import useLoading from "../../hooks/useLoading";
import {
  ForgotPasswordFormControls,
  initialForgotPasswordFormData,
} from "../../config/formCongif";
import { forgetPasswordEmail } from "../../axios/userAxios";
import FormControl from "../../components/common-Input/FormControl";
import LoadingSpinner from "../../components/helper/LoadingSpinner";

const ForgotPasswordPage = () => {
  const { formData, handleOnChange } = useForm(initialForgotPasswordFormData); //useform from custom hook
  const { isLoading, startLoading, stopLoading } = useLoading(); //loading from custom hook
  const [isSuccess, setIsSuccess] = useState(false); // local state

  // function handle form submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    startLoading();
    try {
      //api call
      const response = await forgetPasswordEmail(formData);
      console.log("Sending Link response:", response);

      if (response?.status === "success") {
        toast.success(response.message || " reset link sent successfully.");
        setIsSuccess(true);
      }
      ``;
    } catch (error) {
      console.error("Sending Link failed failed:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Sending password reset link failed. Please try again."
      );
    } finally {
      stopLoading();
    }
  };

  // if success then only show this card
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto shadow-lg rounded-2xl overflow-hidden border-0">
          <CardHeader className="bg-green-600 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-700 rounded-full">
                <CheckCircle2
                  className="w-10 h-10 text-white"
                  strokeWidth={2}
                />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Email Sent Successfully!
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8 space-y-4">
            <div className="text-center">
              <p className="text-gray-700 mb-2">
                We've sent a password reset link to
              </p>
              <p className="font-semibold text-green-600 text-lg">
                {formData.email}
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-green-700">
                  If you don't see the email, please check your spam folder or
                  wait a few seconds.
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="px-8 pb-8">
            <Button
              asChild
              variant="outline"
              className="w-full border-green-300 text-green-600 hover:bg-green-600 hover:text-white "
            >
              <Link to="/login" className="flex items-center justify-center">
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 p-4">
      <Card className="w-full max-w-md mx-auto shadow-xl rounded-xl overflow-hidden border-0">
        <CardHeader className="bg-green-600 p-6 text-center">
          <Key className="w-8 h-8 mx-auto text-white" strokeWidth={2} />
          <CardTitle className="text-2xl font-bold text-white mt-2">
            Reset Your Password
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <div className="text-center mb-2">
            <p className="text-sm text-muted-foreground">
              Enter your email to receive a reset link
            </p>
          </div>

          <form
            onSubmit={handleOnSubmit}
            className="space-y-4"
            autoComplete="on"
          >
            {ForgotPasswordFormControls.map((field, index) => (
              <div key={index}>
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
              </div>
            ))}

            <Button
              type="submit"
              className="w-full  bg-green-500 hover:bg-green-600 hover:text-black "
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : "Send Reset Link"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or contact support
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Forgot your email? Call{" "}
              <span className="font-bold text-green-600">
                Mahesh | +61 0426182792
              </span>
            </p>
            <p className="text-sm mt-4">
              Remember your password?{" "}
              <Link
                to="/login"
                className="font-medium text-green-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
