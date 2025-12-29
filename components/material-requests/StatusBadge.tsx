import { Badge } from "@/components/ui/badge";
import type { Status } from "@/types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const STATUS_CONFIG: Record<Status, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  },
  approved: {
    label: "Approved",
    className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-800 hover:bg-red-100",
  },
  fulfilled: {
    label: "Fulfilled",
    className: "bg-green-100 text-green-800 hover:bg-green-100",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <Badge className={cn(config.className, className)}>{config.label}</Badge>
  );
}
