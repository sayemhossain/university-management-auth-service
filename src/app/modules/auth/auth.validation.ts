import { z } from 'zod';

export const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'Id is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
