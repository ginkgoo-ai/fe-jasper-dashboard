import { Toaster } from "sonner";
import type { Metadata } from "next";
import Header from "@/components/header";
import GlobalManager from "@/customManager/GlobalManager";
import "./globals.css";

export const metadata: Metadata = {
  title: GlobalManager.siteName,
  description: GlobalManager.siteDescription,
};

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-[100vh] w-[100vw] flex-col">
        <Header />
        <main className="flex w-[100vw] flex-1 flex-col items-center">
          <div className="flex w-full max-w-[var(--width-max)] flex-1 flex-col px-[var(--width-padding)]">{children}</div>
        </main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
