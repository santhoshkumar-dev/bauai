import { Badge } from "@/components/ui/badge";
import type { Priority } from "@/types";
import { cn } from "@/lib/utils";

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

const PRIORITY_CONFIG: Record<Priority, { label: string; className: string }> =
  {
    low: {
      label: "Low",
      className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    },
    medium: {
      label: "Medium",
      className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    },
    high: {
      label: "High",
      className: "bg-orange-100 text-orange-800 hover:bg-orange-100",
    },
    urgent: {
      label: "Urgent",
      className: "bg-red-100 text-red-800 hover:bg-red-100",
    },
  };

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = PRIORITY_CONFIG[priority];

  return (
    <Badge className={cn(config.className, className)}>{config.label}</Badge>
  );
}
