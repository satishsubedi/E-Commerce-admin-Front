const StatusBadge = ({ status }) => {
  const colors = {
    active: "bg-green-100 text-green-800 border-green-200",
    inactive: "bg-purple-100 text-purple-800 border-purple-200",
    "out-of-stock": "bg-red-100 text-red-700 border-red-300",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${colors[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
