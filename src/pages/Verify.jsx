import VerificationResult from "../components/VerificationResult";
import { useState } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import { useNavigate } from "react-router-dom";

export default function Verify() {
    const [handleUrl, setHandleUrl] = useState("");
  const navigate = useNavigate();

  function parseSocialUrl(url) {
    try {
      const cleanUrl = url.trim().toLowerCase();

      let platform = "Unknown";
      if (cleanUrl.includes("instagram.com")) platform = "Instagram";
      else if (cleanUrl.includes("twitter.com") || cleanUrl.includes("x.com"))
        platform = "Twitter";
      else if (cleanUrl.includes("facebook.com")) platform = "Facebook";

      const handle = cleanUrl
        .replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")
        .split("/")
        .filter(Boolean)
        .pop()
        .split("?")[0];

      return { platform, handle };
    } catch {
      return { platform: "Unknown", handle: "" };
    }
  }

  return (
    <div className="min-h-screen bg-indigo-50">
      <Navbar />

      {/* HERO / VERIFY SECTION */}
      <section className="max-w-3xl mx-auto mt-12 px-4">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard label="Social media handles queried" value="4260" />
          <StatCard label="Social media handles verified" value="3780" />
          <StatCard label="Total Scam Social media handles" value="5840" />
        </div>

        {/* Verification Card */}
        <div className="bg-gray-50 rounded-xl shadow-md px-6 py-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Determine The Authenticity of <br />
            your Vendor’s Social Handle
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Enter a social media profile link to verify if the vendor is
            legitimate
          </p>

          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter Instagram, Facebook, Twitter URL"
              value={handleUrl}
              onChange={(e) => setHandleUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {handleUrl && (
              <p className="mt-2 text-xs text-gray-500">
                Detected platform:{" "}
                <strong>{parseSocialUrl(handleUrl).platform}</strong>
              </p>
            )}

            <button
              disabled={!handleUrl.trim()}
              onClick={() => {
                const { platform, handle } = parseSocialUrl(handleUrl);
                if (!handle) {
                  alert("Invalid social media URL");
                  return;
                }

                navigate("/verify", {
                  state: {
                    handle,
                    platform,
                  },
                });
              }}
              className={`mt-4 px-6 py-2 text-sm rounded-md transition
                    ${
                      !handleUrl.trim()
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-indigo-500 hover:bg-indigo-600 text-white"
                    }
                  `}
            >
              Verify Now
            </button>

            {/* STATES
                {loading && <LoadingSpinner />}
                {showResult && <VerificationResult riskLevel="low" />} */}
          </div>
        </div>
      </section>
      <div className="min-h-screen bg-indigo-50 py-10">
        <VerificationResult />
      </div>
    </div>
  );
}
