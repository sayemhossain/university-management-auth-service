import { z } from 'zod';

export const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is required',
        }),
        middleName: z
          .string({
            required_error: 'First Name is required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'First Name is required',
        }),
      }),
      dateOfBirth: z
        .string({
          required_error: 'Date Of Birth is required',
        })
        .optional(),
      gender: z
        .enum(['male', 'female'], {
          required_error: 'Gender is required',
        })
        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
          required_error: 'Blood Group is required',
        })
        .optional(),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact No is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact No is required',
      }),
      presentAddress: z.string({
        required_error: 'Present Address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father Name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father Occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father Contact No is required',
        }),
        motherName: z.string({
          required_error: 'Mother Name is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother Occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother Contact No is required',
        }),
        address: z.string({
          required_error: 'Address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Local Guardian Name is required',
        }),
        occupation: z.string({
          required_error: 'Local Guardian Occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local Guardian Contact No is required',
        }),
        address: z.string({
          required_error: 'Local Guardian Address is required',
        }),
      }),
      profileImage: z
        .string({
          required_error: 'Profile Image is required',
        })
        .optional(),
      academicFaculty: z.string({
        required_error: 'academicFaculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is required',
      }),
      academicSemester: z.string({
        required_error: 'Academic Semester is required',
      }),
    }),
  }),
});
