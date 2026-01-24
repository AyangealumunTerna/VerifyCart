import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Info } from "lucide-react";

export default function FundEscrow() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { escrowId, items = [] } = state || {};

  const [hasPaid, setHasPaid] = useState(false);
  const [delivery, setDelivery] = useState({
    fullName: "",
    phone: "",
    address: "",
    notes: "",
    expectedDays: "", // ✅ NEW
  });

  const DELIVERY_OPTIONS = [1, 2, 3, 5, 7, 10, 14, 21];

  const isDeliveryValid =
    delivery.fullName.trim() &&
    delivery.phone.trim() &&
    delivery.address.trim() &&
    delivery.expectedDays;

  // Escrow fee constants
  const ESCROW_FEE_RATE = 0.05;
  const ESCROW_FEE_MIN = 500;
  const ESCROW_FEE_MAX = 50_000;

  if (!escrowId || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-600">
        Invalid escrow session.
      </div>
    );
  }

  const itemsTotal = items.reduce((sum, item) => sum + item.price, 0);
  const rawEscrowFee = Math.round(itemsTotal * ESCROW_FEE_RATE);

  const escrowFee = Math.min(
    ESCROW_FEE_MAX,
    Math.max(ESCROW_FEE_MIN, rawEscrowFee),
  );

  const totalPayable = itemsTotal + escrowFee;

  const handlePay = () => {
    setHasPaid(true);

    const stored = localStorage.getItem(`escrow-${escrowId}`);
    const escrow = stored ? JSON.parse(stored) : {};

    localStorage.setItem(
      `escrow-${escrowId}`,
      JSON.stringify({
        ...escrow,
        escrowId,
        items,
        buyerDeliveryDetails: delivery,
        expectedDeliveryDays: delivery.expectedDays, // ✅ STORED
        status: "ESCROW_FUNDED",
        fundedAt: new Date().toISOString(),
        totalPayable,
      }),
    );

    navigate(`/vendor-delivery-view/${escrowId}`);

  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-indigo-600 hover:underline"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold text-gray-900">Fund Secure Escrow</h1>

        <p className="text-sm text-gray-600">
          Your payment is protected until you confirm delivery.
        </p>

        {/* DELIVERY DETAILS */}
        <div className="bg-white p-5 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold">Delivery Information</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={delivery.fullName}
            onChange={(e) =>
              setDelivery({ ...delivery, fullName: e.target.value })
            }
            className="w-full border rounded-md p-2 text-sm"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={delivery.phone}
            onChange={(e) =>
              setDelivery({ ...delivery, phone: e.target.value })
            }
            className="w-full border rounded-md p-2 text-sm"
          />

          <textarea
            placeholder="Delivery Address"
            rows={3}
            value={delivery.address}
            onChange={(e) =>
              setDelivery({ ...delivery, address: e.target.value })
            }
            className="w-full border rounded-md p-2 text-sm"
          />

          {/* ✅ EXPECTED DELIVERY DAYS */}
          <select
            value={delivery.expectedDays}
            onChange={(e) =>
              setDelivery({ ...delivery, expectedDays: e.target.value })
            }
            className="w-full border rounded-md p-2 text-sm bg-white"
          >
            <option value="">Expected delivery time</option>

            {DELIVERY_OPTIONS.map((days) => (
              <option key={days} value={days}>
                {days} {days === 1 ? "day" : "days"}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Additional notes (optional)"
            rows={2}
            value={delivery.notes}
            onChange={(e) =>
              setDelivery({ ...delivery, notes: e.target.value })
            }
            className="w-full border rounded-md p-2 text-sm"
          />

          <p className="text-xs text-gray-500">
            Delivery details and expectations will be shared with the vendor
            after escrow is funded.
          </p>
        </div>

        {/* PAYMENT SUMMARY */}
        <div className="bg-white p-5 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold">Payment Breakdown</h2>

          {/* ✅ ITEM LIST INSIDE BREAKDOWN */}
          <div className="space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-1">
                <span>{item.name}</span>
                <span>₦{item.price.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-sm pt-2">
            <span className="font-medium">Items Subtotal</span>
            <span>₦{itemsTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-sm items-center">
            <div className="flex items-center gap-1 relative group">
              <span>Escrow Protection Fee</span>
              <Info className="w-4 h-4 text-gray-400" />
              <div className="absolute left-0 top-6 w-64 bg-gray-900 text-white text-xs rounded-md p-3 opacity-0 group-hover:opacity-100 transition z-20">
                <p>This covers secure fund holding and dispute protection.</p>
                <p>5% · Min ₦500 · Max ₦50,000</p>
              </div>
            </div>
            <span>₦{escrowFee.toLocaleString()}</span>
          </div>

          <div className="border-t pt-3 flex justify-between font-semibold">
            <span>Total Payable</span>
            <span>₦{totalPayable.toLocaleString()}</span>
          </div>
        </div>

        {/* CTA */}
        <button
          disabled={!isDeliveryValid || hasPaid}
          onClick={handlePay}
          className={`w-full py-3 rounded-md font-medium text-white transition ${
            !isDeliveryValid || hasPaid
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {hasPaid
            ? "Payment Confirmed"
            : `Pay ₦${totalPayable.toLocaleString()}`}
        </button>

        {!isDeliveryValid && (
          <p className="text-xs text-red-500 text-center">
            Please complete delivery details and expected delivery time.
          </p>
        )}

        <p className="text-xs text-gray-400 text-center">
          🛡️ Funds are released only after delivery confirmation.
        </p>
      </div>
    </div>
  );
}
