import { useParams, useNavigate } from "react-router-dom";

export default function VendorDeliveryDetails() {
  const { escrowId } = useParams();
  const navigate = useNavigate();

  const data = JSON.parse(
    localStorage.getItem(`delivery_${escrowId}`)
  );

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center text-gray-600">
        No delivery details found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-5 sm:p-8 space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full">
            Vendor View
          </span>

          <h1 className="text-lg sm:text-xl font-bold text-gray-900">
            Buyer Delivery Details
          </h1>

          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Use these details to fulfill the order.
          </p>
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <Detail label="Full Name" value={data.fullName} />
          <Detail label="Phone" value={data.phone} />
          <Detail label="Delivery Window" value={data.deliveryWindow} />

          {/* Address spans full width */}
          <div className="sm:col-span-2">
            <Detail label="Address" value={data.address} />
          </div>

          {data.note && (
            <div className="sm:col-span-2">
              <Detail label="Note" value={data.note} />
            </div>
          )}
        </div>

        {/* ACTION */}
        <button
          onClick={() => navigate("/waiting-for-delivery")}
          className="w-full sm:w-auto sm:px-10 bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-lg font-medium mx-auto block"
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
    <div className="border rounded-lg p-3 bg-gray-50">
      <p className="text-gray-500 text-xs mb-1">{label}</p>
      <p className="font-medium text-gray-900 break-words">
        {value}
      </p>
    </div>
  );
}
