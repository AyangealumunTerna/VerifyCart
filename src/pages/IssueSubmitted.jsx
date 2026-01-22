import { useNavigate } from "react-router-dom";

export default function IssueSubmitted() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6 text-center space-y-4">

        <h1 className="text-xl font-bold text-gray-900">
          Issue Submitted ✅
        </h1>

        <p className="text-sm text-gray-600">
          Your issue has been recorded. The escrow funds are currently locked
          while this is being reviewed.
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
