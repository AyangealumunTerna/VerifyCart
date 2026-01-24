import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // mock credentials
    const ADMIN_EMAIL = "admin@verifycart.com";
    const ADMIN_PASSWORD = "admin962Verify";

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center justify-center px-4">
      {/* Home button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-sm text-indigo-600  px-3 py-1 bg-transparent border border-indigo-200 rounded-md hover:bg-white"
      >
        ← Back to Home
      </button>

      {/* Login card */}
      <div className="max-w-sm w-full bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-xl font-bold text-center">Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded-md text-sm"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded-md text-sm"
        />

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-2 rounded-md"
        >
          Login
        </button>

        <p className="text-xs text-gray-400 text-center">
          Demo credentials only
        </p>
      </div>
    </div>
  );
}
