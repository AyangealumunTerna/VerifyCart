import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function WaitingForVendor() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { escrowId } = state || {};

  const [escrow, setEscrow] = useState(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [hasInitiatedSend, setHasInitiatedSend] = useState(false);
  const [isWaiting, setIsWaiting] = useState(() => {
    if (!escrowId) return false;
    return localStorage.getItem(`waiting-for-vendor-${escrowId}`) === "true";
  });

  useEffect(() => {
    if (!escrowId) return;

    const stored = localStorage.getItem(`escrow-${escrowId}`);
    if (stored) {
      setEscrow(JSON.parse(stored));
    }
  }, [escrowId]);

  if (!escrowId || !escrow) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-600">
        Invalid escrow session.
      </div>
    );
  }

  const emailSubject = "Secure Purchase via VerifyCart Escrow";
  const emailBody = escrow.vendorMessage.replace(/\n/g, "%0A");

  return (
    <div className="min-h-screen bg-indigo-50 px-4 py-6 sm:py-10">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-xl font-bold text-gray-900 text-center">
          Waiting for Vendor Confirmation
        </h1>

        <p className="text-sm text-gray-600 text-center">
          Send the message below to the vendor so they can confirm the escrow.
        </p>

        {/* MESSAGE PREVIEW */}
        <div className="bg-gray-50 border rounded-md p-4 text-xs whitespace-pre-wrap max-h-64 overflow-y-auto">
          {escrow.vendorMessage}
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => {
              navigator.clipboard.writeText(escrow.vendorMessage);
              setHasCopied(true);
              setHasInitiatedSend(true);
            }}
            className="bg-gray-800 text-white py-2 rounded-md text-sm"
          >
            {hasCopied ? "✅ Message Copied" : "📋 Copy Message"}
          </button>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              escrow.vendorMessage,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setHasInitiatedSend(true)}
            className="bg-green-600 text-white py-2 rounded-md text-sm text-center"
          >
            🟢 Send via WhatsApp
          </a>

          <a
            href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
            onClick={() => setHasInitiatedSend(true)}
            className="bg-indigo-600 text-white py-2 rounded-md text-sm text-center"
          >
            ✉️ Send via Email
          </a>
        </div>

        {/* CONTINUE */}
        <button
          disabled={!hasInitiatedSend || isWaiting}
          onClick={() => {
            setIsWaiting(true);
            localStorage.setItem(`waiting-for-vendor-${escrowId}`, "true");
          }}
          className={`w-full py-3 rounded-md font-medium text-white transition ${
            !hasInitiatedSend
              ? "bg-gray-400 cursor-not-allowed"
              : isWaiting
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-700 hover:bg-indigo-800"
          }`}
        >
          {isWaiting
            ? "⏳ Waiting for Vendor Confirmation…"
            : "✅ I’ve Sent the Message"}
        </button>

        {isWaiting && (
          <p className="text-xs text-indigo-600 text-center animate-pulse">
            We’ll notify you once the vendor accepts the escrow.
          </p>
        )}

        {!hasInitiatedSend && (
          <p className="text-xs text-gray-500 text-center">
            Please send the message to the vendor before continuing.
          </p>
        )}

        <p className="text-xs text-gray-400 text-center">
          Do not make any payments outside VerifyCart escrow.
        </p>
      </div>
    </div>
  );
}
