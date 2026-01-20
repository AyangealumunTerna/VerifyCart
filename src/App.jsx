import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ProceedToPay from "./pages/ProceedToPay";
import WaitingForVendor from "./pages/WaitingForVendor";
import VendorEscrow from "./pages/VendorEscrow";
import WaitingForDelivery from "./pages/WaitingForDelivery";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/proceed-to-pay" element={<ProceedToPay />} />
      <Route path="/waiting-for-vendor" element={<WaitingForVendor />} />
      <Route path="/waiting-for-delivery" element={<WaitingForDelivery />} />
      <Route path="/escrow/:escrowId" element={<VendorEscrow />} />
    </Routes>
  );
}
