export type Status = "pending" | "approved" | "rejected" | "fulfilled";
export type Priority = "low" | "medium" | "high" | "urgent";
export type Unit = "kg" | "m" | "pieces" | "m2" | "m3" | "liters" | "tons";

export interface MaterialRequest {
  id: string;
  project_id?: string;
  material_name: string;
  quantity: number;
  unit: Unit;
  status: Status;
  priority: Priority;
  requested_by: string;
  requested_at: string;
  notes?: string;
  company_id: string;
  updated_at: string;
}

export interface CreateMaterialRequest {
  project_id?: string;
  material_name: string;
  quantity: number;
  unit: Unit;
  priority: Priority;
  notes?: string;
}

export interface UpdateMaterialRequest {
  material_name?: string;
  quantity?: number;
  unit?: Unit;
  status?: Status;
  priority?: Priority;
  notes?: string;
}

export interface Profile {
  id: string;
  company_id: string;
  email?: string;
  created_at: string;
}
