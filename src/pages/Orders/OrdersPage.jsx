import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getOrderAction,
  updateOrderStatusAction,
} from "@/redux/order/orderAction.js";
import { useLocation } from "react-router-dom";
import OrderPDFDownloader from "../../components/helper/OrderPDFDownloader";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [updatingOrders, setUpdatingOrders] = useState({});
  const { orders, loading, error } = useSelector((state) => state.orders);

  const filter = searchParams.get("filter") || "All";
  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");

  const [statusFilter, setStatusFilter] = useState(filter);
  const [dateFilter, setDateFilter] = useState({
    startDate: startDateParam
      ? new Date(startDateParam + "T00:00:00")
      : new Date(new Date().setHours(0, 0, 0, 0)),
    endDate: endDateParam
      ? new Date(endDateParam + "T23:59:59")
      : new Date(new Date().setHours(23, 59, 59, 999)),
  });

  useEffect(() => {
    dispatch(getOrderAction());
  }, [dispatch]);

  useEffect(() => {
    if (filter) setStatusFilter(filter);
  }, [filter]);
  useEffect(() => {
    console.log("Redux Orders State:", orders);
  }, [orders]);
  const handleStatusChange = async (orderId, newStatus, statusType) => {
    setUpdatingOrders((prev) => ({
      ...prev,
      [orderId]: { ...prev[orderId], [statusType]: true },
    }));

    const updatedData =
      statusType === "order"
        ? { orderStatus: newStatus }
        : { paymentStatus: newStatus };

    try {
      await dispatch(updateOrderStatusAction(orderId, updatedData));
    } catch (err) {
      console.error(err);
      dispatch(getOrderAction());
    } finally {
      setUpdatingOrders((prev) => ({
        ...prev,
        [orderId]: { ...prev[orderId], [statusType]: false },
      }));
    }
  };

  const filteredOrders =
    orders?.filter((order) => {
      const createdAt = new Date(order.createdAt);
      const isWithinDateRange =
        createdAt >= dateFilter.startDate && createdAt <= dateFilter.endDate;
      const matchesStatus =
        statusFilter === "All" ? true : order.orderStatus === statusFilter;
      return isWithinDateRange && matchesStatus;
    }) || [];

  const formatDate = (date) => date.toISOString().split("T")[0];

  const getStatusColor = (status, type = "order") => {
    if (type === "payment") {
      switch (status) {
        case "Paid":
          return "bg-green-100 text-green-800";
        case "Processing":
          return "bg-blue-100 text-blue-800";
        case "Pending":
          return "bg-yellow-100 text-yellow-800";
        case "Failed":
          return "bg-red-100 text-red-800";
        case "Refunded":
          return "bg-purple-100 text-purple-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    } else {
      switch (status) {
        case "Delivered":
          return "bg-green-100 text-green-800";
        case "On The Way":
          return "bg-blue-100 text-blue-800";
        case "Dispatched":
          return "bg-yellow-100 text-yellow-800";
        case "Order Placed":
          return "bg-orange-100 text-orange-800";
        case "Processing":
          return "bg-purple-100 text-purple-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
  };

  return (
    <div className="pt-[12vh] px-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Admin Orders</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => dispatch(getOrderAction())}>
            Refresh Orders
          </Button>
          <OrderPDFDownloader orders={filteredOrders} />
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 mb-6 items-center">
        <div>
          <label className="block text-sm font-semibold mb-1">
            Order Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-2 py-2 text-sm"
          >
            <option value="All">All</option>
            <option value="Order Placed">Order Placed</option>
            <option value="Processing">Processing</option>
            <option value="Dispatched">Dispatched</option>
            <option value="On The Way">On The Way</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Start Date</label>
          <input
            type="date"
            value={formatDate(dateFilter.startDate)}
            max={formatDate(dateFilter.endDate)}
            onChange={(e) =>
              setDateFilter((prev) => ({
                ...prev,
                startDate: new Date(e.target.value + "T00:00:00"),
              }))
            }
            className="border rounded px-2 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">End Date</label>
          <input
            type="date"
            value={formatDate(dateFilter.endDate)}
            min={formatDate(dateFilter.startDate)}
            onChange={(e) =>
              setDateFilter((prev) => ({
                ...prev,
                endDate: new Date(e.target.value + "T23:59:59"),
              }))
            }
            className="border rounded px-2 py-2 text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="w-full overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Order Status</th>
                    <th className="px-4 py-3">Payment Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-8 text-gray-500"
                      >
                        No orders found for selected filters.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">{order._id.slice(-6)}</td>
                        <td className="px-4 py-4">
                          {order.buyer?.email ||
                            (order.guestInfo
                              ? `${order.guestInfo.firstName || ""} ${
                                  order.guestInfo.lastName || ""
                                }`.trim()
                              : "Guest")}
                        </td>
                        <td className="px-4 py-4">
                          $ {order.totalAmount.toFixed(2)}
                        </td>
                        <td className="px-4 py-4">
                          <select
                            className={`border rounded p-1 ${getStatusColor(
                              order.orderStatus,
                              "order"
                            )}`}
                            value={order.orderStatus}
                            onChange={(e) =>
                              handleStatusChange(
                                order._id,
                                e.target.value,
                                "order"
                              )
                            }
                            disabled={updatingOrders[order._id]?.order}
                          >
                            <option value="Order Placed">Order Placed</option>
                            <option value="Processing">Processing</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="On The Way">On The Way</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="px-4 py-4">
                          <select
                            className={`border rounded p-1 ${getStatusColor(
                              order.payment?.status,
                              "payment"
                            )}`}
                            value={order.payment?.status || "Paid"}
                            onChange={(e) =>
                              handleStatusChange(
                                order._id,
                                e.target.value,
                                "payment"
                              )
                            }
                            disabled={updatingOrders[order._id]?.payment}
                          >
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Failed">Failed</option>
                            <option value="Refunded">Refunded</option>
                          </select>
                        </td>
                        <td className="px-4 py-4">
                          <button className="text-red-600">Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrdersPage;
