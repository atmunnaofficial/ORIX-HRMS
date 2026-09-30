import Link from 'next/link';
import { Shield, ArrowRight, Lock, Users, Activity } from 'lucide-react';

export function LandingHero() {
  return (
    <div className="flex-1 max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center justify-center text-center space-y-8 w-full">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
        <Shield className="w-3.5 h-3.5 text-indigo-400" />
        <span>Enterprise Grade Workforce & Payroll Control System</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
        Next-Generation{' '}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-violet-500">
          HR Management
        </span>{' '}
        Platform
      </h1>

      <p className="text-sm md:text-base text-zinc-400 max-w-xl">
        Streamline employee onboarding, automated shift attendance tracking,
        compliance auditing, and secure payroll management in a single unified
        dashboard.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
        <Link
          href="/auth/login"
          className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded transition-all shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2">
          <span>Access Control Portal</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-12 text-left">
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded p-6 space-y-3">
          <div className="w-10 h-10 rounded bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Users className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-semibold text-white">
            Smart Employee Registry
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Manage multi-tier corporate roles, department allocations, shift
            settings, and custom allowances seamlessly.
          </p>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded p-6 space-y-3">
          <div className="w-10 h-10 rounded bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Activity className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-semibold text-white">
            Automated Attendance
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Real-time shift tracking, auto-locking attendance logs, overtime
            calculations, and comprehensive audit streams.
          </p>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded p-6 space-y-3">
          <div className="w-10 h-10 rounded bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-semibold text-white">
            Secure Payroll Engine
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Calculate exact salaries with integrated tax deductions, tiffin
            bills, and monthly cycle reports securely.
          </p>
        </div>
      </div>
    </div>
  );
}
