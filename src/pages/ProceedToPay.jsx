import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProceedToPay() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [escrowLink, setEscrowLink] = useState("");

  const verification = state?.verification;
  const [hasInitiatedSend, setHasInitiatedSend] = useState(false);

  const generateEscrowLink = () => {
    const escrowId = Math.random().toString(36).substring(2, 10);
    const link = `${window.location.origin}/escrow/${escrowId}`;
    setEscrowLink(link);
  };

  const vendorMessage = `
Hello 👋

To proceed safely, I’m using VerifyCart Escrow.

This protects both of us:
• My payment is held securely
• You ship only after escrow confirmation
• Funds are released after delivery

Please confirm using the link below:
${escrowLink}

Once confirmed, I’ll proceed immediately.

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

        {/* Generate Link */}
        <div className="bg-white p-5 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold">Send Escrow Link to Vendor</h2>

          {!escrowLink ? (
            <button
              onClick={generateEscrowLink}
              className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium"
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
                    setHasInitiatedSend(true);
                  }}
                  className="bg-gray-800 text-white py-2 rounded-md"
                >
                  📋 Copy Message
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
