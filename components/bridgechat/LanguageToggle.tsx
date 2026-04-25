"use client";

import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCopy } from "@/lib/copy";
import { useLocale } from "@/components/providers/LocaleProvider";

export function LanguageToggle() {
  const { locale, toggleLocale } = useLocale();
  const copy = getCopy(locale);

  return (
    <Button variant="secondary" onClick={toggleLocale}>
      <Languages className="h-4 w-4" />
      {copy.languageButton}
    </Button>
  );
}
