"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import {
  materialRequestSchema,
  type MaterialRequestFormData,
} from "@/schema/materialRequest.schema";
import { useUpdateRequest } from "@/hooks/useUpdateRequest";
import { useLanguage } from "@/contexts/LanguageContext";
import type { MaterialRequest, Priority, Unit } from "@/types";

interface EditRequestDialogProps {
  request: MaterialRequest;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UNITS: Unit[] = ["kg", "m", "pieces", "m2", "m3", "liters", "tons"];
const PRIORITIES: Priority[] = ["low", "medium", "high", "urgent"];

export function EditRequestDialog({
  request,
  open,
  onOpenChange,
}: EditRequestDialogProps) {
  const { t, locale } = useLanguage();
  const updateRequest = useUpdateRequest();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<MaterialRequestFormData>({
    resolver: zodResolver(materialRequestSchema),
    defaultValues: {
      material_name: request.material_name,
      quantity: request.quantity,
      unit: request.unit,
      priority: request.priority,
      notes: request.notes || "",
    },
  });

  // Reset form when request changes
  useEffect(() => {
    reset({
      material_name: request.material_name,
      quantity: request.quantity,
      unit: request.unit,
      priority: request.priority,
      notes: request.notes || "",
    });
  }, [request, reset]);

  const onSubmit = async (data: MaterialRequestFormData) => {
    try {
      await updateRequest.mutateAsync({
        id: request.id,
        updates: data,
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update request:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.form.editTitle}</DialogTitle>
          <DialogDescription>{t.form.editDescription}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Material Name */}
          <div className="space-y-2">
            <Label htmlFor="edit_material_name">{t.form.materialName} *</Label>
            <Input
              id="edit_material_name"
              placeholder={t.form.materialNamePlaceholder}
              {...register("material_name")}
            />
            {errors.material_name && (
              <p className="text-sm text-red-600">
                {errors.material_name.message}
              </p>
            )}
          </div>

          {/* Quantity and Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit_quantity">{t.form.quantity} *</Label>
              <Input
                id="edit_quantity"
                type="number"
                step="0.01"
                placeholder="100"
                {...register("quantity", { valueAsNumber: true })}
              />
              {errors.quantity && (
                <p className="text-sm text-red-600">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit_unit">{t.form.unit} *</Label>
              <Select
                value={watch("unit")}
                onValueChange={(value) => setValue("unit", value as Unit)}
              >
                <SelectTrigger id="edit_unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {UNITS.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="edit_priority">{t.form.priority} *</Label>
            <Select
              value={watch("priority")}
              onValueChange={(value) => setValue("priority", value as Priority)}
            >
              <SelectTrigger id="edit_priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PRIORITIES.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {t.priority[priority]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.priority && (
              <p className="text-sm text-red-600">{errors.priority.message}</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="edit_notes">{t.form.notes}</Label>
            <Textarea
              id="edit_notes"
              placeholder={t.form.notesPlaceholder}
              rows={3}
              {...register("notes")}
            />
            {errors.notes && (
              <p className="text-sm text-red-600">{errors.notes.message}</p>
            )}
          </div>

          {/* Current Status Info */}
          <Alert>
            <AlertDescription>
              {t.table.status}: <strong>{t.status[request.status]}</strong>
              <br />
              {locale === "de"
                ? "Um den Status zu ändern, verwenden Sie das Dropdown in der Tabelle."
                : "To change the status, use the dropdown in the table."}
            </AlertDescription>
          </Alert>

          {/* Error Alert */}
          {updateRequest.isError && (
            <Alert variant="destructive">
              <AlertDescription>{t.errors.updateFailed}</AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t.buttons.cancel}
            </Button>
            <Button type="submit" disabled={updateRequest.isPending}>
              {updateRequest.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t.buttons.saving}
                </>
              ) : (
                t.buttons.save
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
