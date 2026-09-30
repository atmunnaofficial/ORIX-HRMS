'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ShieldCheck,
  CalendarCheck,
  FileText,
  Layers,
  Award,
  ShieldAlert,
  Laptop,
  BarChart3,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';

interface SidebarProps {
  role?: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
}

export default function Sidebar({ role = 'EMPLOYEE' }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    toast.success('Logged out successfully');
    router.push('/auth/login');
  };

  const getNavLinks = () => {
    if (role === 'ADMIN') {
      return [
        { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Employee Management', href: '/admin/employees', icon: Users },
        {
          label: 'Attendance & Shifts',
          href: '/admin/attendance',
          icon: CalendarCheck,
        },
        { label: 'Leave Management', href: '/admin/leaves', icon: FileText },
        { label: 'Payroll & Finance', href: '/admin/payroll', icon: Layers },
        {
          label: 'Performance & KPIs',
          href: '/admin/performance',
          icon: Award,
        },
        {
          label: 'Compliance & Audit',
          href: '/admin/compliance',
          icon: ShieldAlert,
        },
        { label: 'Asset Management', href: '/admin/assets', icon: Laptop },
        {
          label: 'Reports & Analytics',
          href: '/admin/reports',
          icon: BarChart3,
        },
        { label: 'Settings', href: '/admin/settings', icon: Settings },
      ];
    } else if (role === 'MANAGER') {
      return [
        {
          label: 'Dashboard',
          href: '/manager/dashboard',
          icon: LayoutDashboard,
        },
        { label: 'My Team Directory', href: '/manager/team', icon: Users },
        {
          label: 'Team Attendance',
          href: '/manager/attendance',
          icon: Calendar,
        },
        { label: 'Leave Approvals', href: '/manager/leaves', icon: FileText },
        {
          label: 'Team Performance',
          href: '/manager/performance',
          icon: Award,
        },
        { label: 'Settings', href: '/manager/settings', icon: Settings },
      ];
    } else {
      return [
        {
          label: 'Dashboard',
          href: '/employee/dashboard',
          icon: LayoutDashboard,
        },
        {
          label: 'My Attendance',
          href: '/employee/attendance',
          icon: Calendar,
        },
        { label: 'Leave Requests', href: '/employee/leaves', icon: FileText },
        { label: 'Settings', href: '/employee/settings', icon: Settings },
      ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col h-screen shrink-0">
      {/* Brand Header */}
      <div className="h-16 px-6 border-b border-zinc-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/30">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight text-white leading-none">
            ORIX HRMS
          </span>
          <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase mt-1">
            {role} PORTAL
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}>
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Footer */}
      <div className="p-3 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer">
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
