export default function FeatureCard({ title, description, icon}) {
  return (
    <div className="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-sm">
      <div className="text-indigo-600 text-xl">{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
