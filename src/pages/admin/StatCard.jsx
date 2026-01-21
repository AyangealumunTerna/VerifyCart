import { Card, CardContent } from "@/components/ui/card";

function StatCard({ title, value }) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-6">
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
      </CardContent>
    </Card>
  );
}
export default StatCard;