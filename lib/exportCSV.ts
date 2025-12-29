import type { MaterialRequest } from "@/types";
import type { MaterialRequestWithUser } from "@/hooks/useMaterialRequests";

export const exportToCSV = (
  requests: MaterialRequestWithUser[],
  filename?: string
) => {
  const headers = [
    "Material Name",
    "Quantity",
    "Unit",
    "Status",
    "Priority",
    "Requested By",
    "Requested At",
    "Notes",
  ];

  const rows = requests.map((req) => [
    req.material_name,
    req.quantity.toString(),
    req.unit,
    req.status,
    req.priority,
    req.requested_by_email || req.requested_by,
    new Date(req.requested_at).toLocaleDateString(),
    req.notes || "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    filename ||
      `material-requests-${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
