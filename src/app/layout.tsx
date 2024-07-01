import { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/contexts/toast-provider';

export const metadata: Metadata = {
  title: 'MusiQ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
