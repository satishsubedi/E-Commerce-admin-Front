import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X } from "lucide-react";
import StatusBadge from "../../components/helper/StatusBadge";
import renderStars from "../../utils/RenderStars";

const ReviewDetailModal = ({
  selectedReview,
  onClose,
  onApprove,
  onReject,
}) => {
  if (!selectedReview) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Review Details</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Product Info */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <img
              src={selectedReview.productId.thumbnail || "/placeholder.svg"}
              alt={selectedReview.productId.title}
              className="w-16 h-16 rounded-md object-cover"
            />
            <div>
              <h3 className="font-semibold">
                {selectedReview.productId.title}
              </h3>
            </div>
          </div>

          {/* Customer Info */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={selectedReview.userId.profilePicture || "/placeholder.svg"}
                alt={`${selectedReview.userId.fName} ${selectedReview.userId.lName}`}
              />
              <AvatarFallback>
                {`${selectedReview.userId.fName?.[0].toUpperCase() || ""}${
                  selectedReview.userId.lName?.[0].toUpperCase() || ""
                }`}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{selectedReview.userId.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedReview.userId.email}
              </p>
            </div>
          </div>

          {/* Review Content */}
          <div className="space-y-4">
            <div>
              <Label>Review Title</Label>
              <p className="font-medium">{selectedReview.reviewTitle}</p>
            </div>

            <div>
              <Label>Rating</Label>
              <div className="flex items-center gap-2">
                {renderStars(selectedReview.rating)}
                <span className="font-medium">
                  {selectedReview.rating} out of 5
                </span>
              </div>
            </div>

            <div>
              <Label>Comment</Label>
              <p className="text-sm leading-relaxed">
                {selectedReview.comment}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Product Fitting</Label>
                <p className="font-medium">{selectedReview.productFitting}</p>
              </div>
              <div>
                <Label>Comfort Level</Label>
                <p className="font-medium">
                  {selectedReview.productComforatability}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Status</Label>
                <div className="mt-1">
                  <StatusBadge status={selectedReview.status} type="review" />
                </div>
              </div>
              <div className="text-right">
                <Label>Submitted</Label>
                <p className="text-sm">
                  {new Date(selectedReview.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          {selectedReview.status === "pending" && (
            <div className="flex gap-2 pt-4 border-t">
              <Button
                onClick={() => {
                  onApprove(selectedReview._id);
                  onClose();
                }}
                className="flex-1"
              >
                <Check className="w-4 h-4 mr-2" />
                Approve Review
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onReject(selectedReview._id);
                  onClose();
                }}
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                Reject Review
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewDetailModal;
