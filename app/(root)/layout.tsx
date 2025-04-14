"use client";

import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import Header from "@/components/header";
import useRequest from "@/hooks/useRequest";
import { getUserInfo } from "@/service/api";
import { useUserStore } from "@/store";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUserInfo } = useUserStore();

  const { loading } = useRequest(getUserInfo, {
    errorRetryCount: 1,
    onSuccess: (user) => {
      setUserInfo(user);
    },
  });

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="flex h-[100vh] w-[100vw] flex-col">
        <ThemeProvider defaultTheme="system" storageKey="jasper|theme">
          <Header className="fixed left-0 top-0 z-10" />
          {loading ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
            </div>
          ) : (
            <main className="flex h-0 w-[100vw] flex-1 flex-col  items-center overflow-y-auto">
              <div className="flex h-0 w-full max-w-[var(--width-max)] flex-1 flex-col px-[var(--width-padding)]">{children}</div>
            </main>
          )}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
