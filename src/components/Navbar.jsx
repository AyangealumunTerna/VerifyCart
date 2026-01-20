export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <h1 className="text-xl font-bold text-gray-800">Verify<span className="text-indigo-600">Cart</span> </h1>

      <div className="flex items-center gap-4">
        <span className="hidden md:inline text-sm text-gray-500">
          2.3k+ Vendors Verified
        </span>
        <button className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md">
          Login
        </button>
      </div>
    </nav>
  );
}
