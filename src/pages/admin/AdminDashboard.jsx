import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Row from "./Row";
import StatCard from "./StatCard";


export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-40">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Escrow Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by business name, ID, owner"
              className="pl-10 pr-4 py-2 rounded-lg border text-sm focus:outline-none"
            />
          </div>
          <img
            src="https://i.pravatar.cc/40"
            alt="Admin"
            className="w-9 h-9 rounded-full"
          />
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard title="Total Transactions" value="8" />
        <StatCard title="In Escrow" value="4" />
        <StatCard title="Completed" value="2" />
        <StatCard title="Disputed" value="3" />
      </div>

      {/* Table */}
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Transactions</h2>
            <div className="flex gap-2">
              <Button size="sm" variant="default">
                All
              </Button>
              <Button size="sm" variant="outline">
                In Escrow
              </Button>
              <Button size="sm" variant="outline">
                Completed
              </Button>
              <Button size="sm" variant="outline">
                Disputed
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="py-2">Transaction ID</th>
                  <th>Buyer</th>
                  <th>Vendor</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <Row
                  id="TXN-001"
                  buyer="James Akide"
                  vendor="Jenna Footwear"
                  amount="₦30,000"
                  status="Completed"
                />
                <Row
                  id="TXN-002"
                  buyer="Joel Ayinde"
                  vendor="Mickey Electricals"
                  amount="₦50,000"
                  status="Completed"
                />
                <Row
                  id="TXN-003"
                  buyer="Femidoyo Oye"
                  vendor="Timmy Web Developers"
                  amount="₦30,000"
                  status="In Escrow"
                />
                <Row
                  id="TXN-004"
                  buyer="Joy Nsude"
                  vendor="Blyt Food Mart"
                  amount="₦38,000"
                  status="In Escrow"
                />
                <Row
                  id="TXN-005"
                  buyer="Scidu Ahmed"
                  vendor="Jenna Footwear"
                  amount="₦30,000"
                  status="Disputed"
                />
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
