import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmDelivery() {
  const navigate = useNavigate();

  // Simulated states (replace with backend later)
  const [confirmed, setConfirmed] = useState(false);
  const [issueRaised] = useState(false); // set to true when issue exists

  const handleConfirm = () => {
    if (issueRaised) return;

    if (!confirmed) {
      alert("Please confirm that you received the item.");
      return;
    }

    // 🔐 Later: API call to release escrow funds
    alert("Delivery confirmed. Funds released to vendor.");

    // 🔁 Redirect back to landing page
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6 space-y-5">

        <h1 className="text-xl font-bold text-gray-900 text-center">
          Confirm Delivery 📦
        </h1>

        <p className="text-sm text-gray-600 text-center">
          Confirming delivery will release funds to the vendor.
        </p>

        {/* ISSUE WARNING */}
        {issueRaised && (
          <div className="bg-red-50 border border-red-300 text-red-700 text-xs p-3 rounded">
            🚫 An issue has already been raised for this transaction.
            Delivery confirmation is disabled until resolved.
          </div>
        )}

        {/* CONFIRM WARNING */}
        {!issueRaised && (
          <div className="bg-yellow-50 border border-yellow-300 text-yellow-700 text-xs p-3 rounded">
            ⚠️ This action cannot be undone.
          </div>
        )}

        {/* CHECKBOX */}
        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            disabled={issueRaised}
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-1"
          />
          <span>
            I confirm that I have received this item as described and in good condition.
          </span>
        </label>

        {/* CONFIRM BUTTON */}
        <button
          onClick={handleConfirm}
          disabled={!confirmed || issueRaised}
          className={`w-full py-2 rounded-lg transition
            ${
              !issueRaised && confirmed
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          Confirm & Release Funds
        </button>

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="w-full text-sm text-gray-500 hover:underline"
        >
          Go back
        </button>

      </div>
    </div>
  );
}
