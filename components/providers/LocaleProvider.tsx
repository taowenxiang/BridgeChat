"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { Locale } from "@/lib/types";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const previousDocumentLangRef = useRef<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("bridgechat-locale");
    if (stored === "en" || stored === "zh") {
      setLocale(stored);
    }
  }, []);

  useEffect(() => {
    previousDocumentLangRef.current = document.documentElement.lang;

    return () => {
      if (previousDocumentLangRef.current !== null) {
        document.documentElement.lang = previousDocumentLangRef.current;
      }
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem("bridgechat-locale", locale);
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale: () =>
        setLocale((current) => (current === "en" ? "zh" : "en")),
    }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider.");
  }

  return context;
}
