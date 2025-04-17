'use client';

import Header from '@/components/header';
import useRequest from '@/hooks/useRequest';
import { getUserInfo } from '@/service/api';
import { useUserStore } from '@/store';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUserInfo } = useUserStore();

  const { loading, data: user } = useRequest(getUserInfo, {
    errorRetryCount: 1,
    immediate: true,
    onSuccess: user => {
      setUserInfo(user);
    },
  });

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Domine:wght@400..700&family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="flex h-[100vh] w-[100vw] flex-col">
        {loading || !user ? (
          <div className="flex flex-1 h-auto items-center justify-center">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
          </div>
        ) : (
          <ThemeProvider defaultTheme="system" storageKey="jasper|theme">
            <Header className="fixed left-0 top-0 z-10" />(
            <main className="flex h-0 w-[100vw] flex-1 flex-col items-center overflow-y-auto pt-16">
              <div className="flex h-0 w-full max-w-[var(--width-max)] flex-1 flex-col px-[var(--width-padding)]">
                {children}
              </div>
            </main>
            <Toaster position="top-center" />
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
