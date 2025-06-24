import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import SidebarItem from "../helper/SidebarItem";
import {
  Building2,
  ChartColumnStacked,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Ticket,
  UserRoundSearch,
} from "lucide-react";

const AdminLayout = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  //function to handle logout
  //   const handleLogout = async () => {
  //     dispatch(logoutUserAction(user.email));
  //     navigate("/login");
  //   };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white p-4 flex flex-col">
        {/* Logo / Heading Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <LayoutDashboard
              className="text-white bg-blue-600 p-2 rounded-lg h-9 w-9 "
              size={2}
            />
            <h1 className="text-2xl font-bold text-gray-800">AdminPanel</h1>
          </div>
          <Separator className="my-8 w-full" />
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarItem
            icon={<LayoutDashboard />}
            label="Dashboard"
            path="/admin/dashboard"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <SidebarItem
            icon={<ChartColumnStacked />}
            label="Category"
            path="/admin/category"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <SidebarItem
            icon={<Package />}
            label="Products"
            path="/admin/products"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <SidebarItem
            icon={<ShoppingCart />}
            label="Orders"
            path="/admin/orders"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />

          <SidebarItem
            icon={<UserRoundSearch />}
            label="Users"
            path="/admin/users"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <SidebarItem
            icon={<Ticket />}
            label="Coupons"
            path="/admin/coupons"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <SidebarItem
            icon={<Settings />}
            label="Settings"
            path="/admin/settings"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </nav>

        <div className="mt-auto">
          <Separator className="my-4 w-full" />
          <div className="flex items-center gap-3 px-2 py-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/admin.png" />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Mahesh Kunwar</p>
              <p className="text-xs text-gray-500 truncate">mahesh.gmail.com</p>
            </div>
            ``
            <button className="text-gray-500 hover:text-gray-700">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
