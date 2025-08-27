import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import SidebarItem from "../helper/SidebarItem";
import {
  ChartColumnStacked,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
  Settings,
  ShoppingCart,
  Ticket,
  UserRoundSearch,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUserAction } from "../../redux/user/userAction";

const AdminLayout = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState("Dashboard");

  //function to handle logout
  const handleLogout = async () => {
    dispatch(logoutUserAction(user.email));
    navigate("/login");
  };

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
            icon={<MessageSquare />}
            label="Reviews"
            path="/admin/reviews"
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
          <SidebarItem
            icon={<LogOut />}
            label="Logout"
            onClick={handleLogout}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </nav>

        <div className="mt-auto">
          <Separator className="my-4 w-full" />
          <div className="flex items-center gap-3 px-2 py-3">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={user?.profilePicture || "/placeholder.svg"}
                alt="Profile"
              />
              <AvatarFallback>
                {user?.fName?.charAt(0).toUpperCase() +
                  user?.lName?.charAt(0).toUpperCase() || "NAN"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.fName.toUpperCase().charAt(0) + user?.fName.slice(1)}{" "}
                {user?.lName.toUpperCase().charAt(0) + user?.lName.slice(1)}
              </p>
              <p className="text-xs text-gray-500 ">{user.email || "NAN"}</p>
            </div>
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
