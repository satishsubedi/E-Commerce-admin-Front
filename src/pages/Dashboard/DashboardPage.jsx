import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  DollarSign,
  ShoppingBag,
  Package,
  LayoutDashboard,
  Users,
  LogOut,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PageLoadingSpinner from "../../components/helper/PageLoadingSpinner";
import { getDashboardData } from "../../axios/orderAxios";
import StatsCard from "../../components/helper/StatsCard";
import RecentOrderAndTopProduct from "./RecentOrderAndTopProduct";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUserAction } from "../../redux/user/userAction";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // api call
        const res = await getDashboardData();
        setDashboardData(res?.payload);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  //function to handle logout
  const handleLogout = async () => {
    dispatch(logoutUserAction(user?.email));
    navigate("/login");
  };

  if (!dashboardData)
    return (
      <div className="flex justify-center items-center h-screen">
        <PageLoadingSpinner pageName="Dashboard" />
      </div>
    );

  // Destructure dashboard data
  const {
    salesData,
    userTypeData,
    statusData,
    totalRevenue,
    totalOrders,
    activeUserCount,
    totalProducts,
  } = dashboardData;

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b p-3">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </h2>
                <p className="text-gray-600 mt-2 ">
                  Welcome back!! ,
                  <span className="font-bold m-2">
                    {user?.fName.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold hover:cursor-pointer">
                  {user?.fName?.charAt(0)?.toUpperCase() +
                    user?.lName?.charAt(0)?.toUpperCase() || "NA"}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuLabel>
                  {user?.fName.toUpperCase().charAt(0) + user?.fName.slice(1)}{" "}
                  {user?.lName.toUpperCase().charAt(0) + user?.lName.slice(1)}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => navigate("/admin/settings")}>
                  <Settings className="mr-1" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-1" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-6">
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard
              label="Total Sales"
              value={`$${totalRevenue}`}
              icon={DollarSign}
              color="text-blue-600"
              bgColor="bg-blue-50"
            />
            <StatsCard
              label="Total Orders"
              value={totalOrders}
              icon={ShoppingBag}
              color="text-blue-600"
              bgColor="bg-blue-50"
            />
            <StatsCard
              label="Active Users"
              value={activeUserCount}
              icon={Users}
              color="text-blue-600"
              bgColor="bg-blue-50"
            />
            <StatsCard
              label=" Total Products"
              value={totalProducts}
              icon={Package}
              color="text-blue-600"
              bgColor="bg-blue-50"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            {/* Sales Overview Line Chart */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Orders per Month Bar Chart */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Orders Per Month</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* User Type Pie Chart */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>User Type</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={userTypeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {userTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Order Status Donut Chart */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      label
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* recent  order and top product */}
          <RecentOrderAndTopProduct />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
