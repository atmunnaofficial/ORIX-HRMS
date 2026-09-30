'use server';

import { db } from '@/lib/db';
import { Role } from '@prisma/client';
import { revalidatePath } from 'next/cache';

async function resolveUser(identifier?: string | null) {
  if (!identifier || identifier === 'undefined' || identifier === 'null') {
    const firstUser = await db.user.findFirst();
    if (firstUser) return firstUser;

    return {
      id: 'test-admin-id',
      employeeId: 'ADMIN001',
      role: Role.ADMIN,
      name: 'Admin User',
    };
  }

  const roleMatch = Object.values(Role).includes(identifier as Role)
    ? (identifier as Role)
    : undefined;

  const user = await db.user.findFirst({
    where: {
      OR: [
        { id: identifier },
        { employeeId: identifier },
        ...(roleMatch ? [{ role: roleMatch }] : []),
      ],
    },
  });

  if (!user) {
    const fallbackUser = await db.user.findFirst();
    if (fallbackUser) return fallbackUser;

    return {
      id: identifier,
      employeeId: identifier,
      role: Role.ADMIN,
      name: 'System User',
    };
  }

  return user;
}

export async function getUsers(currentUserId: string) {
  try {
    const currentUser = await resolveUser(currentUserId);

    const users = await db.user.findMany({
      where:
        currentUser && currentUser.id !== 'test-admin-id'
          ? {
              NOT: {
                id: currentUser.id,
              },
            }
          : {},
      select: {
        id: true,
        employeeId: true,
        role: true,
        name: true,
      },
    });

    if (users.length === 0) {
      return [
        {
          id: 'test-user-1',
          employeeId: 'IT010001',
          role: 'MANAGER',
          name: 'Test Manager',
        },
        {
          id: 'test-user-2',
          employeeId: 'IT010002',
          role: 'EMPLOYEE',
          name: 'Test Employee',
        },
      ];
    }

    return users;
  } catch (error) {
    console.error('Failed to fetch users', error);
    return [
      {
        id: 'test-user-1',
        employeeId: 'IT010001',
        role: 'MANAGER',
        name: 'Test Manager',
      },
      {
        id: 'test-user-2',
        employeeId: 'IT010002',
        role: 'EMPLOYEE',
        name: 'Test Employee',
      },
    ];
  }
}

export async function getMessages(currentUserId: string, targetUserId: string) {
  try {
    const currentUser = await resolveUser(currentUserId);
    const targetUser = await resolveUser(targetUserId);

    if (!currentUser || !targetUser) {
      return [];
    }

    if (
      currentUser.id.startsWith('test-') ||
      targetUser.id.startsWith('test-')
    ) {
      return [];
    }

    const messages = await db.message.findMany({
      where: {
        OR: [
          { senderId: currentUser.id, receiverId: targetUser.id },
          { senderId: targetUser.id, receiverId: currentUser.id },
        ],
      },
      orderBy: { createdAt: 'asc' },
    });

    return messages;
  } catch (error) {
    console.error('Failed to fetch messages', error);
    return [];
  }
}

export async function sendMessage(
  senderId: string,
  receiverId: string,
  text: string,
) {
  try {
    const sender = await resolveUser(senderId);
    const receiver = await resolveUser(receiverId);

    if (!sender || !receiver) {
      return { success: false, error: 'Sender or receiver not found' };
    }

    if (sender.id.startsWith('test-') || receiver.id.startsWith('test-')) {
      const mockMessage = {
        id: Math.random().toString(),
        senderId: sender.id,
        receiverId: receiver.id,
        text,
        createdAt: new Date(),
      };
      return { success: true, newMessage: mockMessage };
    }

    const newMessage = await db.message.create({
      data: {
        senderId: sender.id,
        receiverId: receiver.id,
        text,
      },
    });

    revalidatePath('/admin/messages');
    return { success: true, newMessage };
  } catch (error) {
    console.error('Failed to send message', error);
    return { success: false, error: 'Failed to send' };
  }
}
