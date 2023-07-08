import { Schema, model } from 'mongoose';

const academicDepartmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AcademicDepartment = model(
  'AcademicDepartment',
  academicDepartmentSchema
);
