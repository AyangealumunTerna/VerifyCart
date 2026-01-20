import { useNavigate } from "react-router-dom";

const riskConfig = {
  low: {
    label: "Low Risk Vendor",
    color: "green",
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    score: "92%",
  },
  medium: {
    label: "Proceed with Caution",
    color: "yellow",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    score: "61%",
  },
  high: {
    label: "High Risk Vendor",
    color: "red",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    score: "28%",
  },
};

export default function VerificationResult({ riskLevel = "low" }) {
  const config = riskConfig[riskLevel];
  const navigate = useNavigate();

  return (
    <div className="mt-10 bg-white rounded-xl shadow-md p-6">
      {/* HEADER */}
      <div
        className={`${config.bg} ${config.border} border rounded-lg p-4 flex justify-between items-center`}
      >
        <div>
          <p className={`text-sm font-semibold ${config.text}`}>
            🧠 AI Risk Assessment
          </p>
          <p className="text-xs text-gray-500">
            Jenna Footwear Stores — Instagram Account
          </p>
        </div>

        <div className="text-right">
          <p className={`text-lg font-bold ${config.text}`}>{config.score}</p>
          <p className="text-xs text-gray-500">{config.label}</p>
        </div>
      </div>

      {/* INFO */}
      <div className="mt-6 space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Account Age</span>
          <span className="font-medium">2 years 4 months</span>
        </div>
        <div className="flex justify-between">
          <span>Followers</span>
          <span className="font-medium">50.5k</span>
        </div>
        <div className="flex justify-between">
          <span>Threat Signals</span>
          <span className={config.text}>
            {riskLevel === "high"
              ? "Multiple Flags Detected"
              : riskLevel === "medium"
                ? "Some Warning Signals"
                : "No Significant Threats"}
          </span>
        </div>
      </div>

      {/* INSIGHTS */}
      <div
        className={`mt-6 p-4 rounded-lg ${config.bg} ${config.border} border`}
      >
        <h4 className="text-sm font-semibold mb-2">Key Insights</h4>
        <ul className={`space-y-2 text-sm text-left ${config.text}`}>
          <li>✔ Public activity analysis</li>
          <li>✔ Posting consistency</li>
          <li>✔ Community reports</li>
          <li>✔ Payment behavior signals</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="mt-6">
        <button
          onClick={() =>
            navigate("/proceed-to-pay", {
              state: {
                verification: {
                  vendorName: "Jenna Footwear Stores",
                  trustScore: "96%",
                  threats: "No Threats",
                },
              },
            })
          }
          className={`w-full py-3 rounded-md font-semibold text-white ${
            riskLevel === "high"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600"
          }`}
          disabled={riskLevel === "high"}
        >
          Proceed to Pay
        </button>

        <p className="mt-3 text-xs text-gray-400 text-center leading-relaxed">
          This assessment is generated using AI models, public data, and
          community signals. It does not guarantee vendor behavior. Payments are
          protected via escrow. Proceed at your discretion.
        </p>
      </div>
    </div>
  );
}
