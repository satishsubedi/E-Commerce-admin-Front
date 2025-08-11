import React, { useState } from "react";
import axios from "axios";

const OrderDetailsWithNotes = ({ order }) => {
  const [notes, setNotes] = useState(
    order.items.reduce((acc, item) => {
      acc[item.productId._id] = item.note || "";
      return acc;
    }, {})
  );
  const [loading, setLoading] = useState(null); // productId currently processing

  // Handle note input
  const handleNoteChange = (productId, value) => {
    setNotes({ ...notes, [productId]: value });
  };

  // Save note for a specific product
  const saveNote = async (productId) => {
    try {
      setLoading(productId);
      await axios.post(`/api/orders/${order._id}/notes`, {
        productId,
        note: notes[productId],
      });
      alert("Note saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save note");
    } finally {
      setLoading(null);
    }
  };

  // Send email related to a product
  const sendEmail = async (productId) => {
    try {
      setLoading(productId);
      await axios.post(`/api/orders/${order._id}/send-product-email`, {
        productId,
        note: notes[productId],
      });
      alert("Email sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send email");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      {/* Order Info */}
      <div className="mb-6">
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Customer:</strong> {order.customerName}
        </p>
        <p>
          <strong>Email:</strong> {order.customerEmail}
        </p>
        <p>
          <strong>Phone:</strong> {order.customerPhone}
        </p>
      </div>

      {/* Items */}
      <h3 className="text-xl font-semibold mb-2">Items</h3>
      <div className="space-y-4">
        {order.items.map((item) => (
          <div
            key={item.productId._id}
            className="p-3 border rounded-md bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.productId.imageUrl}
                alt={item.productId.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.productId.title}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
              </div>
            </div>

            {/* Note Input */}
            <textarea
              className="mt-3 w-full p-2 border rounded"
              placeholder="Add note for this product..."
              value={notes[item.productId._id]}
              onChange={(e) =>
                handleNoteChange(item.productId._id, e.target.value)
              }
            />

            {/* Buttons */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => saveNote(item.productId._id)}
                disabled={loading === item.productId._id}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading === item.productId._id ? "Saving..." : "Save Note"}
              </button>

              <button
                onClick={() => sendEmail(item.productId._id)}
                disabled={loading === item.productId._id}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 disabled:opacity-50"
              >
                {loading === item.productId._id ? "Sending..." : "Send Email"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsWithNotes;
