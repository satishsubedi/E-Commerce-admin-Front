import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLocation } from "react-router-dom";
import OrderPDFDownloader from "../../components/helper/OrderPDFDownloader";
import { Eye, ShoppingCart } from "lucide-react";
import FilterSelect from "../../components/helper/FilterSelect";
import {
  addOrderNoteAction,
  getOrderAction,
  sendOrderNoteEmailAction,
  updateOrderStatusAction,
} from "../../redux/order/orderAction";
import getCustomerName from "../../utils/GetCustomerName";
import OrderDetailsDialog from "./OrderDetailsDialog";
import formatDate from "../../utils/FormatDate";
import getStatusColor from "../../components/helper/orderStatusColor";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  //This is for updating the orders
  const [updatingOrders, setUpdatingOrders] = useState({});
  const { orders, loading, error } = useSelector((state) => state.orders);

  console.log("Orders:", orders);

  //This is for filtering the   orders
  const filter = searchParams.get("filter") || "All";
  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");

  const [statusFilter, setStatusFilter] = useState(filter);
  const [dateFilter, setDateFilter] = useState({
    startDate: new Date("2025-01-01T00:00:00"),
    endDate: new Date("2030-12-31T23:59:59"),
  });

  //This is for order view
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [notes, setNotes] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);

  //This is for getting the orders
  useEffect(() => {
    dispatch(getOrderAction());
  }, [dispatch]);

  //This is for fitering the orders
  useEffect(() => {
    if (filter) setStatusFilter(filter);
  }, [filter]);

  //This is for status change
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
  }; //This is for filtering the orders
  const filteredOrders =
    orders?.filter((order) => {
      const createdAt = new Date(order.createdAt);
      const isWithinDateRange =
        createdAt >= dateFilter.startDate && createdAt <= dateFilter.endDate;
      const matchesStatus =
        statusFilter === "All" ? true : order.orderStatus === statusFilter;
      return isWithinDateRange && matchesStatus;
    }) || [];

  const formatDates = (date) => {
    if (!date || isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  };

  //This is for handling view order
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setNotes(order.orderNotes || "");
    setIsModalOpen(true);
  };
  //This is for adding the notes
  const handleAddNote = async () => {
    if (!selectedOrder) return;
    await dispatch(addOrderNoteAction(selectedOrder._id, notes));
    if (!error) {
      setIsModalOpen(false);
    }
  };

  //This is sending email
  const sendEmail = async () => {
    try {
      setSendingEmail(true);
      await dispatch(sendOrderNoteEmailAction(selectedOrder._id, notes));
      alert("Email sent!");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to send email");
    } finally {
      setSendingEmail(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className=" max-w-7xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin</h1>
              <p className="text-gray-600">
                Track orders, manage products, and oversee customer activity.
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => dispatch(getOrderAction())}
            >
              Refresh Orders
            </Button>
            <OrderPDFDownloader orders={filteredOrders} />
          </div>
        </div>

        {/* Filters order and date */}
        <div className="flex space-x-2 mb-6 items-center">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Order Status
            </label>
            <FilterSelect
              value={statusFilter}
              onValueChange={setStatusFilter}
              options={[
                { value: "All", label: "All Status" },
                { value: "Order Placed", label: "Order Placed" },
                { value: "Processing", label: "Processing" },
                { value: "Dispatched", label: "Dispatched" },
                { value: "On The Way", label: "On The Way" },
                { value: "Delivered", label: "Delivered" },
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={formatDates(dateFilter.startDate)}
              max={formatDates(dateFilter.endDate)}
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
              value={formatDates(dateFilter.endDate)}
              min={formatDates(dateFilter.startDate)}
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
            <CardHeader>
              <CardTitle>Order List({filteredOrders.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No orders found
                    </h3>
                    <p className="text-gray-500">
                      No orders match the selected filters.
                    </p>
                  </div>
                ) : (
                  <div className="max-h-[500px] overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>SN</TableHead>
                          <TableHead>ORDER ID</TableHead>
                          <TableHead>CUSTOMER</TableHead>
                          <TableHead>CONTACT</TableHead>
                          <TableHead>TOTAL</TableHead>
                          <TableHead>ORDER DATE</TableHead>
                          <TableHead>ORDER STATUS</TableHead>
                          <TableHead>PAYMENT STATUS</TableHead>
                          <TableHead className="text-right">ACTIONS</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order, index) => (
                          <TableRow
                            key={order._id}
                            className="hover:bg-gray-100"
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell
                              className="font-medium text-blue-600 underline hover:cursor-pointer"
                              onClick={() => handleViewOrder(order)}
                            >
                              #{order._id.slice(-6)}
                            </TableCell>
                            <TableCell>{getCustomerName(order)}</TableCell>
                            <TableCell className="flex flex-col">
                              <div>
                                {order.guestInfo?.email ||
                                  order.buyer?.email ||
                                  "N/A"}
                              </div>
                              <div>
                                {order?.guestInfo?.phoneNumber ||
                                  order.buyer?.phone ||
                                  "N/A"}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="font-medium">
                                $ {order.totalAmount.toFixed(2)}
                              </span>
                            </TableCell>
                            <TableCell>{formatDate(order.createdAt)}</TableCell>
                            <TableCell>
                              <select
                                className={`border rounded px-2 py-1 text-sm ${getStatusColor(
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
                                <option value="Order Placed">
                                  Order Placed
                                </option>
                                <option value="Processing">Processing</option>
                                <option value="Dispatched">Dispatched</option>
                                <option value="On The Way">On The Way</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </TableCell>
                            <TableCell>
                              <select
                                className={`border rounded px-2 py-1 text-sm ${getStatusColor(
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
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                title="View Details"
                                onClick={() => handleViewOrder(order)}
                                className="text-blue-600  hover:text-blue-900"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <OrderDetailsDialog
                      isOpen={isModalOpen}
                      onOpenChange={setIsModalOpen}
                      order={selectedOrder}
                      notes={notes}
                      setNotes={setNotes}
                      sendEmail={sendEmail}
                      sendingEmail={sendingEmail}
                      addNote={handleAddNote}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
