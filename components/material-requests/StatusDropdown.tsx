import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "./StatusBadge";
import type { Status } from "@/types";

interface StatusDropdownProps {
  currentStatus: Status;
  onChange: (status: Status) => void;
  disabled?: boolean;
}

// Define allowed status transitions
const STATUS_TRANSITIONS: Record<Status, Status[]> = {
  pending: ["pending", "approved", "rejected"],
  approved: ["approved", "fulfilled"],
  rejected: ["rejected"],
  fulfilled: ["fulfilled"],
};

export function StatusDropdown({
  currentStatus,
  onChange,
  disabled,
}: StatusDropdownProps) {
  const availableStatuses = STATUS_TRANSITIONS[currentStatus];

  return (
    <Select value={currentStatus} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {availableStatuses.map((status) => (
          <SelectItem key={status} value={status}>
            <StatusBadge status={status} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
