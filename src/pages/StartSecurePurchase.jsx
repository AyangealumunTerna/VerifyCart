import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StartSecurePurchase() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const itemsTotal = items.reduce((sum, item) => sum + item.price, 0);

  function createEscrow() {
    const escrowId = crypto.randomUUID();

    const escrowLink = `${window.location.origin}/escrow/${escrowId}`;

    const itemList = items
      .map((item) => `• ${item.name} — ₦${item.price.toLocaleString()}`)
      .join("\n");

    const vendorMessage = `
Hello 👋

I want to complete this purchase using VerifyCart Escrow.

🆔 Escrow ID: ${escrowId}

🛒 Items:
${itemList}

How it works:
• My payment is held securely
• You ship only after confirming escrow
• Funds are released after delivery

Please confirm using this link:
${escrowLink}

Thank you 🙏
`.trim();

    const escrowPayload = {
      escrowId,
      items,
      vendorMessage,
      status: "waiting_for_vendor",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(`escrow-${escrowId}`, JSON.stringify(escrowPayload));

    navigate("/waiting-for-vendor", {
      state: { escrowId },
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Start Secure Purchase
        </h1>

        <p className="text-sm text-gray-600">
          Add the items you want to buy. The vendor will confirm before payment.
        </p>

        {/* ADD ITEMS */}
        <div className="bg-white p-5 rounded-lg shadow space-y-3">
          <h2 className="text-lg font-semibold">Items</h2>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            <input
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Item name"
              className="sm:col-span-3 border px-3 py-2 rounded-md text-sm"
            />

            <input
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              placeholder="Price"
              type="number"
              className="sm:col-span-1 border px-3 py-2 rounded-md text-sm"
            />

            <button
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
              className="sm:col-span-1 bg-indigo-600 text-white rounded-md"
            >
              Add
            </button>
          </div>

          {items.map((item, i) => (
            <div
              key={item.id}
              className="flex justify-between text-sm border-b py-2"
            >
              <span>{item.name}</span>
              <span>₦{item.price.toLocaleString()}</span>
            </div>
          ))}

          <div className="flex justify-between font-semibold pt-2">
            <span>Total</span>
            <span>₦{itemsTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* CTA */}
        <button
          disabled={items.length === 0}
          onClick={createEscrow}
          className={`w-full py-3 rounded-md font-medium text-white ${
            items.length === 0
              ? "bg-gray-400"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          Create Secure Purchase
        </button>

        <p className="text-xs text-gray-400 text-center">
          Vendor will confirm before any payment is made.
        </p>
      </div>
    </div>
  );
}
