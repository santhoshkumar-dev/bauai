import { useMutation } from "@tanstack/react-query";
import type { Priority } from "@/types";

interface PrioritySuggestionInput {
  material_name: string;
  quantity: number;
  unit: string;
}

interface PrioritySuggestionOutput {
  priority: Priority;
  explanation: string;
}

export const useAIPrioritySuggestion = () => {
  return useMutation({
    mutationFn: async (
      input: PrioritySuggestionInput
    ): Promise<PrioritySuggestionOutput> => {
      // Simulate AI processing delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const { material_name, quantity, unit } = input;
      const lowerName = material_name.toLowerCase();

      // Critical materials that need urgent attention
      const urgentMaterials = [
        "cement",
        "concrete",
        "rebar",
        "steel",
        "reinforcement",
      ];

      // Important structural materials
      const highPriorityMaterials = [
        "brick",
        "timber",
        "wood",
        "insulation",
        "beam",
        "column",
      ];

      // Check for urgent conditions
      if (urgentMaterials.some((mat) => lowerName.includes(mat))) {
        if (quantity > 100) {
          return {
            priority: "urgent",
            explanation:
              "Critical construction material with high quantity. Delays could impact project timeline significantly.",
          };
        }
        return {
          priority: "high",
          explanation:
            "Critical construction material requiring prompt procurement.",
        };
      }

      // Check for high priority materials
      if (highPriorityMaterials.some((mat) => lowerName.includes(mat))) {
        return {
          priority: "high",
          explanation:
            "Essential structural material needed for construction progress.",
        };
      }

      // Quantity-based prioritization
      if (quantity > 500) {
        return {
          priority: "high",
          explanation:
            "Large quantity requires advance procurement and logistics planning.",
        };
      }

      if (quantity > 100) {
        return {
          priority: "medium",
          explanation:
            "Moderate quantity, standard procurement timeline applicable.",
        };
      }

      // Default to low priority
      return {
        priority: "low",
        explanation:
          "Small quantity, can be procured as needed without urgency.",
      };
    },
  });
};
