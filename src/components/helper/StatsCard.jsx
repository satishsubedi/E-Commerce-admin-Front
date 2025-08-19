// import React from "react";

// const StatsCard = ({ label, value, icon: Icon, color, bgColor }) => {
//   return (
//     <section className="bg-white p-6 rounded-lg shadow-sm border flex items-center justify-between">
//       <div>
//         <p className="text-sm font-medium text-gray-600">{label}</p>
//         <p className={`text-2xl font-bold ${color}`}>{value}</p>
//       </div>

//       <span className={`p-3 rounded-full ${bgColor}`}>
//         <Icon className={`h-6 w-6 ${color}`} />
//       </span>
//     </section>
//   );
// };

// export default StatsCard;

import React from "react";

const StatsCard = ({
  label,
  value,
  icon: Icon,
  color,
  bgColor,
  secondaryText,
}) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md border w-full h-full">
      <div className="flex flex-row items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
          {secondaryText && (
            <p className="text-xs text-gray-500 p-2">{secondaryText}</p>
          )}
        </div>
        <span className={`p-3 rounded-full ${bgColor}`}>
          <Icon className={`h-7 w-7 ${color}`} />
        </span>
      </div>
    </section>
  );
};

export default StatsCard;

// const StatCard = ({ title, value, change, icon: Icon, trend }) => (
//   <div className="bg-white rounded-lg shadow p-6">
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-sm font-medium text-gray-600">{title}</p>
//         <p className="text-2xl font-bold text-gray-900">{value}</p>
//       </div>
//       <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
//         <Icon className="h-6 w-6 text-blue-600" />
//       </div>
//     </div>
//     {change && (
//       <div className="mt-4 flex items-center">
//         {trend === "up" ? (
//           <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
//         ) : (
//           <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
//         )}
//         <span
//           className={`text-sm font-medium ${
//             trend === "up" ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {change}%
//         </span>
//         <span className="text-sm text-gray-500 ml-1">vs last month</span>
//       </div>
//     )}
//   </div>
// );
