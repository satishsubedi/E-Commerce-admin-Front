import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../../redux/user/userAction";

const AdminLayout = () => {
  const { user } = useSelector((state) => state.user);
  console.log("user data", user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //function to handle logout
  const handleLogout = async () => {
    dispatch(logoutUserAction(user.email));
    navigate("/login");
  };

  return (
    <div className="text-4xl text-fuchsia-500">
      Admin layout cooming soon ...
      <div className="mt-4 flex justify-center">
        <Button
          onClick={handleLogout}
          type="submit"
          className=" bg-green-800 hover:bg-green-900"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminLayout;
