import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { toast } from "react-toastify";
import useForm from "../../hooks/useForm";
import useLoading from "../../hooks/useLoading";
import {
  ForgotPasswordFormControls,
  initialLoginFormData,
} from "../../config/formCongif";
import FormControl from "../common-Input/FormControl";
const ForgotPasswordForm = () => {
  //useform from custom hook
  const { formData, handleOnChange, setFormData } =
    useForm(initialLoginFormData);

  //loading from custom hook
  const { isLoading, startLoading, stopLoading } = useLoading();

  // function handle form submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    startLoading();
    try {
      //api call
      alert("Please check your email including spam mails. Thnaks");
    } catch (error) {
      console.error("Sending Link failed failed:", error);
      toast.error("Sending password reset link failed. Please try again.");
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="flex flex-col justify-center px-10 md:px-20">
      <div className="space-y-6 max-w-md mx-auto w-full">
        <div>
          <h2 className="text-2xl font-bold">Forgot Password? No Worries!</h2>
          <p className="text-sm text-muted-foreground">
            Enter your Credentials to reset password.
          </p>
        </div>

        {/* form */}
        <form onSubmit={handleOnSubmit} className="space-y-4" autoComplete="on">
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

          {/* Login button */}
          <div className="mt-6">
            <Button
              type="submit"
              className="w-full bg-green-800 hover:bg-green-900 cursor-pointer"
              disabled={isLoading}
            >
              Send Link
            </Button>
          </div>
        </form>

        {/* Information */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Please Check your Email including spam folder. Thanks
        </p>
        {/* Divider */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <span className="h-px bg-border flex-1" />
          <span>Or</span>
          <span className="h-px bg-border flex-1" />
        </div>
        <p className="mt-8 text-center text-xl text-black">
          Forgot your Email? No worries! call{" "}
          <span className="text-red-600 font-bold">Mahesh</span>
        </p>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="login" className="text-blue-600 hover:underline">
            LogIn
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
