import { Button } from "@/components/ui/button";

function Row({ id, buyer, vendor, amount, status }) {
  const statusStyles = {
    Completed: "bg-green-100 text-green-700",
    "In Escrow": "bg-blue-100 text-blue-700",
    Disputed: "bg-red-100 text-red-700",
  };

  return (
    <tr className="border-t">
      <td className="py-3">{id}</td>
      <td>{buyer}</td>
      <td>{vendor}</td>
      <td>{amount}</td>
      <td>
        <span
          className={`px-2 py-1 rounded-full text-xs ${statusStyles[status]}`}
        >
          {status}
        </span>
      </td>
      <td>Last month</td>
      <td>
        <Button
          size="sm"
          variant={status === "Completed" ? "outline" : "default"}
        >
          {status === "In Escrow"
            ? "Hold"
            : status === "Disputed"
              ? "Resolve"
              : "Release Funds"}
        </Button>
      </td>
    </tr>
  );
}
export default Row;
