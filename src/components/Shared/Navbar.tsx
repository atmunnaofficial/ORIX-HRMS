'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, User } from 'lucide-react';

interface NavbarProps {
  isLoggedIn?: boolean;
  userAvatar?: string;
  userName?: string;
}

export function Navbar({
  isLoggedIn = false,
  userAvatar,
  userName = 'Employee',
}: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-wider text-white">
              ORIX
            </span>
            <span className="text-[10px] px-2 py-0.5 bg-indigo-500/20 text-indigo-400 font-semibold rounded border border-indigo-500/30 uppercase tracking-widest">
              HRMS
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-400">
          <Link
            href="/"
            className={`hover:text-white transition-colors ${pathname === '/' ? 'text-white font-semibold' : ''}`}>
            Home
          </Link>
          <Link
            href="/about"
            className={`hover:text-white transition-colors ${pathname === '/about' ? 'text-white font-semibold' : ''}`}>
            About
          </Link>
          <Link
            href="/contact"
            className={`hover:text-white transition-colors ${pathname === '/contact' ? 'text-white font-semibold' : ''}`}>
            Contact
          </Link>
          <Link
            href="/admin"
            className={`hover:text-white transition-colors ${pathname.startsWith('/admin') ? 'text-white font-semibold' : ''}`}>
            Dashboard
          </Link>
        </nav>

        {/* Auth / Avatar Section */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3 px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800">
              {userAvatar ? (
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-indigo-500/40">
                  <Image
                    src={userAvatar}
                    alt={userName}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
              <span className="text-xs font-medium text-zinc-200">
                {userName}
              </span>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2">
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
