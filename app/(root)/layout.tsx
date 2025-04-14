"use client";

import { Toaster } from "sonner";
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
    onSuccess: (user) => {
      setUserInfo(user);
    },
  });

  return (
      <html lang="en">
        <body className="flex h-[100vh] w-[100vw] flex-col">
          <Header />
          {loading ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <main className="flex flex-1">{children}</main>
          )}
          <Toaster position="top-center" />
        </body>
      </html>
  );
}
