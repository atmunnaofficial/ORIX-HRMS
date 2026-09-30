import { z } from 'zod';

export const signupSchema = z.object({
  employeeId: z
    .string()
    .min(3, 'Employee ID must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['ADMIN', 'MANAGER', 'EMPLOYEE']).optional(),
});

export const loginSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  password: z.string().min(1, 'Password is required'),
});
