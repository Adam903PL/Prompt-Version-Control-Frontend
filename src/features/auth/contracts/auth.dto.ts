import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(10, { message: 'Password must be at least 10 characters' })
    .regex(/^(?=.*[A-Z])(?=(?:.*\d){2})(?=(?:.*[\W_]){2}).*$/, {
      message:
        'Password must contain at least 1 uppercase letter, 2 digits, and 2 special characters',
    }),
  rememberMe: z.boolean().optional(),
});

export type SignInDto = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(10, { message: 'Password must be at least 10 characters' })
    .regex(/^(?=.*[A-Z])(?=(?:.*\d){2})(?=(?:.*[\W_]){2}).*$/, {
      message:
        'Password must contain at least 1 uppercase letter, 2 digits, and 2 special characters',
    }),
});

export type SignUpDto = z.infer<typeof SignUpSchema>;
