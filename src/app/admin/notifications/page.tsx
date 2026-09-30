import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { NotificationTable } from '@/components/Dashboard/NotificationTable';

export default function NotificationsPage() {
  return (
    <DashboardLayout roleTitle="ADMIN">
      <div className="space-y-6">
        <NotificationTable />
      </div>
    </DashboardLayout>
  );
}
