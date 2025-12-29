import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { UpdateMaterialRequest, MaterialRequest } from "@/types";

export const useUpdateRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: UpdateMaterialRequest;
    }) => {
      const { data, error } = await supabase
        .from("material_requests")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    // Optimistic update
    onMutate: async ({ id, updates }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["material-requests"] });

      // Snapshot the previous value
      const previousRequests = queryClient.getQueryData(["material-requests"]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ["material-requests"],
        (old: MaterialRequest[] = []) => {
          return old.map((request) =>
            request.id === id ? { ...request, ...updates } : request
          );
        }
      );

      return { previousRequests };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousRequests) {
        queryClient.setQueryData(
          ["material-requests"],
          context.previousRequests
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["material-requests"] });
    },
  });
};
