export default function WaitingForDelivery() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6 text-center space-y-4">

        <h1 className="text-xl font-bold text-gray-900">
          Vendor Confirmed 🎉
        </h1>

        <p className="text-sm text-gray-600">
          The vendor has accepted escrow and is preparing your order.
        </p>

        <div className="text-green-600 font-medium">
          🚚 Waiting for delivery…
        </div>

        <p className="text-xs text-gray-400">
          Funds will be released only after you confirm delivery.
        </p>
      </div>
    </div>
  );
}
