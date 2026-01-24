import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VendorDeliveryView() {
  const { escrowId } = useParams();
  const [escrow, setEscrow] = useState(null);
  const [shipped, setShipped] = useState(false);
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`escrow-${escrowId}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      setEscrow(parsed);

      if (parsed.status === "SHIPPED") {
        setShipped(true);
      }
    }
  }, [escrowId]);

  if (!escrow) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Escrow not found.
      </div>
    );
  }

  const { buyerDeliveryDetails, items, expectedDeliveryDays } = escrow;

  const markAsShipped = () => {
    setProcessing(true);

    const updated = {
      ...escrow,
      status: "SHIPPED",
      shippedAt: new Date().toISOString(),
    };

    localStorage.setItem(`escrow-${escrowId}`, JSON.stringify(updated));
    setShipped(true);

    // ⏳ simulate backend processing
    setTimeout(() => {
      navigate(`/waiting-for-delivery/${escrowId}`);
    }, 3000); // 3 seconds
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">
        {/* HEADER */}
        <div className="text-center">
          <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-2">
            Escrow Funded
          </span>

          <h1 className="text-xl font-bold text-gray-900">
            Prepare Order for Delivery
          </h1>

          <p className="text-sm text-gray-600">
            Buyer has funded escrow. Ship according to details below.
          </p>
        </div>

        {/* ESCROW ID */}
        <div className="bg-gray-50 border rounded-md p-3 text-sm">
          <span className="font-medium">Escrow ID:</span>{" "}
          <span className="font-mono">{escrowId}</span>
        </div>

        {/* ITEMS */}
        <div className="border rounded-md p-4 text-sm space-y-2">
          <p className="font-semibold text-gray-800">Items</p>

          {items.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-1">
              <span>{item.name}</span>
              <span>₦{item.price.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* DELIVERY DETAILS */}
        <div className="border rounded-md p-4 text-sm space-y-3">
          <p className="font-semibold text-gray-800">Delivery Information</p>

          <div>
            <p className="text-gray-500">Recipient</p>
            <p className="font-medium">{buyerDeliveryDetails.fullName}</p>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-medium">{buyerDeliveryDetails.phone}</p>
          </div>

          <div>
            <p className="text-gray-500">Address</p>
            <p className="font-medium whitespace-pre-line">
              {buyerDeliveryDetails.address}
            </p>
          </div>

          {buyerDeliveryDetails.notes && (
            <div>
              <p className="text-gray-500">Notes</p>
              <p className="font-medium whitespace-pre-line">
                {buyerDeliveryDetails.notes}
              </p>
            </div>
          )}
        </div>

        {/* DELIVERY EXPECTATION */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-md p-3 text-sm">
          <p className="font-medium text-indigo-900">
            Expected delivery timeline
          </p>
          <p className="text-indigo-700">
            Buyer expects delivery within{" "}
            <strong>{expectedDeliveryDays} days</strong>
          </p>
        </div>

        {/* ACTION */}
        {!shipped ? (
          <button
            onClick={markAsShipped}
            disabled={processing}
            className={`w-full py-3 rounded-md font-medium text-white transition ${
              processing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {processing ? "Notifying buyer..." : "Mark as Shipped"}
          </button>
        ) : (
          <p className="text-center text-green-600 text-sm font-medium">
            🚚 Shipment marked. Redirecting buyer for confirmation...
          </p>
        )}

        <p className="text-xs text-gray-400 text-center">
          Funds are released only after buyer confirms delivery.
        </p>
      </div>
    </div>
  );
}
