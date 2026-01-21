import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VendorDeliveryView() {
  const { escrowId } = useParams();
  const [delivery, setDelivery] = useState(null);
  const [shipped, setShipped] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`delivery_${escrowId}`);
    if (stored) {
      setDelivery(JSON.parse(stored));
    }
  }, [escrowId]);

  const markAsShipped = () => {
    setShipped(true);

    // Later → backend update
    localStorage.setItem(
      `shipment_${escrowId}`,
      JSON.stringify({
        escrowId,
        shippedAt: new Date().toISOString(),
      })
    );
  };

  if (!delivery) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        No delivery details found for this escrow.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 space-y-5">

        {/* Header */}
        <div className="text-center">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full mb-2">
            Escrow Active
          </span>

          <h1 className="text-xl font-bold text-gray-900">
            Delivery Information
          </h1>

          <p className="text-sm text-gray-600 mt-1">
            Deliver exactly as provided below.
          </p>
        </div>

        {/* Escrow ID */}
        <div className="bg-gray-50 border rounded-md p-3 text-sm">
          <span className="font-medium">Escrow ID:</span>{" "}
          <span className="font-mono">{escrowId}</span>
        </div>

        {/* DETAILS */}
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-500">Recipient Name</p>
            <p className="font-medium">{delivery.fullName}</p>
          </div>

          <div>
            <p className="text-gray-500">Phone Number</p>
            <p className="font-medium">{delivery.phone}</p>
          </div>

          <div>
            <p className="text-gray-500">Delivery Address</p>
            <p className="font-medium whitespace-pre-line">
              {delivery.address}
            </p>
          </div>

          {delivery.note && (
            <div>
              <p className="text-gray-500">Delivery Notes</p>
              <p className="font-medium whitespace-pre-line">
                {delivery.note}
              </p>
            </div>
          )}
        </div>

        {/* ACTION */}
        {!shipped ? (
          <button
            onClick={markAsShipped}
            className="w-full bg-green-600 text-white py-3 rounded-md font-medium"
          >
            Mark as Shipped
          </button>
        ) : (
          <p className="text-center text-green-600 text-sm font-medium">
            🚚 Shipment marked. Awaiting buyer confirmation.
          </p>
        )}

        <p className="text-xs text-gray-400 text-center">
          Funds will be released only after buyer confirms delivery.
        </p>
      </div>
    </div>
  );
}
