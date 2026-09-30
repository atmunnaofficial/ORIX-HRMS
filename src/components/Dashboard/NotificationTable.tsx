'use client';

import { useState } from 'react';
import { Eye, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface EmployeeNotification {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  notificationType: string;
  description: string;
  date: string;
}

export function NotificationTable() {
  const [notifications, setNotifications] = useState<EmployeeNotification[]>([
    {
      id: '1',
      employeeId: 'EMP-001',
      name: 'Tanvir Ahmed',
      email: 'tanvir@orix.com',
      phone: '+880 1711-223344',
      notificationType: 'Leave Request',
      description: 'Applied for Casual Leave (3 Days)',
      date: 'Today, 10:30 AM',
    },
    {
      id: '2',
      employeeId: 'EMP-002',
      name: 'Nusrat Jahan',
      email: 'nusrat@orix.com',
      phone: '+880 1811-556677',
      notificationType: 'Attendance Regularization',
      description: 'Requested manual punch-in fix for yesterday',
      date: 'Yesterday, 4:15 PM',
    },
    {
      id: '3',
      employeeId: 'EMP-003',
      name: 'Rakibul Hasan',
      email: 'rakib@orix.com',
      phone: '+880 1911-998877',
      notificationType: 'Shift Change',
      description: 'Requested transfer from Morning to Night shift',
      date: '2 Oct, 2026',
    },
  ]);

  const handleAction = (id: string, actionType: string) => {
    if (actionType === 'approve') {
      toast.success('Request approved successfully!');
      setNotifications(notifications.filter((item) => item.id !== id));
    } else if (actionType === 'reject') {
      toast.error('Request rejected.');
      setNotifications(notifications.filter((item) => item.id !== id));
    } else {
      toast.info(`Viewing details for notification ID: ${id}`);
    }
  };

  // Helper to get initials (e.g., "Tanvir Ahmed" -> "TA")
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-full bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950/60 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              <th className="py-3.5 px-4">Employee</th>
              <th className="py-3.5 px-4">ID</th>
              <th className="py-3.5 px-4">Notification Details</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs">
            {notifications.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-zinc-500">
                  No new system notifications found.
                </td>
              </tr>
            ) : (
              notifications.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-zinc-800/20 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs shrink-0 shadow-inner">
                      {getInitials(item.name)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <span className="text-[10px] text-zinc-500">
                        {item.email}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-indigo-400">
                    {item.employeeId}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-zinc-200">
                      {item.description}
                    </p>
                    <span className="text-[10px] text-zinc-500">
                      {item.date}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-medium">
                      {item.notificationType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleAction(item.id, 'view')}
                        className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                        title="View Details">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleAction(item.id, 'approve')}
                        className="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 transition-colors cursor-pointer"
                        title="Approve">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleAction(item.id, 'reject')}
                        className="p-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                        title="Reject">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
