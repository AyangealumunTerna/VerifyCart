import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Badge from "../assets/badge.png";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-2">
      <img src={Logo} alt="VerifyCart" className="w-7"/>
      <h1 className="text-xl font-bold text-gray-800">Verify<span className="text-indigo-600">Cart</span> </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
        <img src={Badge} alt="Trust Badge" className="w-4 hidden md:inline"/>
        <span className="hidden md:inline text-sm text-gray-500 ">
          2.3k+ Vendors Verified
        </span>
        </div>
        <button onClick={() =>
            navigate("/login")} className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          Login
        </button>
      </div>
    </nav>
  );
}
