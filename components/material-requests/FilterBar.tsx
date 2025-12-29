"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Status } from "@/types";

interface FilterBarProps {
  statusFilter: Status | "all";
  onStatusFilterChange: (status: Status | "all") => void;
}

export function FilterBar({
  statusFilter,
  onStatusFilterChange,
}: FilterBarProps) {
  const { t } = useLanguage();

  const STATUS_OPTIONS: { value: Status | "all"; label: string }[] = [
    { value: "all", label: t.filter.allRequests },
    { value: "pending", label: t.status.pending },
    { value: "approved", label: t.status.approved },
    { value: "rejected", label: t.status.rejected },
    { value: "fulfilled", label: t.status.fulfilled },
  ];

  return (
    <div className="mb-4 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          {t.filter.filterByStatus}
        </span>
      </div>
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
