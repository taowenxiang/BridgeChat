"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { Locale } from "@/lib/types";

const LOCALE_COOKIE_KEY = "bridgechat-locale";
const LOCALE_STORAGE_KEY = "bridgechat-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readCookieLocale(): Locale | null {
  if (typeof document === "undefined") {
    return null;
  }

  const localeCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${LOCALE_COOKIE_KEY}=`))
    ?.split("=")[1];

  if (localeCookie === "en") {
    return "en";
  }

  if (localeCookie === "zh") {
    return "zh";
  }

  return null;
}

function readPersistedLocale(): Locale | null {
  const cookieLocale = readCookieLocale();

  if (cookieLocale) {
    return cookieLocale;
  }

  try {
    const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);

    if (storedLocale === "en") {
      return "en";
    }

    if (storedLocale === "zh") {
      return "zh";
    }

    return null;
  } catch {
    return null;
  }
}

function persistLocale(locale: Locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Ignore storage failures so locale state still works in restricted contexts.
  }

  document.cookie = `${LOCALE_COOKIE_KEY}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale ?? "zh");
  const [isClientLocaleReady, setIsClientLocaleReady] = useState(initialLocale !== undefined);

  useEffect(() => {
    if (initialLocale !== undefined) {
      return;
    }

    const persistedLocale = readPersistedLocale();

    if (persistedLocale) {
      setLocale(persistedLocale);
    }

    setIsClientLocaleReady(true);
  }, [initialLocale]);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";

    if (!isClientLocaleReady) {
      return;
    }

    persistLocale(locale);
  }, [isClientLocaleReady, locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }

  return context;
}
