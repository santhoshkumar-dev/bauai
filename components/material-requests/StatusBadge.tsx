"use client";

import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Status } from "@/types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const STATUS_CLASSES: Record<Status, string> = {
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  approved: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  rejected: "bg-red-100 text-red-800 hover:bg-red-100",
  fulfilled: "bg-green-100 text-green-800 hover:bg-green-100",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { t } = useLanguage();

  return (
    <Badge className={cn(STATUS_CLASSES[status], className)}>
      {t.status[status]}
    </Badge>
  );
}
