import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function VendorEscrow() {
  const { escrowId } = useParams();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  const confirmEscrow = () => {
    setConfirmed(true);

    setTimeout(() => {
      navigate(`/delivery-details/${escrowId}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6 space-y-5">

        <div className="text-center">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full mb-2">
            Escrow Pending
          </span>

          <h1 className="text-xl font-bold text-gray-900">
            Escrow Payment Request
          </h1>

          <p className="text-sm text-gray-600 mt-1">
            A buyer wants to complete this transaction securely using VerifyCart.
          </p>
        </div>

        <div className="bg-gray-50 border rounded-md p-4 text-sm text-gray-700 space-y-1">
          <p>
            <span className="font-medium">Escrow ID:</span>{" "}
            <span className="font-mono">{escrowId}</span>
          </p>
          <p>
            <span className="font-medium">Funds Status:</span> Locked & secure
          </p>
        </div>

        {!confirmed ? (
          <button
            onClick={confirmEscrow}
            className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium"
          >
            Confirm & Accept Escrow
          </button>
        ) : (
          <p className="text-sm text-green-600 font-medium text-center">
            ✅ Escrow confirmed. Redirecting…
          </p>
        )}

        <p className="text-xs text-gray-400 text-center leading-relaxed">
          By confirming, you agree to ship the items once delivery details are
          provided. Funds will be released only after successful delivery.
        </p>
      </div>
    </div>
  );
}
