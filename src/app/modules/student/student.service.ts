import { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { studentsSearchableFields } from './student.constant';
import { IStudent, IStudentsFilters } from './student.interface';
import { Student } from './student.model';

export const getAllStudentToDB = async (
  paginationOptions: IPaginationOptions,
  filters: IStudentsFilters
): Promise<IGenericResponse<IStudent[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  // For partial match
  if (searchTerm) {
    andConditions.push({
      $or: studentsSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  //For exest match
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  //For using sorting
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Student.find(whereCondition)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const getSingleStudentToDB = async (id: string) => {
  const result = await Student.findById({ _id: id })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};
export const updateStudentToDB = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const result = Student.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const deleteStudentToDB = async (id: string) => {
  const result = await Student.findByIdAndDelete({ _id: id })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};
