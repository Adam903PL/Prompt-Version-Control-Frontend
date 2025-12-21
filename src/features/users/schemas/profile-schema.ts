import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .optional()
    .nullable(),
  image: z
    .string()
    .url('Invalid image URL')
    .optional()
    .nullable()
    .or(z.literal('')),
  description: z
    .string()
    .max(500, 'Description must be at most 500 characters')
    .optional()
    .nullable(),
  links: z
    .array(
      z.object({
        title: z.string().min(1, 'Title is required'),
        url: z.string().url('Invalid URL'),
      }),
    )
    .optional()
    .nullable(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
