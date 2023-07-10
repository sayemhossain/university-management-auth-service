import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { facultySearchableFields } from './faculty.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';

export const getSingleFacultyToDB = async (id: string) => {
  const result = await Faculty.findById({ _id: id })
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};
export const getAllFacultyToDB = async (
  paginationOptions: IPaginationOptions,
  filters: IFacultyFilters
): Promise<IGenericResponse<IFaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  // For partial match
  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
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

  const result = await Faculty.find(whereCondition)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const updateFacultyToDB = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const { name, ...studentData } = payload;

  const updatedStudentData: Partial<IFaculty> = { ...studentData };

  //dynamically handle name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = Faculty.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });
  return result;
};
export const deleteFacultyToDB = async (id: string) => {
  const result = await Faculty.findByIdAndDelete({ _id: id })
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};
