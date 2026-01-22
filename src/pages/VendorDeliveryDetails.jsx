import { useParams, useNavigate } from "react-router-dom";

export default function VendorDeliveryDetails() {
  const { escrowId } = useParams();
  const navigate = useNavigate();

  const data = JSON.parse(
    localStorage.getItem(`delivery_${escrowId}`)
  );

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        No delivery details found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 space-y-5">

        {/* HEADER */}
        <div className="text-center">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full mb-2">
            Vendor View 
            {/* (Demo) */}
          </span>

          <h1 className="text-xl font-bold text-gray-900">
            Buyer Delivery Details
          </h1>

          <p className="text-sm text-gray-600">
            Use these details to fulfill the order.
          </p>
        </div>

        {/* DETAILS */}
        <div className="space-y-3 text-sm">
          <Detail label="Full Name" value={data.fullName} />
          <Detail label="Phone" value={data.phone} />
          <Detail label="Address" value={data.address} />
          <Detail label="Delivery Window" value={data.deliveryWindow} />
          {data.note && <Detail label="Note" value={data.note} />}
        </div>

        {/* ACTION */}
        <button
          onClick={() => navigate("/waiting-for-delivery")}
          className="w-full bg-green-600 text-white py-3 rounded-md font-medium"
        >
          Mark as Shipped
        </button>

        <p className="text-xs text-gray-400 text-center">
          In production, this action would notify the buyer.
        </p>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}
