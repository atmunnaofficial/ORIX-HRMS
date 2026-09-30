'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, UserCheck, Loader2 } from 'lucide-react';
import { registerUser } from '@/actions/auth';
import { toast } from 'sonner';
import Link from 'next/link';

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const res = await registerUser(null, formData);

      if (res.success) {
        toast.success(res.message);
        router.push('/auth/login');
      } else {
        toast.error(res.error || 'Registration failed!');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-indigo-500/5 space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-bold tracking-tight text-white">
          Create Account
        </h2>
        <p className="text-xs text-zinc-400">
          Register new staff credential for ORIX HRMS access
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300">
            Employee ID
          </label>
          <div className="relative">
            <UserCheck className="absolute inset-y-0 left-3.5 my-auto w-4 h-4 text-zinc-500" />
            <input
              name="employeeId"
              type="text"
              required
              disabled={loading}
              placeholder="EMP-001"
              className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute inset-y-0 left-3.5 my-auto w-4 h-4 text-zinc-500" />
            <input
              name="password"
              type="password"
              required
              disabled={loading}
              placeholder="••••••••"
              className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/25 cursor-pointer disabled:opacity-50">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="text-center text-xs text-zinc-500">
        Already have an account?{' '}
        <Link
          href="/auth/login"
          className="text-indigo-400 font-medium hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
