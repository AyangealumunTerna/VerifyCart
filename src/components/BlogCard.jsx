export default function BlogCard({ image, date, title, excerpt }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="h-32 w-full object-cover"
      />

      <div className="p-4">
        <p className="text-xs text-gray-400">{date}</p>

        {/* You can remove this h3 if you don't need text */}
        <h3 className="font-semibold text-gray-800 mt-1">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-2">{excerpt}</p>

        <button className="mt-3 text-sm text-indigo-600">
          Read More →
        </button>
      </div>
    </div>
  );
}
