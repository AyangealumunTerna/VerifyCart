import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function VendorEscrow() {
  const { escrowId } = useParams();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  const confirmEscrow = () => {
    setConfirmed(true);

    setTimeout(() => {
      navigate("/waiting-for-delivery");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6 text-center space-y-5">

        <h1 className="text-xl font-bold text-gray-900">
          Escrow Payment Request
        </h1>

        <p className="text-sm text-gray-600">
          A buyer wants to transact securely using VerifyCart escrow.
        </p>

        <div className="bg-gray-50 border rounded-md p-3 text-sm text-gray-700">
          Escrow ID: <span className="font-mono">{escrowId}</span>
        </div>

        {!confirmed ? (
          <button
            onClick={confirmEscrow}
            className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium"
          >
            Confirm & Accept Escrow
          </button>
        ) : (
          <p className="text-sm text-green-600 font-medium">
            ✅ Escrow confirmed. Redirecting…
          </p>
        )}

        <p className="text-xs text-gray-400 leading-relaxed">
          Funds will be released only after buyer confirms successful delivery.
        </p>
      </div>
    </div>
  );
}
