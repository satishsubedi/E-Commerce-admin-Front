import { MoreHorizontal, TrendingDown, TrendingUp } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderAction } from "../../redux/order/orderAction";
import getCustomerName from "../../utils/GetCustomerName";
import { getTopProduct } from "../../axios/orderAxios";

const RecentOrderAndTopProduct = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  const [expandedOrders, setExpandedOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  // Get the latest 6 orders by sorting and slicing
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  const toggleExpandOrder = (orderId) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  useEffect(() => {
    dispatch(getOrderAction());
  }, [dispatch]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await getTopProduct();
        setTopProducts(response.payload || []);
        console.log("response", response);
      } catch (error) {
        console.error("Error fetching top products:", error);
      }
    };
    fetchTopProducts();
  }, []);

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

  // Helper function to safely render product ID
  const getProductIdDisplay = (productId) => {
    if (typeof productId === "object" && productId !== null) {
      // If productId is an object, try to get _id or id field, or return a fallback
      return productId._id || productId.id || "N/A";
    }
    return productId || "N/A";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
      {/* Recent Orders */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
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
              {recentOrders.map((order, index) => (
                <Fragment key={order._id || `order-${index}`}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 underline cursor-pointer">
                      #{order._id.slice(-6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getCustomerName(order)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center cursor-pointer">
                        <span>{order.items.length} product(s)</span>
                        {order.items.length && (
                          <button
                            onClick={() => toggleExpandOrder(order._id)}
                            className="ml-2 text-blue-500 hover:text-blue-700"
                          >
                            {expandedOrders.includes(order._id) ? "▲" : "▼"}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${order.totalAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={order.orderStatus} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>

                  {expandedOrders.includes(order._id) &&
                    order.items.map((item, idx) => (
                      <tr
                        key={`${order._id}-${item._id || idx}`}
                        className="bg-gray-50 hover:bg-gray-100"
                      >
                        <td className="px-6 py-2"></td>
                        <td className="px-6 py-2"></td>
                        <td className="px-6 py-2 text-sm text-gray-900">
                          <div className="flex items-center pl-4">
                            <span className="text-gray-500 mr-2">
                              {idx + 1}.
                            </span>
                            <span>
                              Product:
                              {getProductIdDisplay(
                                item.productId?.title
                              )} (Qty: {item.quantity}) - ${item.price} each
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-2"></td>
                        <td className="px-6 py-2"></td>
                        <td className="px-6 py-2"></td>
                      </tr>
                    ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product._id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-500">{product.sold} sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    ${product.revenue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOrderAndTopProduct;
