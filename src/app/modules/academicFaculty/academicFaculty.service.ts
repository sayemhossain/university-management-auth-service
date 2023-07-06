import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

export const createFacultyToDB = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

export const getAllFacultyToDB = async () => {
  const result = await AcademicFaculty.find();

  return result;
};
