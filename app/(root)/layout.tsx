import { Toaster } from "sonner";
import type { Metadata } from "next";
import Header from "@/components/header";
import "./globals.css";
import GlobalManager from "@/customManager/GlobalManager";

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
        <main className="flex flex-1">{children}</main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
