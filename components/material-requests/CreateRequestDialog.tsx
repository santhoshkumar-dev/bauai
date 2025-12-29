"use client";

import { useState } from "react";
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
import { Sparkles, Loader2 } from "lucide-react";
import {
  materialRequestSchema,
  type MaterialRequestFormData,
} from "@/schema/materialRequest.schema";
import { useCreateRequest } from "@/hooks/useCreateRequest";
import { useAIPrioritySuggestion } from "@/hooks/useAIPrioritySuggestion";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Priority, Unit } from "@/types";

interface CreateRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UNITS: Unit[] = ["kg", "m", "pieces", "m2", "m3", "liters", "tons"];
const PRIORITIES: Priority[] = ["low", "medium", "high", "urgent"];

export function CreateRequestDialog({
  open,
  onOpenChange,
}: CreateRequestDialogProps) {
  const { t } = useLanguage();
  const [aiSuggestion, setAiSuggestion] = useState<{
    priority: Priority;
    explanation: string;
  } | null>(null);

  const createRequest = useCreateRequest();
  const { mutateAsync: getAISuggestion, isPending: isAiLoading } =
    useAIPrioritySuggestion();

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
      priority: "medium",
      unit: "pieces",
    },
  });

  const materialName = watch("material_name");
  const quantity = watch("quantity");
  const unit = watch("unit");
  const notes = watch("notes");

  const handleAISuggest = async () => {
    if (!materialName || !quantity) {
      return;
    }

    try {
      const result = await getAISuggestion({
        material_name: materialName,
        quantity,
        unit,
        notes: notes || undefined,
      });

      setAiSuggestion(result);
      setValue("priority", result.priority);
    } catch (error) {
      console.error("AI suggestion failed:", error);
    }
  };

  const onSubmit = async (data: MaterialRequestFormData) => {
    try {
      await createRequest.mutateAsync(data);
      reset();
      setAiSuggestion(null);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create request:", error);
    }
  };

  const handleClose = () => {
    reset();
    setAiSuggestion(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.form.createTitle}</DialogTitle>
          <DialogDescription>{t.form.createDescription}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Material Name */}
          <div className="space-y-2">
            <Label htmlFor="material_name">{t.form.materialName} *</Label>
            <Input
              id="material_name"
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
              <Label htmlFor="quantity">{t.form.quantity} *</Label>
              <Input
                id="quantity"
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
              <Label htmlFor="unit">{t.form.unit} *</Label>
              <Select
                value={watch("unit")}
                onValueChange={(value) => setValue("unit", value as Unit)}
              >
                <SelectTrigger id="unit">
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

          {/* Priority with AI Suggestion */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="priority">{t.form.priority} *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAISuggest}
                disabled={!materialName || !quantity || isAiLoading}
              >
                {isAiLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4 mr-2" />
                )}
                {t.buttons.aiSuggest}
              </Button>
            </div>
            <Select
              value={watch("priority")}
              onValueChange={(value) => setValue("priority", value as Priority)}
            >
              <SelectTrigger id="priority">
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

          {/* AI Suggestion Alert */}
          {aiSuggestion && (
            <Alert className="border-blue-200 bg-blue-50">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-900">
                <strong>{t.form.aiSuggestion}:</strong>{" "}
                {aiSuggestion.explanation}
              </AlertDescription>
            </Alert>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">{t.form.notes}</Label>
            <Textarea
              id="notes"
              placeholder={t.form.notesPlaceholder}
              rows={3}
              {...register("notes")}
            />
            {errors.notes && (
              <p className="text-sm text-red-600">{errors.notes.message}</p>
            )}
          </div>

          {/* Error Alert */}
          {createRequest.isError && (
            <Alert variant="destructive">
              <AlertDescription>{t.errors.createFailed}</AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              {t.buttons.cancel}
            </Button>
            <Button type="submit" disabled={createRequest.isPending}>
              {createRequest.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t.buttons.creating}
                </>
              ) : (
                t.buttons.createRequest
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
