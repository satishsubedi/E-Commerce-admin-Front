import { Button } from "../../components/ui/button";
import {
  Calendar,
  DollarSign,
  Edit,
  Percent,
  Plus,
  Tag,
  Ticket,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import StatsCard from "../../components/helper/StatsCard";
import StatusBadge from "../../components/helper/StatusBadge";
import formatDate from "../../utils/FormatDate";
import CreateOrEditCouponDialogue from "./CreateOrEditCouponDialogue";
import { useEffect, useState } from "react";
import {
  deleteCoupon,
  getAllCoupons,
  updateCoupon,
} from "../../axios/couponAxios";
import { toast } from "react-toastify";
import ConfirmDelete from "../../components/helper/ConfirmDelete";

const CouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  // Fetch coupons
  const fetchCoupons = async () => {
    try {
      const response = await getAllCoupons();

      if (response?.status === "error") {
        toast.error(response.message || "Error fetching coupons");
        return;
      }
      // Process coupons to update expired status
      const processedCoupons = (response.payload || []).map((coupon) => {
        const now = new Date();
        const expiryDate = new Date(coupon.expiryDate);

        // If coupon is expired but status isn't "expired", mark it as expired
        if (expiryDate < now && coupon.status !== "expired") {
          return { ...coupon, status: "expired" };
        }

        return coupon;
      });
      setCoupons(processedCoupons);
    } catch (error) {
      console.error("error while fetching coupons!!", error);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  //toggle status
  const toggleCouponStatus = async (couponId) => {
    try {
      const coupon = coupons.find((c) => c._id === couponId);
      if (!coupon) {
        toast.error("Coupon not found!");
        return;
      }

      const newStatus = coupon.status === "active" ? "inactive" : "active";
      const response = await updateCoupon(couponId, { status: newStatus });

      if (response?.status === "error") {
        toast.error(response.message || "Failed to update coupon status!");
        return;
      }

      toast.success(
        `Coupon ${newStatus === "active" ? "activated" : "deactivated"}!`
      );
      fetchCoupons();
    } catch (error) {
      console.error("Toggle coupon status error:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update status"
      );
    }
  };

  //delete coupon
  const handleDeleteCoupon = async (couponId) => {
    try {
      const response = await deleteCoupon(couponId);
      if (response?.status === "error") {
        toast.error(response.message || "Failed to delete coupon!");
        return;
      }
      toast.success("Coupon deleted successfully!");
      fetchCoupons();
    } catch (error) {
      console.error("Delete coupon error:", error);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  return (
    <div className="min-h-screen p-6 bg-gray-50 ">
      <div className=" max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ticket className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Coupen Management
              </h1>
              <p className="text-sm text-gray-600">
                Create and manage discount coupons for your store
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              setEditingCoupon(null);
              setIsCreateDialogOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 " />
            Create Coupon
          </Button>
        </header>

        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 ">
            <StatsCard
              label=" Total Coupons"
              value={coupons.length}
              icon={Tag}
              color="text-blue-900"
              bgColor="bg-blue-100"
            />
            <StatsCard
              label="Active Coupons"
              value={
                coupons?.filter((coupon) => coupon.status === "active").length
              }
              icon={ToggleRight}
              color="text-green-900"
              bgColor="bg-green-100"
            />
            <StatsCard
              label="Inactive Users"
              value={
                coupons?.filter((coupon) => coupon.status === "expired").length
              }
              icon={Calendar}
              color="text-red-900"
              bgColor="bg-red-100"
            />
            <StatsCard
              label="  Total Usage"
              value={coupons?.reduce(
                (sum, coupon) => sum + coupon.usedCount,
                0
              )}
              icon={DollarSign}
              color="text-purple-900"
              bgColor="bg-purple-100"
            />
          </div>
          {/* Users details */}
          <Card>
            <CardHeader>
              <CardTitle>Coupon List({coupons.length})</CardTitle>
              <CardDescription>
                Manage and moderate user accounts
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Users Table */}
              <div className="rounded-md overflow-hidden border">
                <div className="max-h-[400px] overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="px-6 py-4 text-left text-xs font-medium tracking-wider">
                        <TableHead>SN</TableHead>
                        <TableHead>CODE</TableHead>

                        <TableHead>VALUE</TableHead>
                        <TableHead>CREATE DATE</TableHead>
                        <TableHead>EXPIRY DATE</TableHead>
                        <TableHead>USUAGE</TableHead>
                        <TableHead>STATUS</TableHead>
                        <TableHead className="text-right">ACTIONS</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody className="font-medium text-gray-900">
                      {coupons.map((coupon, index) => (
                        <TableRow key={coupon._id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{coupon.code}</TableCell>
                          <TableCell>{coupon.value}%</TableCell>
                          <TableCell>{formatDate(coupon.createdAt)}</TableCell>
                          <TableCell>{formatDate(coupon.expiryDate)}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <span className="font-medium">
                                {coupon.usedCount}
                              </span>
                              <span className="text-gray-500">
                                / {coupon.usageLimit}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{
                                  width: `${
                                    (coupon.usedCount / coupon.usageLimit) * 100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </TableCell>

                          <TableCell>
                            <StatusBadge status={coupon.status} />
                          </TableCell>
                          <TableCell className="text-right space-x-2 ">
                            <Button
                              variant="outline"
                              title="Edit"
                              onClick={() => {
                                setEditingCoupon(coupon);
                                setIsCreateDialogOpen(true);
                              }}
                            >
                              <Edit className="w-4 h-4 text-green-500 " />
                            </Button>
                            {coupon.status !== "expired" && (
                              <Button
                                variant="outline"
                                title="Toggle Status"
                                onClick={() => toggleCouponStatus(coupon._id)}
                              >
                                {coupon.status === "active" ? (
                                  <ToggleRight className="h-4 w-4 text-green-500" />
                                ) : (
                                  <ToggleLeft className="h-4 w-4 text-gray-500" />
                                )}
                              </Button>
                            )}

                            {/* detele button */}
                            <ConfirmDelete
                              onDelete={() => handleDeleteCoupon(coupon._id)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {coupons.length === 0 && (
                <div className="text-center py-10">
                  <h2 className="text-sm text-gray-600">No Coupons Found</h2>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingCoupon(null);
                      setIsCreateDialogOpen(true);
                    }}
                    className="mt-4 hover:bg-blue-600 hover:text-white"
                  >
                    Create New Coupon
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <CreateOrEditCouponDialogue
            isCreateDialogOpen={isCreateDialogOpen}
            setIsCreateDialogOpen={setIsCreateDialogOpen}
            editingCoupon={editingCoupon}
            setEditingCoupon={setEditingCoupon}
            fetchCoupons={fetchCoupons}
          />
        </main>
      </div>
    </div>
  );
};

export default CouponsPage;
