import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { MaterialRequest, Status } from "@/types";

/**
 * Extended material request with user email
 */
export interface MaterialRequestWithUser extends MaterialRequest {
  requested_by_email: string;
}

export const useMaterialRequests = (statusFilter?: Status) => {
  return useQuery<MaterialRequestWithUser[]>({
    queryKey: ["material-requests", statusFilter],
    queryFn: async () => {
      // 1️⃣ Fetch material requests
      let query = supabase
        .from("material_requests")
        .select("*")
        .order("requested_at", { ascending: false });

      if (statusFilter) {
        query = query.eq("status", statusFilter);
      }

      const { data: requests, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      if (!requests || requests.length === 0) {
        return [];
      }

      // 2️⃣ Collect unique user IDs
      const userIds = Array.from(new Set(requests.map((r) => r.requested_by)));

      // 3️⃣ Fetch emails from profiles (SAFE TABLE)
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("id, email")
        .in("id", userIds);

      if (profileError) {
        throw new Error(profileError.message);
      }

      // 4️⃣ Build lookup map
      const emailByUserId = new Map<string, string>();
      profiles?.forEach((profile) => {
        if (profile.email) {
          emailByUserId.set(profile.id, profile.email);
        }
      });

      // 5️⃣ Merge email into requests
      return requests.map((request) => ({
        ...request,
        requested_by_email:
          emailByUserId.get(request.requested_by) ?? request.requested_by,
      }));
    },
  });
};
