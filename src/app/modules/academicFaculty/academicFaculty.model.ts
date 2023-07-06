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
  }
);

// academicSemesterSchema.pre('save', async function (next) {
//   const isExist = await AcademicSemester.findOne({
//     title: this.title,
//     year: this.year,
//   });
//   if (isExist) {
//     throw new ApiError(
//       httpStatus.CONFLICT,
//       'Academic semester is already exist !'
//     );
//   }
//   next();
// });

export const AcademicFaculty = model('AcademicFaculty', academicFacultySchema);
