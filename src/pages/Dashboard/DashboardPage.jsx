import React from "react";
import {
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Search,
  Bell,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Dummy data
const salesData = [
  { month: "Jan", sales: 12000, orders: 145 },
  { month: "Feb", sales: 15000, orders: 180 },
  { month: "Mar", sales: 18000, orders: 220 },
  { month: "Apr", sales: 22000, orders: 265 },
  { month: "May", sales: 25000, orders: 310 },
  { month: "Jun ", sales: 28000, orders: 340 },
  { month: "Jul ", sales: 29000, orders: 360 },
];

const recentOrders = [
  {
    id: "#12847",
    customer: "bikash Bohora",
    product: "Nike Victory Pro 4",
    amount: "$299.99",
    status: "Completed",
    date: "2024-01-15",
  },
  {
    id: "#12846",
    customer: "Mahesh Kunwar",
    product: "Ground Boots",
    amount: "$399.99",
    status: "Processing",
    date: "2024-01-15",
  },
  {
    id: "#12845",
    customer: "Dinesh",
    product: "Nike Air Max 270",
    amount: "$79.99",
    status: "Shipped",
    date: "2024-01-14",
  },
  {
    id: "#12844",
    customer: "Sham",
    product: "Adidas Ultraboost Light",
    amount: "$159.99",
    status: "Completed",
    date: "2024-01-14",
  },
  {
    id: "#12843",
    customer: "Kovid",
    product: "Reebok Classic Leather Kids",
    amount: "$24.99",
    status: "Cancelled",
    date: "2024-01-13",
  },
];

const topProducts = [
  { name: "Nike Victory Pro 4", sold: 234, revenue: "$70,266", change: 12.5 },
  { name: "Ground Boots", sold: 187, revenue: "$74,813", change: 8.2 },
  { name: "Nike Air Max 270", sold: 156, revenue: "$24,958", change: -3.1 },
  {
    name: "Adidas Ultraboost Light",
    sold: 143,
    revenue: "$11,437",
    change: 15.7,
  },
  {
    name: "Reebok Classic Leather Kids",
    sold: 98,
    revenue: "$2,450",
    change: -1.2,
  },
];

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
        status
      )}`}
    >
      {status}
    </span>
  );
};

const StatCard = ({ title, value, change, icon: Icon, trend }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
    </div>
    {change && (
      <div className="mt-4 flex items-center">
        {trend === "up" ? (
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
        )}
        <span
          className={`text-sm font-medium ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}%
        </span>
        <span className="text-sm text-gray-500 ml-1">vs last month</span>
      </div>
    )}
  </div>
);

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">MK</span>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard content */}
      <main className="p-6">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value="$124,532"
            change={12.5}
            trend="up"
            icon={DollarSign}
          />
          <StatCard
            title="Total Orders"
            value="1,463"
            change={8.2}
            trend="up"
            icon={ShoppingCart}
          />
          <StatCard
            title="Total Customers"
            value="892"
            change={-3.1}
            trend="down"
            icon={Users}
          />
          <StatCard
            title="Products"
            value="247"
            change={15.7}
            trend="up"
            icon={Package}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sales Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Orders Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Monthly Orders
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="orders" fill="#10B981" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Orders
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.product}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Top Products
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.sold} sold
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {product.revenue}
                      </p>
                      <div className="flex items-center justify-end">
                        {product.change > 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                        )}
                        <span
                          className={`text-xs ${
                            product.change > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {product.change > 0 ? "+" : ""}
                          {product.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
