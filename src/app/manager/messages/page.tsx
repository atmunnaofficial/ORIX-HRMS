import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import ChatBox from '@/components/Dashboard/ChatBox';
import { db } from '@/lib/db';
import { Role } from '@prisma/client';

export default async function ManagerMessagesPage() {
  const manager = await db.user.findFirst({
    where: { role: Role.MANAGER },
  });

  const managerId = manager ? manager.id : 'MANAGER';

  return (
    <DashboardLayout roleTitle="MANAGER">
      <div className="space-y-6">
        <div className="flex-1 min-h-0">
          <ChatBox currentUserId={managerId} />
        </div>
      </div>
    </DashboardLayout>
  );
}
