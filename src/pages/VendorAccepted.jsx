import { useLocation, useNavigate } from "react-router-dom";

export default function BuyerVendorAccepted() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { escrowId, items = [] } = state || {};

  if (!escrowId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-600">
        Invalid escrow session.
      </div>
    );
  }

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6 space-y-6 text-center">

        {/* STATUS */}
        <span className="inline-block text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
          Vendor Accepted
        </span>

        <h1 className="text-xl font-bold text-gray-900">
          You’re Clear to Proceed 🎉
        </h1>

        <p className="text-sm text-gray-600">
          The vendor has accepted your secure transaction and provided payout
          details. You can now fund the escrow safely.
        </p>

        {/* SUMMARY */}
        <div className="bg-green-50 border border-green-200 rounded-md p-4 text-sm text-green-900 text-left space-y-2">
          <p className="font-semibold">Transaction Summary</p>

          <p>
            <span className="font-medium">Escrow ID:</span>{" "}
            <span className="font-mono">{escrowId}</span>
          </p>

          <p>
            <span className="font-medium">Items:</span>{" "}
            {items.length} item{items.length > 1 ? "s" : ""}
          </p>

          <p>
            <span className="font-medium">Total Amount:</span>{" "}
            ₦{total.toLocaleString()}
          </p>

          <p className="text-xs text-green-700 pt-1">
            Vendor cannot access funds until you confirm delivery.
          </p>
        </div>

        {/* HOW IT WORKS */}
        <div className="bg-white border rounded-md p-4 text-left text-sm text-gray-700 space-y-2">
          <p className="font-semibold text-gray-800">What happens next?</p>
          <ul className="list-disc list-inside space-y-1">
            <li>You fund the escrow</li>
            <li>Vendor ships your items</li>
            <li>You confirm delivery</li>
            <li>Funds are released automatically</li>
          </ul>
        </div>

        {/* CTA */}
        <button
          onClick={() =>
            navigate("/fund-escrow", {
              state: {
                escrowId,
                items,
              },
            })
          }
          className="w-full py-3 rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
        >
          Proceed to Secure Payment
        </button>

        {/* FOOTER */}
        <p className="text-xs text-gray-400 leading-relaxed">
          🛡️ Never pay vendors directly. All payments stay protected inside
          VerifyCart escrow until delivery is confirmed.
        </p>
      </div>
    </div>
  );
}
