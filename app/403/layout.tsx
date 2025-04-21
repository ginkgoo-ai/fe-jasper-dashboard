import '@/style/global.css';

export const metadata = {
  title: '403',
  description: '403',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
