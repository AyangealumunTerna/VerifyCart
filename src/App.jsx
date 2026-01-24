import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import FundEscrow from "./pages/FundEscrow";
import WaitingForVendor from "./pages/WaitingForVendor";
import VendorInviteAccept from "./pages/VendorInviteAccept";
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
import Verify from "./pages/Verify";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import StartSecurePurchase from "./pages/StartSecurePurchase";
import BuyerVendorAccepted from "./pages/VendorAccepted";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/fund-escrow" element={<FundEscrow />} />
      <Route path="/waiting-for-vendor" element={<WaitingForVendor />} />
      <Route
        path="/waiting-for-delivery/:escrowId"
        element={<WaitingForDelivery />}
      />

      <Route path="/escrow/:escrowId" element={<VendorInviteAccept />} />
      <Route path="/delivery-details/:escrowId" element={<DeliveryDetails />} />
      <Route
        path="/vendor-delivery-view/:escrowId"
        element={<VendorDeliveryView />}
      />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
      <Route path="/admin-dashboard/row" element={<Row />} />
      <Route path="/admin-dashboard/stat-card" element={<StatCard />} />
      <Route path="/confirm-delivery/:escrowId" element={<ConfirmDelivery />} />
      <Route path="/raise-issue" element={<RaiseIssue />} />
      <Route path="/issue-submitted" element={<IssueSubmitted />} />
      <Route
        path="/vendor/delivery/:escrowId"
        element={<VendorDeliveryDetails />}
      />
      <Route path="/verify" element={<Verify />} />
      <Route path="/start-secure-purchase" element={<StartSecurePurchase />} />
      <Route path="/vendor-accepted" element={<BuyerVendorAccepted />} />
    </Routes>
  );
}
