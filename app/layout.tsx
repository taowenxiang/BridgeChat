import type { Metadata } from "next";

import { LocaleProvider } from "@/components/providers/LocaleProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "BridgeChat",
  description: "Research-driven chat prototype from labels to understanding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
