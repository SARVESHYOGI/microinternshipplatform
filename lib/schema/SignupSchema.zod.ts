import { z } from 'zod';

const UserRoleEnum = z.enum(['STUDENT', 'COMPANY', 'ADMIN']);

export const SignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password too long'),
  role: UserRoleEnum,
});


export type SignupInput = z.infer<typeof SignupSchema>;