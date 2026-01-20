export default function LoadingSpinner() {
  return (
    <div className="mt-10 flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-sm text-gray-500">
        Verifying vendor authenticity...
      </p>
    </div>
  );
}
