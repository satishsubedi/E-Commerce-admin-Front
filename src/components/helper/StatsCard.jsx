import React from "react";

const StatsCard = ({ label, value, icon: Icon, color, bgColor }) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-sm border flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </div>
      <span className={`p-3 rounded-full ${bgColor}`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </span>
    </section>
  );
};

export default StatsCard;
