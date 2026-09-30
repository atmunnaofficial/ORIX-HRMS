import { Navbar } from '@/components/Shared/Navbar';
import { LandingHero } from '@/components/Shared/LandingHero';

export default function HomePage() {
  const isEmployeeLoggedIn = false;
  const employeeData = {
    name: 'Tanvir Hossain',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-indigo-600 selection:text-white">
      <Navbar
        isLoggedIn={isEmployeeLoggedIn}
        userName={employeeData.name}
        userAvatar={employeeData.avatar}
      />

      {/* Hero Section */}
      <main className="flex-1 w-full flex flex-col items-center justify-center">
        <LandingHero />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-800/80 py-6 bg-zinc-950 text-center text-xs text-zinc-500">
        <p>© 2026 ORIX-HRMS Core Architecture. All rights reserved.</p>
      </footer>
    </div>
  );
}
