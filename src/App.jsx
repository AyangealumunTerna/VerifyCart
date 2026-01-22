import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ProceedToPay from "./pages/ProceedToPay";
import WaitingForVendor from "./pages/WaitingForVendor";
import VendorEscrow from "./pages/VendorEscrow";
import WaitingForDelivery from "./pages/WaitingForDelivery";
import DeliveryDetails from "./pages/DeliveryDetails";
import VendorDeliveryView from "./pages/VendorDeliveryView";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Row from "./pages/admin/Row";
import StatCard from "./pages/admin/StatCard";
import ConfirmDelivery from "./pages/ConfirmDelivery";
import RaiseIssue from "./pages/RaiseIssue";
import IssueSubmitted from "./pages/IssueSubmitted";
import VendorDeliveryDetails from "./pages/VendorDeliveryDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/proceed-to-pay" element={<ProceedToPay />} />
      <Route path="/waiting-for-vendor" element={<WaitingForVendor />} />
      <Route path="/waiting-for-delivery" element={<WaitingForDelivery />} />
      <Route path="/escrow/:escrowId" element={<VendorEscrow />} />
      <Route path="/delivery-details/:escrowId" element={<DeliveryDetails />} />
      <Route
        path="/vendor-delivery-view/:escrowId"
        element={<VendorDeliveryView />}
      />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-dashboard/row" element={<Row />} />
      <Route path="/admin-dashboard/stat-card" element={<StatCard />} />
      <Route path="/confirm-delivery" element={<ConfirmDelivery />} />
      <Route path="/raise-issue" element={<RaiseIssue />} />
      <Route path="/issue-submitted" element={<IssueSubmitted />} />
      <Route
        path="/vendor/delivery/:escrowId"
        element={<VendorDeliveryDetails />}
      />
    </Routes>
  );
}
