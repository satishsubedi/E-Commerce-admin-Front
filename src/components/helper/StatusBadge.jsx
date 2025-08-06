import { Clock, CheckCircle, XCircle } from "lucide-react";

const StatusBadge = ({ status, type = "product" }) => {
  const productColors = {
    active: "bg-green-100 text-green-800 border-green-200",
    inactive: "bg-purple-100 text-purple-800 border-purple-200",
    "out-of-stock": "bg-red-100 text-red-700 border-red-300",
  };

  const reviewColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
  };

  const colors = type === "review" ? reviewColors : productColors;

  const getReviewIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-3 h-3 mr-1" />;
      case "approved":
        return <CheckCircle className="w-3 h-3 mr-1" />;
      case "rejected":
        return <XCircle className="w-3 h-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${
        colors[status] || "bg-gray-100 text-gray-800 border-gray-200"
      }`}
    >
      {type === "review" && getReviewIcon(status)}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
