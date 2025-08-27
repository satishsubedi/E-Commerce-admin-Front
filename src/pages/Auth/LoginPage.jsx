import { assets } from "../../assets/asset";
import LoginForm from "../../components/auth/LoginForm";
import { Image } from "@/components/ui/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* This is header part  */}
      <header className="bg-gray-900 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <span className="text-sm opacity-80">Secure Login</span>
      </header>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 bg-grey">
        {/* Left section (form) */}
        <LoginForm />

        {/* Right section (image) */}
        <div className="hidden md:block relative h-[84vh]">
          <Image
            src={assets.Auth}
            alt="Leaf Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
      {/* This is footer  */}
      <footer className="w-full bg-gray-100 text-gray-600 text-center py-4 border-t text-sm">
        © {new Date().getFullYear()} Internship Group Project. All rights
        reserved.
      </footer>
    </div>
  );
}
