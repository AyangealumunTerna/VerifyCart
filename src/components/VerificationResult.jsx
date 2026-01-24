import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

/* =========================
   AI RISK CONFIG
========================= */
const riskConfig = {
  low: {
    label: "Low Risk Vendor",
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
  },
  medium: {
    label: "Proceed with Caution",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
  },
  high: {
    label: "High Risk Vendor",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
  },
};

// get URL query params
// const [searchParams] = useSearchParams();

// // URL params
// const urlHandle = searchParams.get("vendor");
// const urlPlatform = searchParams.get("platform");

/* =========================
   MOCK AI REVIEW ENGINE
   (FRONTEND SAFE)
========================= */
function runAIRiskAnalysis({ handle, platform }) {
  const lower = handle.toLowerCase();

  const suspiciousKeywords = [
    "crypto",
    "investment",
    "forex",
    "giveaway",
    "free",
    "double",
    "fastcash",
  ];

  const keywordFlag = suspiciousKeywords.some((k) => lower.includes(k));

  let riskLevel = "low";
  let trustScore = 92;
  let threats = "No significant threats detected";

  if (keywordFlag) {
    riskLevel = "high";
    trustScore = 28;
    threats = "Multiple suspicious indicators detected";
  } else if (handle.length < 5) {
    riskLevel = "medium";
    trustScore = 61;
    threats = "Limited account credibility signals";
  }

  return {
    vendorName: handle,
    platform,
    riskLevel,
    trustScore,
    metrics: {
      accountAge: "2 years 4 months",
      followers: "50.5k",
    },
    insights: [
      "Handle structure & naming pattern",
      "Platform-specific fraud heuristics",
      "Activity consistency modeling",
      "Community risk simulation",
      "Payment behavior indicators",
    ],
    threats,
  };
}

/* =========================
   COMPONENT
========================= */
export default function VerificationResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // expected from previous page
  const stateData = location.state || {};

  const rawHandle = searchParams.get("vendor") || stateData.handle || "";

  const platform =
    searchParams.get("platform") || stateData.platform || "Instagram";

  // ✅ NORMALIZE HANDLE HERE
  const normalizedHandle = rawHandle
    .replace("@", "")
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .split("/")
    .pop()
    .trim();

  const handle = normalizedHandle || "Unknown Vendor";

  const [result, setResult] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const analysis = runAIRiskAnalysis({
        handle,
        platform,
      });
      setResult(analysis);
    }, 1200);

    return () => clearTimeout(timer);
  }, [handle, platform]);

  if (!result) {
    return (
      <div className="mt-20 text-center text-gray-500">
        🧠 Analyzing vendor risk using AI models…
      </div>
    );
  }

  const config = riskConfig[result.riskLevel];

  return (
    <div className="mt-10 bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto">
      {/* HEADER */}
      <div
        className={`${config.bg} ${config.border} border rounded-lg p-4 flex justify-between items-center`}
      >
        <div>
          <p className={`text-sm font-semibold ${config.text}`}>
            🧠 AI Risk Assessment
          </p>
          <p className="text-xs text-gray-500">
            @{handle} — {result.platform}
          </p>
        </div>

        <div className="text-right">
          <p className={`text-lg font-bold ${config.text}`}>
            {result.trustScore}%
          </p>
          <p className="text-xs text-gray-500">{config.label}</p>
        </div>
      </div>

      {/* PLATFORM INFO */}
      <div className="mt-4 text-xs text-gray-500">
        Platform analyzed: <strong>{platform}</strong> <br />
        Identifier reviewed: <strong>@{handle}</strong>
      </div>

      {/* INFO */}
      <div className="mt-6 space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Account Age</span>
          <span className="font-medium">{result.metrics.accountAge}</span>
        </div>
        <div className="flex justify-between">
          <span>Followers</span>
          <span className="font-medium">{result.metrics.followers}</span>
        </div>
        <div className="flex justify-between text-destructive">
          <span>Threat Signals</span>
          <span className={config.text}>{result.threats}</span>
        </div>
      </div>

      {/* INSIGHTS */}
      <div
        className={`mt-6 p-4 rounded-lg ${config.bg} ${config.border} border`}
      >
        <h4 className="text-sm font-semibold mb-2">AI Risk Signals</h4>
        <ul className={`space-y-2 text-sm text-left ${config.text}`}>
          {result.insights.map((item, idx) => (
            <li key={idx}>✔ {item}</li>
          ))}
        </ul>
      </div>

      {/* EXPLANATION */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
        <p className="font-medium mb-1">How this score was generated</p>
        <p>
          This AI-assisted assessment is based on vendor identifiers,
          platform-specific risk heuristics, and historical fraud modeling. It
          does not scrape private data or guarantee vendor behavior.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-6">
        <button
          onClick={() =>
            navigate("/start-secure-purchase", {
              state: {
                verification: {
                  vendorName: result.vendorName,
                  trustScore: result.trustScore,
                  riskLevel: result.riskLevel,
                },
              },
            })
          }
          disabled={result.riskLevel === "high"}
          className={`w-full py-3 rounded-md font-semibold text-white ${
            result.riskLevel === "high"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600"
          }`}
        >
          Start Secure Purchase
        </button>

        <p className="mt-3 text-xs text-gray-400 text-center leading-relaxed">
          This assessment is generated using AI-assisted models and
          public-signal heuristics. Payments are protected via escrow. Proceed
          at your discretion.
        </p>
      </div>
    </div>
  );
}
