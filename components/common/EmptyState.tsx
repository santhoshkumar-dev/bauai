"use client";

import { PackageOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  const { t } = useLanguage();

  return (
    <div className="text-center py-12">
      <PackageOpen className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        {title || t.emptyState.noRequestsFound}
      </h3>
      {description !== undefined ? (
        description && (
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        )
      ) : (
        <p className="mt-2 text-sm text-gray-500">{t.emptyState.getStarted}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
