"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Trash2, Download } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { StatusDropdown } from "./StatusDropdown";
import { ConfirmDialog } from "./ConfirmDialog";
import { EmptyState } from "@/components/common/EmptyState";
import { useUpdateRequest } from "@/hooks/useUpdateRequest";
import { useDeleteRequest } from "@/hooks/useDeleteRequest";
import { exportToCSV } from "@/lib/exportCSV";
import type { MaterialRequest, Status } from "@/types";
import type { MaterialRequestWithUser } from "@/hooks/useMaterialRequests";
import { format } from "date-fns";

interface MaterialTableProps {
  requests: MaterialRequestWithUser[];
  isLoading?: boolean;
  onEdit: (request: MaterialRequest) => void;
}

export function MaterialTable({
  requests,
  isLoading,
  onEdit,
}: MaterialTableProps) {
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    type: "status" | "delete";
    requestId?: string;
    newStatus?: Status;
  }>({ open: false, type: "status" });

  const updateRequest = useUpdateRequest();
  const deleteRequest = useDeleteRequest();

  const handleStatusChange = (requestId: string, newStatus: Status) => {
    setConfirmDialog({
      open: true,
      type: "status",
      requestId,
      newStatus,
    });
  };

  const handleDeleteClick = (requestId: string) => {
    setConfirmDialog({
      open: true,
      type: "delete",
      requestId,
    });
  };

  const handleConfirm = async () => {
    if (!confirmDialog.requestId) return;

    try {
      if (confirmDialog.type === "status" && confirmDialog.newStatus) {
        await updateRequest.mutateAsync({
          id: confirmDialog.requestId,
          updates: { status: confirmDialog.newStatus },
        });
      } else if (confirmDialog.type === "delete") {
        await deleteRequest.mutateAsync(confirmDialog.requestId);
      }
    } catch (error) {
      console.error("Operation failed:", error);
    } finally {
      setConfirmDialog({ open: false, type: "status" });
    }
  };

  const handleExport = () => {
    exportToCSV(requests);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  // Empty state
  if (requests.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button onClick={handleExport} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export to CSV
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Material Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Requested At</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  {request.material_name}
                </TableCell>
                <TableCell>
                  {request.quantity} {request.unit}
                </TableCell>
                <TableCell>
                  <StatusDropdown
                    currentStatus={request.status}
                    onChange={(newStatus) =>
                      handleStatusChange(request.id, newStatus)
                    }
                    disabled={updateRequest.isPending}
                  />
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={request.priority} />
                </TableCell>
                <TableCell>
                  <div className="text-sm">{request.requested_by_email}</div>
                </TableCell>
                <TableCell>
                  {format(new Date(request.requested_at), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="truncate text-sm text-gray-600">
                    {request.notes || "—"}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(request)}
                      title="Edit request"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(request.id)}
                      disabled={deleteRequest.isPending}
                      title="Delete request"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        open={confirmDialog.open && confirmDialog.type === "status"}
        onOpenChange={(open) => setConfirmDialog({ open, type: "status" })}
        title="Confirm Status Change"
        description={`Are you sure you want to change the status to "${confirmDialog.newStatus}"? This action cannot be undone.`}
        onConfirm={handleConfirm}
      />

      <ConfirmDialog
        open={confirmDialog.open && confirmDialog.type === "delete"}
        onOpenChange={(open) => setConfirmDialog({ open, type: "delete" })}
        title="Delete Request"
        description="Are you sure you want to delete this request? This action cannot be undone."
        onConfirm={handleConfirm}
        confirmText="Delete"
      />
    </>
  );
}
