import { assets } from "../../assets/asset";
import LoginForm from "../../components/log-in/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left section (form) */}
      <LoginForm />

      {/* Right section (image) */}
      <div className="hidden md:block relative">
        <img
          src={assets.Auth}
          alt="Leaf Background"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
