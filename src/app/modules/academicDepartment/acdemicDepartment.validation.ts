import { z } from 'zod';

export const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    academicFaculty: z.string({
      required_error: 'Academic faculty is required',
    }),
  }),
});

export const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: 'Academic faculty is required',
      })
      .optional(),
  }),
});
