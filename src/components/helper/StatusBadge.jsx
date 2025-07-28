const StatusBadge = ({ status }) => {
  const colors = {
    active: "bg-green-100 text-green-800 border-green-200",
    inactive: "bg-red-100 text-red-800 border-red-200",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
