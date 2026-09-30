'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { Topbar } from './Topbar';

interface DashboardLayoutProps {
  children: ReactNode;
  roleTitle?: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
}

export function DashboardLayout({
  children,
  roleTitle = 'ADMIN',
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden antialiased">
      <Sidebar role={roleTitle} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar roleTitle={roleTitle} />
        <main className="flex-1 overflow-y-auto bg-zinc-950/50 p-6 lg:p-8">
          <div className="w-full space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
