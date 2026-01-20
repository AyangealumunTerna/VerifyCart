export default function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-lg p-8 shadow-sm text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
}
