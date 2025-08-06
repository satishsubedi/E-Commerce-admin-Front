import { useState, useEffect } from "react";
import {
  Calendar,
  Edit,
  Eye,
  Mail,
  Phone,
  Plus,
  Search,
  Shield,
  UserCheck,
  UserRoundSearch,
  UserX,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import FilterSelect from "../../components/helper/FilterSelect";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import StatsCard from "../../components/helper/StatsCard";
import formatDate from "../../utils/FormatDate";
import StatusBadge from "../../components/helper/StatusBadge";
import ConfirmDelete from "../../components/helper/ConfirmDelete";
import UserDetailsDialogue from "../../components/user/userDetailsDialogue";
import CreateOrEditUserDialogue from "../../components/user/CreateOrEditUserDialogue";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  getAllUsersAction,
} from "../../redux/user/userAction";
import PageLoadingSpinner from "../../components/helper/PageLoadingSpinner";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  // Handle view user dialog
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  // Handle create user dialog
  const handleCreateUser = () => {
    setSelectedUser(null); // Clear any selected user for create mode
    setIsCreateDialogOpen(true);
  };

  // Handle edit user dialog
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsCreateDialogOpen(true);
  };

  // Handle save user (create or update)
  const handleSaveUser = (userData) => {
    // Refresh the users list after save
    dispatch(getAllUsersAction());
  };

  //get the role badge
  const getRoleBadge = (role) => {
    const colors = {
      admin: "bg-purple-100 text-purple-800 border-purple-200",
      user: "bg-blue-100 text-blue-800 border-blue-200",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[role]}`}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  //if loading show this
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PageLoadingSpinner pageName="users" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 ">
      <div className=" max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserRoundSearch className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                User Management
              </h1>
              <p className="text-sm text-gray-600">
                Manage your user accounts and permissions
              </p>
            </div>
          </div>
          <Button
            onClick={handleCreateUser}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 " />
            Add User
          </Button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
          <StatsCard
            label="Total Users"
            value={users.length}
            icon={UserCheck}
            color="text-gray-900"
            bgColor="bg-blue-100"
          />
          <StatsCard
            label="Active Users"
            value={users.filter((user) => user.status === "active").length}
            icon={UserCheck}
            color="text-green-600"
            bgColor="bg-green-100"
          />
          <StatsCard
            label="Inactive Users"
            value={users.filter((user) => user.status === "inactive").length}
            icon={UserX}
            color="text-red-600"
            bgColor="bg-red-100"
          />
          <StatsCard
            label="Admins"
            value={users.filter((user) => user.role === "admin").length}
            icon={Shield}
            color="text-purple-600"
            bgColor="bg-purple-100"
          />
        </div>

        {/* Users details */}
        <Card>
          <CardHeader>
            <CardTitle>User List({filteredUsers.length})</CardTitle>
            <CardDescription>Manage and moderate user accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>

              {/* Filter status */}
              <FilterSelect
                value={statusFilter}
                onValueChange={setStatusFilter}
                placeholder="Filter by status"
                options={[
                  { value: "all", label: "All Status" },
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
              />

              {/* Filter role */}
              <FilterSelect
                value={roleFilter}
                onValueChange={setRoleFilter}
                placeholder="Filter by role"
                options={[
                  { value: "all", label: "All Roles" },
                  { value: "admin", label: "Admin" },
                  { value: "user", label: "User" },
                ]}
              />
            </div>
            {/* Users Table */}
            <div className="rounded-md overflow-hidden border">
              <div className="max-h-[400px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="px-6 py-4 text-left text-xs font-medium tracking-wider">
                      <TableHead>SN</TableHead>
                      <TableHead>USER</TableHead>
                      <TableHead>CONTACT</TableHead>
                      <TableHead>ROLE</TableHead>
                      <TableHead>STATUS</TableHead>
                      <TableHead>AUTH PROVIDER</TableHead>
                      <TableHead>CREATED</TableHead>
                      <TableHead className="text-right">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user, index) => (
                      <TableRow key={user._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex  items-center">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                                {user.fName.charAt(0).toUpperCase()}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.fName} {user.lName}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                {user.emailVerified ? (
                                  <UserCheck className="h-3 w-3 text-green-500" />
                                ) : (
                                  <UserX className="h-3 w-3 text-red-500" />
                                )}
                                {user.emailVerified ? "Verified" : "Unverified"}
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <Mail className="h-3 w-3 text-gray-400" />
                            {user.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Phone className="h-3 w-3 text-gray-400" />
                            {user.phone}
                          </div>
                        </TableCell>

                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>
                          <StatusBadge status={user.status} />
                        </TableCell>
                        <TableCell>
                          {user.authProvider.charAt(0).toUpperCase() +
                            user.authProvider.slice(1)}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            {formatDate(user.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            {/* View button */}
                            <Button
                              className="text-blue-600  hover:text-blue-900"
                              variant="ghost"
                              title="View Details"
                              onClick={() => handleViewUser(user)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {/* edit button */}
                            <Button
                              className="text-green-600  hover:text-green-900"
                              variant="ghost"
                              title="Edit User"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <ConfirmDelete
                              onDelete={() =>
                                dispatch(deleteUserAction(user._id))
                              }
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* show no users found */}
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <UserX className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No users found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Details Dialog */}
        <UserDetailsDialogue
          isOpen={isViewDialogOpen}
          onOpenChange={setIsViewDialogOpen}
          selectedUser={selectedUser}
        />

        {/* Create/Edit User Dialog */}
        <CreateOrEditUserDialogue
          isOpen={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          userId={selectedUser?._id || null}
          userData={selectedUser}
          onSave={handleSaveUser}
        />
      </div>
    </div>
  );
};

export default UsersPage;
