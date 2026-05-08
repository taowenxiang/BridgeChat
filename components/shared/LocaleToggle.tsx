"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/providers/LocaleProvider";

export function LocaleToggle() {
  const { locale, setLocale } = useLocale();
  const nextLocale = locale === "zh" ? "en" : "zh";

  return (
    <Button
      aria-label={locale === "zh" ? "Switch to English" : "切换到中文"}
      onClick={() => setLocale(nextLocale)}
      size="sm"
      type="button"
      variant="secondary"
    >
      {locale === "zh" ? "EN" : "中文"}
    </Button>
  );
}
