import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProceedToPay() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // State for items being purchased
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [escrowData, setEscrowData] = useState(null);

  // Escrow fee constant
  const ESCROW_FEE = 2000;

  const itemsTotal = items.reduce((sum, item) => sum + item.price, 0);

  const totalPayable = itemsTotal + ESCROW_FEE;

  // Payment and link states
  const [hasPaid, setHasPaid] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [hasInitiatedSend, setHasInitiatedSend] = useState(false);
  const isLocked = hasPaid;

  // Escrow link state
  const [escrowLink, setEscrowLink] = useState("");

  const verification = state?.verification;

  const generateEscrowLink = () => {
    const escrowId = crypto.randomUUID();

    const escrowPayload = {
      escrowId,
      items,
      itemsTotal,
      escrowFee: ESCROW_FEE,
      totalPayable,
      createdAt: new Date().toISOString(),
    };

    setEscrowData(escrowPayload);

    const link = `${window.location.origin}/escrow/${escrowId}`;
    setEscrowLink(link);
  };

  const itemList = items
    .map((item) => `• ${item.name} — ₦${item.price.toLocaleString()}`)
    .join("\n");

  const vendorMessage = `
Hello 👋

I’m using VerifyCart Escrow for this transaction.

🆔 Escrow ID: ${escrowData?.escrowId}

🛒 Items:
${itemList}

💰 Items Total: ₦${itemsTotal.toLocaleString()}

How this works:
• My payment is held securely
• You ship after confirming escrow
• Funds are released after delivery

Please confirm using the link below:
${escrowLink}

Thank you 🙏
`.trim();

  const emailSubject = "Secure Escrow Payment Request – VerifyCart";

  const emailBody = vendorMessage.replace(/\n/g, "%0A");

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* HEADER */}
        <button
          onClick={() => navigate("/")}
          className="text-sm text-indigo-600 hover:underline"
        >
          ← Home
        </button>

        <h1 className="text-2xl font-bold text-gray-900">
          Secure Payment via Escrow
        </h1>

        {/* Escrow Explanation */}
        <div className="bg-white p-5 rounded-lg shadow text-sm text-gray-700">
          <p className="font-medium mb-2">How this protects both parties:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Buyer funds are held securely</li>
            <li>Vendor ships only after confirmation</li>
            <li>Funds released after delivery</li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-lg shadow space-y-3">
          <h2 className="text-lg font-semibold">Items to Buy</h2>

          <div className="flex gap-2">
            <input
              disabled={isLocked}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Item name"
              className="flex-1 border px-3 py-2 rounded-md text-sm disabled:bg-gray-100"
            />

            <input
              disabled={isLocked}
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              placeholder="Price"
              type="number"
              className="w-32 border px-3 py-2 rounded-md text-sm disabled:bg-gray-100"
            />

            <button
              disabled={isLocked}
              onClick={() => {
                if (!itemName || !itemPrice) return;

                setItems([
                  ...items,
                  {
                    id: crypto.randomUUID(),
                    name: itemName,
                    price: Number(itemPrice),
                  },
                ]);

                setItemName("");
                setItemPrice("");
              }}
              className={`px-4 rounded-md ${
                isLocked ? "bg-gray-400" : "bg-indigo-600 text-white"
              }`}
            >
              Add
            </button>

            {isLocked && (
              <p className="text-xs text-red-500">
                Items are locked after payment for escrow security.
              </p>
            )}
          </div>
        </div>

        {/* order summary */}
        <div className="bg-white p-5 rounded-lg shadow space-y-2">
          <h2 className="text-lg font-semibold">Payment Summary</h2>

          {items.map((item, i) => (
            <div
              key={item.id}
              className="flex justify-between items-center gap-2 text-sm"
            >
              <input
                disabled={isLocked}
                value={item.name}
                onChange={(e) => {
                  const updated = [...items];
                  updated[i] = { ...updated[i], name: e.target.value };
                  setItems(updated);
                }}
                className="border px-2 py-1 rounded w-full disabled:bg-gray-100"
              />

              <input
                disabled={isLocked}
                type="number"
                value= {item.price}
                onChange={(e) => {
                  const updated = [...items];
                  updated[i] = { ...updated[i], price: Number(e.target.value) };
                  setItems(updated);
                }}
                className="border px-2 py-1 rounded w-28 disabled:bg-gray-100"
              />

              {!isLocked && (
                <button
                  onClick={() =>
                    setItems(items.filter((_, index) => index !== i))
                  }
                  className="text-red-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <div className="flex justify-between text-sm text-gray-600">
            <span>Escrow Fee</span>
            <span>₦{ESCROW_FEE.toLocaleString()}</span>
          </div>

          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total to Pay</span>
            <span>₦{totalPayable.toLocaleString()}</span>
          </div>
        </div>

        {/* Pay Button */}
        <div className="bg-yellow-50 border p-4 rounded-md text-sm">
          <p className="font-medium">Transfer to VerifyCart Escrow</p>
          <p>Bank: Providus Bank</p>
          <p>Account Name: VerifyCart Escrow</p>
          <p>Account Number: 1234567890</p>
        </div>

        <button
          disabled={items.length === 0 || hasPaid}
          onClick={() => {
            setHasPaid(true);
          }}
          className={`w-full py-3 rounded-md font-medium text-white ${
            items.length === 0 || hasPaid ? "bg-gray-400" : "bg-indigo-600"
          }`}
        >
          {hasPaid
            ? "Payment Received"
            : `Pay ₦${totalPayable.toLocaleString()}`}
        </button>

        {items.length === 0 && (
          <p className="text-xs text-gray-500 text-center">
            Add at least one item to continue.
          </p>
        )}
        {hasPaid && (
          <p className="text-xs text-red-500 text-center">
            Items are locked after payment for escrow security.
          </p>
        )}

        {/* Generate Link */}
        <div className="bg-white p-5 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold">Send Escrow Link to Vendor</h2>

          {!escrowLink ? (
            <button
              disabled={!hasPaid}
              onClick={generateEscrowLink}
              className={`w-full py-3 rounded-md font-medium text-white ${
                hasPaid ? "bg-indigo-600" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Generate Secure Escrow Link
            </button>
          ) : (
            <>
              {/* Escrow Link */}
              <input
                type="text"
                readOnly
                value={escrowLink}
                className="w-full px-4 py-3 border rounded-md text-sm bg-gray-50"
              />

              {/* Message Preview */}
              <div className="bg-gray-50 border rounded-md p-4 text-sm whitespace-pre-wrap">
                {vendorMessage}
                <p className="text-xs text-gray-500">
                  Copy and send this message via WhatsApp, Instagram DM, or
                  Email.
                </p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(vendorMessage);
                    setHasCopied(true);
                    setHasInitiatedSend(true);
                  }}
                  className="bg-gray-800 text-white py-2 rounded-md"
                >
                  {hasCopied ? "✅ Copied" : "📋 Copy Message"}
                </button>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(vendorMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setHasInitiatedSend(true)}
                  className="bg-green-600 text-white py-2 rounded-md text-center"
                >
                  🟢 WhatsApp
                </a>

                <a
                  href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
                  onClick={() => setHasInitiatedSend(true)}
                  className="bg-indigo-600 text-white py-2 rounded-md text-center"
                >
                  ✉️ Email
                </a>
              </div>

              <button
                disabled={!hasInitiatedSend}
                onClick={() => navigate("/waiting-for-vendor")}
                className={`w-full mt-4 py-3 rounded-md font-medium text-white ${
                  hasInitiatedSend
                    ? "bg-indigo-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                I’ve Sent the Link
              </button>
              {!hasInitiatedSend && (
                <p className="text-xs text-gray-500 text-center">
                  Please copy or send the message before proceeding.
                </p>
              )}
            </>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center">
          VerifyCart does not guarantee vendor behavior. Escrow protects funds
          by releasing payment only after buyer confirmation.
        </p>
      </div>
    </div>
  );
}
