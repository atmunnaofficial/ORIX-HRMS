'use client';

import { Bell, MessageSquare } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface TopbarProps {
  roleTitle?: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
}

export function Topbar({ roleTitle = 'ADMIN' }: TopbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const rolePrefix = roleTitle ? roleTitle.toLowerCase() : 'admin';

  const getActiveTitle = () => {
    if (!pathname) return 'Dashboard';

    if (pathname.includes('/dashboard')) return 'Dashboard';
    if (pathname.includes('/employees') || pathname.includes('/team'))
      return roleTitle === 'ADMIN'
        ? 'Employee Management'
        : 'My Team Directory';
    if (pathname.includes('/attendance'))
      return roleTitle === 'ADMIN'
        ? 'Attendance & Shifts'
        : roleTitle === 'MANAGER'
          ? 'Team Attendance'
          : 'My Attendance';
    if (pathname.includes('/leaves'))
      return roleTitle === 'ADMIN'
        ? 'Leave Management'
        : roleTitle === 'MANAGER'
          ? 'Leave Approvals'
          : 'Leave Requests';
    if (pathname.includes('/payroll')) return 'Payroll & Finance';
    if (pathname.includes('/performance'))
      return roleTitle === 'ADMIN' ? 'Performance & KPIs' : 'Team Performance';
    if (pathname.includes('/compliance')) return 'Compliance & Audit';
    if (pathname.includes('/assets')) return 'Asset Management';
    if (pathname.includes('/reports')) return 'Reports & Analytics';
    if (pathname.includes('/messages')) return 'Messages';
    if (pathname.includes('/notifications')) return 'Notifications';
    if (pathname.includes('/settings')) return 'Settings';
    if (pathname.includes('/profile')) return 'My Profile';

    return 'Dashboard';
  };

  const currentActiveTitle = getActiveTitle();

  const handleMessageClick = () => {
    router.push(`/${rolePrefix}/messages`);
  };

  const handleNotificationClick = () => {
    router.push(`/${rolePrefix}/notifications`);
  };

  const handleProfileClick = () => {
    router.push(`/${rolePrefix}/profile`);
  };

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-900/60 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
      {/* Ekhane active sidebar item ba page-er title bampashe dekhano hocche */}
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-bold text-white tracking-wide">
          {currentActiveTitle}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications Button */}
        <button
          onClick={handleNotificationClick}
          title="Notifications"
          className="w-10 h-10 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer">
          <Bell className="w-4 h-4" />
        </button>

        {/* Messages Button */}
        <button
          onClick={handleMessageClick}
          title="Messages"
          className="w-10 h-10 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer">
          <MessageSquare className="w-4 h-4" />
        </button>

        {/* Profile Avatar / Badge (Clickable) */}
        <div
          onClick={handleProfileClick}
          title="View My Profile"
          className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-indigo-600/30 hover:border-indigo-500 transition-all cursor-pointer select-none">
          {roleTitle ? roleTitle.slice(0, 2) : 'AD'}
        </div>
      </div>
    </header>
  );
}
