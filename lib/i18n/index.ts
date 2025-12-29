import { en } from "./translations/en";
import { de } from "./translations/de";

export type Locale = "en" | "de";
export type TranslationKey = keyof typeof en;

const translations = {
  en,
  de,
} as const;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export function getDefaultLocale(): Locale {
  if (typeof window === "undefined") return "en";

  // Check localStorage first
  const stored = localStorage.getItem("locale") as Locale | null;
  if (stored && (stored === "en" || stored === "de")) {
    return stored;
  }

  // Fallback to browser language
  const browserLang = navigator.language.split("-")[0];
  return browserLang === "de" ? "de" : "en";
}

export function setLocale(locale: Locale) {
  if (typeof window !== "undefined") {
    localStorage.setItem("locale", locale);
  }
}
