import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import getCustomerName from "../../utils/GetCustomerName";
import formatDate from "../../utils/FormatDate";

export default function OrderDetailsDialog({
  isOpen,
  onOpenChange,
  order,
  notes,
  setNotes,
  sendEmail,
  sendingEmail,
  addNote,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            Review the order details, add notes, and send an update email.
          </DialogDescription>
        </DialogHeader>

        {order && (
          <div className="space-y-4">
            {/* Order Info */}
            <div className="bg-gray-50 p-4 rounded-lg ml-1">
              <p>
                <strong>Order ID:</strong> #{order._id.slice(-6)}
              </p>
              <p>
                <strong>Order Date:</strong>
                {formatDate(order?.createdAt)}
              </p>
              <p>
                <strong>Customer:</strong> {getCustomerName(order)}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {order.guestInfo?.email || order.buyer?.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                {order.guestInfo?.phoneNumber || order.buyer?.phone || "N/A"}
              </p>
              <p>
                <strong>Address:</strong>
                <span className="ml-1">{order.shippingAddresses?.street},</span>
                <span className="ml-1">{order.shippingAddresses?.city}</span>
                <span className="ml-1">{order.shippingAddresses?.zip}</span>
                <span className="ml-1">{order.shippingAddresses?.state}</span>
                <span className="ml-1">{order.shippingAddresses?.country}</span>
              </p>
            </div>

            {/* Products */}
            <div>
              <h3 className="font-semibold mb-2">Products:</h3>
              <div className="space-y-3">
                {order.items?.map((item, idx) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg shadow-sm"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item?.productId?.thumbnail || "/placeholder.png"}
                      alt={item.productId?.title || "Product"}
                      className="w-16 h-16 object-cover rounded border"
                    />

                    {/* Product Info */}
                    <div className="flex-1">
                      <p className="font-medium">{item.productId?.title}</p>
                      <p className="text-sm text-gray-500">
                        SKU: {item.productId?._id.slice(-20)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity:{" "}
                        <span className="font-semibold">{item?.quantity}</span>
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-semibold">${item.price}</p>
                      <p className="text-xs text-gray-500">
                        Total: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block font-semibold mb-1">Add Notes</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write notes about this order..."
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button onClick={addNote}>Add Note</Button>
          <Button
            onClick={sendEmail}
            disabled={sendingEmail}
            className="bg-green-600"
          >
            {sendingEmail ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                Sending...
              </span>
            ) : (
              "Send Email"
            )}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
