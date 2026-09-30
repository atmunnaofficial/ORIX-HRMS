import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'ORIX - HRMS Core',
  description: 'Professional HR Management Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen antialiased">
        {/* Sonner Toaster Setup */}
        <Toaster
          position="top-center"
          richColors
          theme="dark"
          toastOptions={{
            style: {
              background: '#09090b',
              border: '1px solid #27272a',
              color: '#f4f4f5',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
