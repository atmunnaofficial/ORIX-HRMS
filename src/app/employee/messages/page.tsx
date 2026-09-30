import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import ChatBox from '@/components/Dashboard/ChatBox';
import { db } from '@/lib/db';
import { Role } from '@prisma/client';

export default async function EmployeeMessagesPage() {
  const employee = await db.user.findFirst({
    where: { role: Role.EMPLOYEE },
  });

  const employeeId = employee ? employee.id : 'EMPLOYEE';

  return (
    <DashboardLayout roleTitle="EMPLOYEE">
      <div className="space-y-6">
        <div className="flex-1 min-h-0">
          <ChatBox currentUserId={employeeId} />
        </div>
      </div>
    </DashboardLayout>
  );
}
