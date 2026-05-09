import type { Metadata } from "next";
import { cookies } from "next/headers";

import { LocaleProvider } from "@/components/providers/LocaleProvider";
import type { Locale } from "@/lib/types";

import "./globals.css";

export const metadata: Metadata = {
  title: "BridgeChat",
  description: "Guided research demo from labels to understanding.",
};

export function resolveInitialLocale(localeCookie?: string): Locale | undefined {
  if (localeCookie === "en") {
    return "en";
  }

  if (localeCookie === "zh") {
    return "zh";
  }

  return undefined;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialLocale = resolveInitialLocale(cookieStore.get("bridgechat-locale")?.value);

  return (
    <html lang={(initialLocale ?? "zh") === "zh" ? "zh-CN" : "en"}>
      <body className="antialiased">
        <LocaleProvider initialLocale={initialLocale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
