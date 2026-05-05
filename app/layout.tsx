import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "BridgeChat",
  description: "Guided research demo from labels to understanding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
