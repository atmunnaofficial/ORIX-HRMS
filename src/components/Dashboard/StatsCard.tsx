import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  isPositive?: boolean;
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  isPositive = true,
}: StatsCardProps) {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded p-6 backdrop-blur-xl flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-400">{title}</span>
        <div className="p-2 bg-indigo-600/10 border border-indigo-500/20 rounded text-indigo-400">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          {value}
        </h3>
        <p
          className={`text-[11px] mt-1 font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {change}{' '}
          <span className="text-zinc-500 font-normal">vs last month</span>
        </p>
      </div>
    </div>
  );
}
