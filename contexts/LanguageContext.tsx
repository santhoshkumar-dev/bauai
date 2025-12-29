"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getTranslations,
  getDefaultLocale,
  setLocale,
  type Locale,
} from "@/lib/i18n";

type Translations = ReturnType<typeof getTranslations>;

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize locale from storage or browser, defaulting to "en" for SSR
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      return getDefaultLocale();
    }
    return "en";
  });
  const [mounted, setMounted] = useState(() => typeof window === "undefined");

  // Mark as mounted after initial render to prevent hydration mismatch
  useEffect(() => {
    // Use setTimeout to defer state update and avoid synchronous setState in effect
    const timer = setTimeout(() => {
      setMounted(true);
      // Sync with localStorage on mount
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("locale") as Locale | null;
        if (stored && (stored === "en" || stored === "de")) {
          setLocaleState(stored);
        }
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setLocale(newLocale);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider
      value={{
        locale,
        t: getTranslations(locale),
        setLocale: handleSetLocale,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
