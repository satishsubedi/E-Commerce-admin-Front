const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-200">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Unauthorized Access</h1>
        <p className="mt-2">You don't have permission to access this page.</p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
