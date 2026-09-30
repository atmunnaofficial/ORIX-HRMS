import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import ChatBox from '@/components/Dashboard/ChatBox';

export default function MessagesPage() {
  return (
    <DashboardLayout roleTitle="ADMIN">
       <div className="space-y-6">
        <div className="flex-1 min-h-0">
          <ChatBox currentUserId="ADMIN" />
        </div>
      </div>
    </DashboardLayout>
  );
}
