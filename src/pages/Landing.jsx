import { useState } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import BlogCard from "../components/BlogCard";
import FeatureCard from "../components/FeatureCard";
import Blog1 from "../assets/blog/blog1.png";
import Blog2 from "../assets/blog/blog2.png";
import Blog3 from "../assets/blog/blog3.png";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  // const [loading, setLoading] = useState(false);
  // const [showResult, setShowResult] = useState(false);
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

      {/* REPORT SCAM */}
      <section className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold">
          Report <span className="text-red-500">scams</span> to help others
        </h3>

        <textarea
          className="w-full mt-4 p-3 border rounded-md"
          rows="4"
          placeholder="Leave your report here..."
        />

        <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md">
          Report
        </button>
      </section>

      {/* BLOG */}
      <section className="max-w-5xl mx-auto mt-12 px-6">
        <h3 className="text-lg font-semibold text-center">Latest Blog Posts</h3>
        <p className="text-sm text-gray-500 text-center mt-1">
          Be best informed with the latest trends in fraud and scam protection
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <BlogCard
            image={Blog1}
            date="Dec 12, 2025"
            title="How to Detect Fake Vendors on Social Links"
            excerpt="Learn red flags to identify scam vendors quickly."
          />

          <BlogCard
            image={Blog2}
            date="Nov 13, 2025"
            title="How Fake Online Vendors Operate"
            excerpt="Understand scam patterns used by online fraudsters."
          />

          <BlogCard
            image={Blog3}
            date="Nov 12, 2025"
            title="How Sponsored Ads Are Detected"
            excerpt="Discover how scam ads bypass social media checks."
          />
        </div>

        <div className="text-center mt-8">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-md">
            View all Blog Posts
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto mt-14 px-6 flex flex-col gap-6 py-8">
        <FeatureCard
          title="Instant Verification"
          description="Verify social media handles against scam records."
          icon="⚡"
        />
        <FeatureCard
          title="Community Reports"
          description="Powered by thousands of real user verifications."
          icon="👥"
        />
        <FeatureCard
          title="Risk Score"
          description="Analysis of the authenticity of online vendor links."
          icon="🚨"
        />
      </section>
    </div>
  );
}
