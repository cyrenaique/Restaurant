"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Locale } from "./translations";

type LanguageContextType = {
  locale: Locale;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "fr",
  toggleLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("fr");

  const toggleLocale = () => {
    setLocale((prev) => (prev === "fr" ? "en" : "fr"));
  };

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
