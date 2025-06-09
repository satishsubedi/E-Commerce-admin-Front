import { assets } from "../../assets/asset";
import LoginForm from "../../components/auth/LoginForm";
import { Image } from "@/components/ui/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-amber-100">
      {/* Left section (form) */}
      <LoginForm />

      {/* Right section (image) */}
      <div className="hidden md:block relative h-screen">
        <Image
          src={assets.Auth}
          alt="Leaf Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
