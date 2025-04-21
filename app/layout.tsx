'use client';

import useRequest from '@/hooks/useRequest';
import { getUserInfo } from '@/service/api';
import { useUserStore } from '@/store';
import '@/style/global.css';
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUserInfo } = useUserStore();
  const router = useRouter();

  const { loading, data: user } = useRequest(getUserInfo, {
    errorRetryCount: 1,
    immediate: true,
    onSuccess: user => {
      setUserInfo(user);

      const pathname = window.location.pathname;

      if (!user.enabled && pathname !== '/403') {
        router.replace('/403');
      } else if (user.enabled && pathname === '/403') {
        router.replace('/');
      }
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
          <>{children}</>
        )}
      </body>
    </html>
  );
}
