import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VendorInviteAccepted() {
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

    localStorage.setItem(`escrow-${escrowId}`, JSON.stringify(updatedEscrow));
    setConfirmed(true);

    setTimeout(() => {
      navigate("/vendor-accepted", {
        state: {
          escrowId,
          items: escrow.items,
        },
      });
    }, 800);
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
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6 space-y-6">
        {/* STATUS */}
        <div className="text-center">
          <span
            className={`inline-block text-xs px-3 py-1 rounded-full mb-3 ${
              confirmed
                ? "bg-green-100 text-green-700"
                : "bg-indigo-100 text-indigo-700"
            }`}
          >
            {confirmed ? "Transaction Accepted" : "Action Required"}
          </span>

          <h1 className="text-xl font-bold text-gray-900">
            Secure Transaction Invitation
          </h1>

          <p className="text-sm text-gray-600 mt-2">
            A buyer has invited you to complete this transaction securely using
            VerifyCart escrow.
          </p>
        </div>

        {/* BUYER DETAILS */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-md p-4 text-sm text-indigo-900 space-y-1">
          <p className="font-semibold">Buyer Transaction Details</p>

          <p>
            <span className="font-medium">Buyer Status:</span>{" "}
            {confirmed ? "✅ Vendor accepted" : "⏳ Awaiting your acceptance"}
          </p>

          <p>
            <span className="font-medium">Items total:</span> ₦
            {escrow.items
              .reduce((sum, item) => sum + item.price, 0)
              .toLocaleString()}
          </p>

          <p>
            <span className="font-medium">Escrow ID:</span>{" "}
            <span className="font-mono">{escrowId}</span>
          </p>

          <p>
            <span className="font-medium">Date initiated:</span>{" "}
            {new Date(escrow.createdAt).toLocaleDateString()}
          </p>

          <p className="text-xs text-indigo-700 pt-2">
            The buyer will complete payment only after you accept this escrow.
          </p>
        </div>
        {/* ITEMS SUMMARY */}
        <div className="bg-white border rounded-md p-4 text-sm space-y-2">
          <p className="font-semibold text-gray-800">
            Items in this transaction
          </p>

          {escrow.items.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-1">
              <span>{item.name}</span>
              <span>₦{item.price.toLocaleString()}</span>
            </div>
          ))}

          <div className="flex justify-between font-semibold pt-2">
            <span>Total</span>
            <span>
              ₦
              {escrow.items
                .reduce((sum, item) => sum + item.price, 0)
                .toLocaleString()}
            </span>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="bg-white border rounded-md p-4 text-sm text-gray-700 space-y-2">
          <p className="font-semibold text-gray-800">How VerifyCart Works</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Buyer funds are held securely in escrow</li>
            <li>You ship only after payment is locked</li>
            <li>Funds are released after delivery is confirmed</li>
            <li>No off-platform payments required</li>
          </ul>
        </div>

        {/* BANK DETAILS */}
        <div className="bg-white border rounded-md p-4 space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">
            Where should we pay you?
          </h2>

          <p className="text-xs text-gray-500">
            Enter the bank account where your funds will be sent after
            successful delivery.
          </p>

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
            Your details are encrypted and cannot be changed after acceptance.
          </p>
        </div>

        {/* CTA */}
        {!confirmed ? (
          <button
            disabled={!isBankValid}
            onClick={confirmEscrow}
            className={`w-full py-3 rounded-md font-medium text-white ${
              isBankValid
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Accept Secure Transaction
          </button>
        ) : (
          <div className="text-center space-y-2">
            <p className="text-green-600 font-medium">
              ✅ Transaction accepted
            </p>
            <p className="text-sm text-gray-600">
              You’ve accepted this escrow. The buyer will now fund the
              transaction.
            </p>
          </div>
        )}

        {/* FOOTER */}
        <p className="text-xs text-center text-gray-400 leading-relaxed">
          🛡️ You will never be asked to ship before buyer funds are secured in
          escrow.
        </p>
      </div>
    </div>
  );
}
