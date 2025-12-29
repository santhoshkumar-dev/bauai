"use client";

import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Priority } from "@/types";
import { cn } from "@/lib/utils";

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

const PRIORITY_CLASSES: Record<Priority, string> = {
  low: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  medium: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  high: "bg-orange-100 text-orange-800 hover:bg-orange-100",
  urgent: "bg-red-100 text-red-800 hover:bg-red-100",
};

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const { t } = useLanguage();

  return (
    <Badge className={cn(PRIORITY_CLASSES[priority], className)}>
      {t.priority[priority]}
    </Badge>
  );
}
