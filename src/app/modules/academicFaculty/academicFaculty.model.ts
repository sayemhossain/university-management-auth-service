import { Schema, model } from 'mongoose';

const academicFacultySchema = new Schema(
  {
    title: {
      type: String,
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

export const AcademicFaculty = model('AcademicFaculty', academicFacultySchema);
