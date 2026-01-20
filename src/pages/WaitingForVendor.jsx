export default function WaitingForVendor() {
  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6 text-center space-y-4">

        <h1 className="text-xl font-bold text-gray-900">
          Waiting for Vendor Confirmation
        </h1>

        <p className="text-sm text-gray-600">
          Once the vendor accepts the escrow, you’ll be notified automatically.
        </p>

        <div className="animate-pulse text-indigo-600 text-sm font-medium">
          ⏳ Awaiting vendor response…
        </div>

        <p className="text-xs text-gray-400">
          Do not make any payments outside VerifyCart escrow.
        </p>
      </div>
    </div>
  );
}
