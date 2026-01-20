export default function BlogCard({ title, date, excerpt }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="h-32 bg-gray-200" />

      <div className="p-4">
        <p className="text-xs text-gray-400">{date}</p>
        <h3 className="font-semibold text-gray-800 mt-1">{title}</h3>
        <p className="text-sm text-gray-500 mt-2">{excerpt}</p>

        <button className="mt-3 text-sm text-indigo-600">
          Read More →
        </button>
      </div>
    </div>
  );
}
