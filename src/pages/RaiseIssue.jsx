import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RaiseIssue() {
  const { escrowId } = useParams();
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitIssue = () => {
    if (!reason) return;

    const issuePayload = {
      escrowId,
      reason,
      status: "open",
      raisedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      `issue_${escrowId}`,
      JSON.stringify(issuePayload)
    );

    // mark escrow as disputed
    localStorage.setItem(
      `escrow_status_${escrowId}`,
      "issue-raised"
    );

    setSubmitted(true);

    setTimeout(() => {
      navigate("/issue-submitted");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6 space-y-4">

        <h1 className="text-xl font-bold text-gray-900 text-center">
          Raise an Issue ⚠️
        </h1>

        <p className="text-sm text-gray-600">
          Tell us what went wrong with the delivery.
        </p>

        <textarea
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Item not delivered, damaged goods, wrong item, etc."
          className="w-full border px-3 py-2 rounded-md text-sm"
        />

        <button
          onClick={submitIssue}
          className="w-full bg-red-600 text-white py-3 rounded-md font-medium"
        >
          Submit Issue
        </button>

        <p className="text-xs text-gray-400 text-center">
          Funds will remain locked until the issue is resolved.
        </p>
      </div>
    </div>
  );
}
