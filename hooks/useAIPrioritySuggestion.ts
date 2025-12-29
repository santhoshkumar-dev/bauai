import { useMutation } from "@tanstack/react-query";
import type { Priority } from "@/types";

interface PrioritySuggestionInput {
  material_name: string;
  quantity: number;
  unit: string;
  notes?: string;
}

interface PrioritySuggestionOutput {
  priority: Priority;
  explanation: string;
}

/**
 * Hook for AI-powered priority suggestions using Groq API.
 *
 * Calls the backend API route which securely handles the Groq API key
 * and returns a context-aware priority suggestion based on material
 * characteristics, quantity, and optional notes.
 */
export const useAIPrioritySuggestion = () => {
  return useMutation({
    mutationFn: async (
      input: PrioritySuggestionInput
    ): Promise<PrioritySuggestionOutput> => {
      const response = await fetch("/api/ai/priority", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          material_name: input.material_name,
          quantity: input.quantity,
          unit: input.unit,
          notes: input.notes,
        }),
      });

      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(error.error || "Failed to get AI suggestion");
      }

      const data = await response.json();
      return {
        priority: data.priority,
        explanation: data.explanation,
      };
    },
  });
};
