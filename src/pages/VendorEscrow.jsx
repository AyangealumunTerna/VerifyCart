import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
import { useEffect, useState } from "react";

export default function VendorEscrow() {
  const [escrow, setEscrow] = useState(null);
  const { escrowId } = useParams();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [vendorBank, setVendorBank] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
  });

  const isBankValid =
    vendorBank.bankName &&
    vendorBank.accountNumber.length >= 10 &&
    vendorBank.accountName;

  const confirmEscrow = () => {
    const updatedEscrow = {
      ...escrow,
      vendorBankDetails: vendorBank,
      vendorConfirmedAt: new Date().toISOString(),
      status: "VENDOR_CONFIRMED",
    };

    // 🔒 Save updated escrow
    localStorage.setItem(`escrow-${escrowId}`, JSON.stringify(updatedEscrow));

    setConfirmed(true);

    setTimeout(() => {
      navigate(`/delivery-details/${escrowId}`);
    }, 1500);
  };

  useEffect(() => {
    const storedEscrow = localStorage.getItem(`escrow-${escrowId}`);
    if (storedEscrow) {
      const parsed = JSON.parse(storedEscrow);
      setEscrow(parsed);

      if (parsed.status === "VENDOR_CONFIRMED") {
        setConfirmed(true);
        setVendorBank(parsed.vendorBankDetails);
      }
    }
  }, [escrowId]);
  if (!escrow) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6 space-y-5">
        <div className="text-center">
          <span
            className={`inline-block text-xs px-3 py-1 rounded-full mb-2 ${
              confirmed
                ? "bg-green-100 text-green-700"
                : "bg-indigo-100 text-indigo-700"
            }`}
          >
            {confirmed ? "Escrow Accepted" : "Escrow Pending"}
          </span>

          <h1 className="text-xl font-bold text-gray-900">
            Escrow Payment Request
          </h1>

          <p className="text-sm text-gray-600 mt-1">
            A buyer wants to complete this transaction securely using
            VerifyCart.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-md p-4 text-sm text-green-800 space-y-1">
          <p className="font-semibold">Buyer Payment Summary</p>

          <p>
            <span className="font-medium">Buyer Status:</span>{" "}
            <span className="text-green-700">✅ Payment Initiated</span>
          </p>

          <p>
            <span className="font-medium">Amount:</span> ₦
            {escrow.totalPayable?.toLocaleString()}
          </p>

          <p>
            <span className="font-medium">Escrow ID:</span>{" "}
            <span className="font-mono">{escrowId}</span>
          </p>

          <p>
            <span className="font-medium">Date:</span>{" "}
            {new Date(escrow.createdAt).toLocaleDateString()}
          </p>

          <p className="text-xs text-green-700 pt-1">
            Status: Awaiting vendor confirmation before shipping.
          </p>
        </div>

        {/* <div className="bg-gray-50 border rounded-md p-4 text-sm text-gray-700 space-y-1">
          <p>
            <span className="font-medium">Escrow ID:</span>{" "}
            <span className="font-mono">{escrowId}</span>
          </p>
          <p>
            <span className="font-medium">Funds Status:</span> Locked in escrow (pending vendor confirmation)
          </p>
        </div> */}

        <div className="bg-white border rounded-md p-4 space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">
            Payout Bank Details
          </h2>

          <input
            type="text"
            placeholder="Bank Name"
            disabled={confirmed}
            value={vendorBank.bankName}
            onChange={(e) =>
              setVendorBank({ ...vendorBank, bankName: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-md text-sm disabled:bg-gray-100"
          />

          <input
            type="text"
            inputMode="numeric"
            placeholder="Account Number"
            disabled={confirmed}
            value={vendorBank.accountNumber}
            onChange={(e) =>
              setVendorBank({ ...vendorBank, accountNumber: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-md text-sm disabled:bg-gray-100"
          />

          <input
            type="text"
            placeholder="Account Name"
            disabled={confirmed}
            value={vendorBank.accountName}
            onChange={(e) =>
              setVendorBank({ ...vendorBank, accountName: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-md text-sm disabled:bg-gray-100"
          />

          <p className="text-xs text-gray-500">
            Funds will be paid to this account after successful delivery
            confirmation.
          </p>
        </div>

        <p className="text-xs text-center text-gray-600">
          🛡️ Buyer funds are secured in escrow before you ship.
        </p>

        {!confirmed ? (
          <button
            disabled={!isBankValid}
            onClick={confirmEscrow}
            className={`w-full py-3 rounded-md font-medium text-white ${
              isBankValid ? "bg-indigo-600" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Confirm & Accept Escrow
          </button>
        ) : (
          <p className="text-sm text-green-600 font-medium text-center">
            ✅ Escrow confirmed. Bank details locked.
          </p>
        )}

        <p className="text-xs text-gray-400 text-center leading-relaxed">
          Your payout details are securely recorded. Funds will be released
          automatically after buyer confirms delivery.
        </p>
      </div>
    </div>
  );
}
