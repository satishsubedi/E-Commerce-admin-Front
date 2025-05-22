import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
const LoginForm = () => {
  return (
    <div className="flex flex-col justify-center px-10 md:px-20">
      <div className="space-y-6 max-w-md mx-auto w-full">
        <div>
          <h2 className="text-2xl font-bold">Welcome back!</h2>
          <p className="text-sm text-muted-foreground">
            Enter your Credentials to access your account
          </p>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              forgot password
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        {/* Remember me */}
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm">
            Remember for 30 days
          </Label>
        </div>

        {/* Login Button */}
        <Button className="w-full bg-green-800 hover:bg-green-900">
          Login
        </Button>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <span className="h-px bg-border flex-1" />
          <span>Or</span>
          <span className="h-px bg-border flex-1" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex  items-center justify-center space-x-5">
          <Button variant="outline" className="w-50 flex items-center gap-2">
            <FcGoogle className="text-xl" />
            Sign in with Google
          </Button>
          <Button variant="outline" className="w-50 flex items-center gap-2">
            <FaApple className="text-xl" />
            Sign in with Apple
          </Button>
        </div>

        {/* Sign up link */}
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
