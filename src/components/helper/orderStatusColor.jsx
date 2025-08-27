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
    //This is order status
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

export default getStatusColor;
