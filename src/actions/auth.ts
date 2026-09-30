'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

const loginSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function loginUser(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse({
    employeeId: formData.get('employeeId'),
    password: formData.get('password'),
  });

  if (!result.success) {
    const errorMessage =
      result.error.issues[0]?.message || 'Invalid input data';
    return { success: false, error: errorMessage };
  }

  try {
    const { employeeId, password } = result.data;

    const user = await db.user.findUnique({ where: { employeeId } });
    if (!user) {
      return { success: false, error: 'Employee ID not found' };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return { success: false, error: 'Incorrect password' };
    }

    return {
      success: true,
      message: 'Login successful! Redirecting...',
      role: user.role, // <-- Important change
      user: { role: user.role },
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred during login.',
    };
  }
}

export async function registerUser(prevState: unknown, formData: FormData) {
  const result = registerSchema.safeParse({
    employeeId: formData.get('employeeId'),
    password: formData.get('password'),
  });

  if (!result.success) {
    const errorMessage =
      result.error.issues[0]?.message || 'Invalid input data';
    return { success: false, error: errorMessage };
  }

  try {
    const { employeeId, password } = result.data;

    const existingUser = await db.user.findUnique({ where: { employeeId } });
    if (existingUser) {
      return { success: false, error: 'Employee ID already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        employeeId,
        password: hashedPassword,
        role: 'EMPLOYEE',
      },
    });

    return {
      success: true,
      message: 'Account created successfully! Please sign in.',
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred during registration.',
    };
  }
}
