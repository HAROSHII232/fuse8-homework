import { z } from 'zod';

export const ArticleFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Must be 1 or more characters long' })
    .max(100, { message: 'Must be 100 or fewer characters long' }),
  content: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('draft'),
    }),
    z.object({
      type: z.literal('published'),
      description: z
        .string()
        .trim()
        .min(10, { message: 'Must be 10 or more characters long' })
        .max(1000, { message: 'Must be 1000 or fewer characters long' }),
      isNew: z.boolean().default(false).optional(),
    }),
  ]),
});

export type ArticleFormValues = z.infer<typeof ArticleFormSchema>;
