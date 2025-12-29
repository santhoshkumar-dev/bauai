import { z } from "zod";

export const materialRequestSchema = z.object({
  material_name: z
    .string()
    .min(1, "Material name is required")
    .max(200, "Material name too long"),
  quantity: z.number().positive("Quantity must be positive"),
  unit: z.enum(["kg", "m", "pieces", "m2", "m3", "liters", "tons"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  notes: z.string().max(1000, "Notes too long").optional(),
  project_id: z.string().uuid().optional(),
});

export type MaterialRequestFormData = z.infer<typeof materialRequestSchema>;
