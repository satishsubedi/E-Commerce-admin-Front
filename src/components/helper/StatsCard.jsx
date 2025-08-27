const StatsCard = ({ label, value, icon: Icon, color, bgColor }) => {
  return (
    <section className="bg-white p-8 rounded-lg shadow-md border w-full h-full ">
      <div className="flex flex-row items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <span className={`p-3 rounded-full ${bgColor}`}>
          <Icon className={`h-7 w-7 ${color}`} />
        </span>
      </div>
    </section>
  );
};

export default StatsCard;
