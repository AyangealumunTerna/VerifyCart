import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DeliveryDetails() {
  const { escrowId } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const submitDetails = () => {
    if (!details.fullName || !details.phone || !details.address) return;

    // 🔐 In real app → send to backend
    // For now we lock it locally
    const payload = {
      escrowId,
      ...details,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      `delivery_${escrowId}`,
      JSON.stringify(payload)
    );

    setSubmitted(true);

    setTimeout(() => {
      navigate("/waiting-for-delivery");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 space-y-5">

        <div className="text-center">
          <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-2">
            Escrow Confirmed
          </span>

          <h1 className="text-xl font-bold text-gray-900">
            Delivery Details
          </h1>

          <p className="text-sm text-gray-600 mt-1">
            These details will be shared with the vendor for delivery.
          </p>
        </div>

        <div className="bg-gray-50 border rounded-md p-3 text-sm">
          <span className="font-medium">Escrow ID:</span>{" "}
          <span className="font-mono">{escrowId}</span>
        </div>

        {/* FORM */}
        <div className="space-y-3">
          <input
            disabled={submitted}
            name="fullName"
            placeholder="Full Name"
            value={details.fullName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-sm disabled:bg-gray-100"
          />

          <input
            disabled={submitted}
            name="phone"
            placeholder="Phone Number"
            value={details.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-sm disabled:bg-gray-100"
          />

          <textarea
            disabled={submitted}
            name="address"
            placeholder="Delivery Address"
            value={details.address}
            onChange={handleChange}
            rows={3}
            className="w-full border px-3 py-2 rounded-md text-sm disabled:bg-gray-100"
          />

          <textarea
            disabled={submitted}
            name="note"
            placeholder="Landmark / Delivery notes (optional)"
            value={details.note}
            onChange={handleChange}
            rows={2}
            className="w-full border px-3 py-2 rounded-md text-sm disabled:bg-gray-100"
          />
        </div>

        {!submitted ? (
          <button
            onClick={submitDetails}
            className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium"
          >
            Submit Delivery Details
          </button>
        ) : (
          <p className="text-center text-green-600 text-sm font-medium">
            ✅ Delivery details submitted. Redirecting…
          </p>
        )}

        <p className="text-xs text-gray-400 text-center">
          Delivery details are locked after submission for escrow security.
        </p>
      </div>
    </div>
  );
}
