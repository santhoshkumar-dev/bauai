"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-500" />
      <Select
        value={locale}
        onValueChange={(value) => setLocale(value as "en" | "de")}
      >
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{t.language.english}</SelectItem>
          <SelectItem value="de">{t.language.german}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
