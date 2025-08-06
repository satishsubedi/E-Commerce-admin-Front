import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Check,
  X,
  Search,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  ArrowUpDown,
} from "lucide-react";
import StatsCard from "../../components/helper/StatsCard";
import FilterSelect from "../../components/helper/FilterSelect";
import StatusBadge from "../../components/helper/StatusBadge";
import ReviewDetailModal from "./ReviewDetailModal";
import formatDate from "../../utils/FormatDate";
import renderStars from "../../utils/RenderStars";
import { getAllReviews, updateReviewStatus } from "../../axios/reviewAxios";
import useLoading from "../../hooks/useLoading";
import { toast } from "react-toastify";
import PageLoadingSpinner from "../../components/helper/PageLoadingSpinner";

const AdminReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const { isLoading, startLoading, stopLoading } = useLoading(); //loading from custom hook

  const [selectedReview, setSelectedReview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // Get all reviews
  useEffect(() => {
    const fetchReviews = async () => {
      startLoading();

      try {
        const response = await getAllReviews();
        if (response.status === "error") {
          toast.error(response.message || "Error fetching reviews");
        }
        setReviews(response.payload || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error("Failed to fetch reviews");
      } finally {
        stopLoading();
      }
    };
    fetchReviews();
  }, []);

  const handleApprove = async (reviewId) => {
    try {
      const response = await updateReviewStatus(reviewId, "approved");
      if (response.status === "success") {
        setReviews(
          reviews.map((review) =>
            review._id === reviewId
              ? {
                  ...review,
                  status: "approved",
                }
              : review
          )
        );
        toast.success("Review has been approved!!");
      } else {
        toast.error(response.message || "Failed to approve review");
      }
    } catch (error) {
      console.error("Error approving review:", error);
      toast.error("Failed to approve review");
    }
  };

  const handleReject = async (reviewId) => {
    try {
      const response = await updateReviewStatus(reviewId, "rejected");
      if (response.status === "success") {
        setReviews(
          reviews.map((review) =>
            review._id === reviewId
              ? {
                  ...review,
                  status: "rejected",
                }
              : review
          )
        );
        toast.success("Review has been rejected!!");
      } else {
        toast.error(response.message || "Failed to reject review");
      }
    } catch (error) {
      console.error("Error rejecting review:", error);
      toast.error("Failed to reject review");
    }
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "newest" ? "oldest" : "newest");
  };

  // Filter and sort reviews based on search, status, rating, and sort order
  const filteredReviews = reviews
    .filter((review) => {
      const matchesSearch =
        review.productId?.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        review.userId.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || review.status === statusFilter;
      const matchesRating =
        ratingFilter === "all" || review.rating.toString() === ratingFilter;

      return matchesSearch && matchesStatus && matchesRating;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PageLoadingSpinner pageName={"reviews"} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 ">
      <div className=" max-w-7xl mx-auto space-y-6">
        <header className="flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Review Management
            </h1>
            <p className="text-sm text-gray-600">
              Manage and moderate customer reviews
            </p>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <StatsCard
            label="Pending Reviews"
            value={reviews.filter((r) => r.status === "pending").length}
            icon={Clock}
            color="text-yellow-600"
            bgColor="bg-yellow-100"
          />
          <StatsCard
            label="Approved Reviews"
            value={reviews.filter((r) => r.status === "approved").length}
            icon={CheckCircle}
            color="text-green-600"
            bgColor="bg-green-100"
          />
          <StatsCard
            label="Rejected Reviews"
            value={reviews.filter((r) => r.status === "rejected").length}
            icon={XCircle}
            color="text-red-600"
            bgColor="bg-red-100"
          />
        </div>

        {/* Reviews Table */}
        <Card>
          <CardHeader>
            <CardTitle>Reviews ({filteredReviews.length})</CardTitle>
            <CardDescription className="flex items-center justify-between">
              Review and moderate customer feedback
              <div>
                <Button
                  variant="outline"
                  className="text-sm text-blue-600 hover:bg-blue-50"
                  onClick={handleSortToggle}
                >
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  {sortOrder === "newest" ? "Newest First" : "Oldest First"}
                </Button>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by product, user, or title..."
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
                    { value: "pending", label: "Pending" },
                    { value: "approved", label: "Approved" },
                    { value: "rejected", label: "Rejected" },
                  ]}
                />

                {/* Filter rating */}
                <FilterSelect
                  value={ratingFilter}
                  onValueChange={setRatingFilter}
                  placeholder="Filter by rating"
                  options={[
                    { value: "all", label: "All Ratings" },
                    { value: "5", label: "5 Stars" },
                    { value: "4", label: "4 Stars" },
                    { value: "3", label: "3 Stars" },
                    { value: "2", label: "2 Stars" },
                    { value: "1", label: "1 Star" },
                  ]}
                />
              </div>

              {/* review table */}
              <div className="rounded-md overflow-hidden border">
                <div className="max-h-[550px] overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>PRODUCT</TableHead>
                        <TableHead>CUSTOMER</TableHead>
                        <TableHead>REVIEW</TableHead>
                        <TableHead>RATING</TableHead>
                        <TableHead>STATUS</TableHead>
                        <TableHead>DATE</TableHead>
                        <TableHead className="text-right">ACTIONS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReviews.map((review) => (
                        <TableRow key={review._id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={
                                  review.productId.thumbnail ||
                                  "/placeholder.svg"
                                }
                                alt={review.productId.title}
                                className="w-12 h-12 rounded-md object-cover"
                              />
                              <div>
                                <div className="font-medium">
                                  {review.productId.title}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarImage
                                  src={
                                    review.userId.profilePicture ||
                                    "/placeholder.svg"
                                  }
                                  alt={`${review.userId.fName} ${review.userId.lName}`}
                                />
                                <AvatarFallback>
                                  {`${
                                    review.userId.fName?.[0].toUpperCase() || ""
                                  }${
                                    review.userId.lName?.[0].toUpperCase() || ""
                                  }`}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm">
                                  {review.userId.fName} {review.userId.lName}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {review.userId.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[300px]">
                            <div className="space-y-1">
                              <div className="font-medium text-sm">
                                {review.reviewTitle}
                              </div>
                              <div className="text-sm text-muted-foreground line-clamp-2">
                                {review.comment}
                              </div>
                              <div className="flex gap-2 text-xs">
                                <span className="bg-muted px-2 py-1 rounded">
                                  Fit: {review.productFitting}
                                </span>
                                <span className="bg-muted px-2 py-1 rounded">
                                  Comfort: {review.productComforatability}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                              <span className="ml-1 text-sm font-medium">
                                {review.rating}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={review.status} type="review" />
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {formatDate(review.createdAt)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                title="View Details"
                                onClick={() => setSelectedReview(review)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {review.status === "pending" && (
                                <>
                                  <Button
                                    variant="outline"
                                    title="Approve"
                                    onClick={() => handleApprove(review._id)}
                                    className="text-green-600 border-green-600 hover:bg-green-50 text-sm"
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    title="Reject"
                                    onClick={() => handleReject(review._id)}
                                    className="text-red-600 border-red-600 hover:bg-red-50 text-sm"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {filteredReviews.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-600">
                    No reviews found matching your criteria.
                  </p>
                </div>
              )}
            </>
          </CardContent>
        </Card>

        {/* Review Detail Modal */}
        <ReviewDetailModal
          selectedReview={selectedReview}
          onClose={() => setSelectedReview(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
  );
};

export default AdminReviewPage;
