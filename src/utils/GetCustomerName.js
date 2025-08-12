const getCustomerName = (order) => {
  const firstName = order?.guestInfo?.firstName || order?.buyer?.fName || "";
  const lastName = order?.guestInfo?.lastName || order?.buyer?.lName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  return fullName || "N/A";
};

export default getCustomerName;
