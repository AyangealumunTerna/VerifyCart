// import { useNavigate } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

export default function WaitingForDelivery() {
  const navigate = useNavigate();
  const { escrowId } = useParams();

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6 text-center space-y-5">
        <h1 className="text-xl font-bold text-gray-900">Vendor Confirmed 🎉</h1>

        <p className="text-sm text-gray-600">
          The vendor has accepted escrow and is preparing your order.
        </p>

        <div className="text-green-600 font-medium">
          🚚 Waiting for delivery…
        </div>

        <p className="text-xs text-gray-400">
          Funds will be released only after you confirm delivery.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3 pt-4">
          <button
            onClick={() => navigate(`/confirm-delivery/${escrowId}`)}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            ✅ Confirm Delivery
          </button>

          <button
            onClick={() => navigate("/raise-issue")}
            className="w-full border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition"
          >
            ⚠️ Raise an Issue
          </button>
        </div>
      </div>
    </div>
  );
}
