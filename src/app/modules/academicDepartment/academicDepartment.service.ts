import { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

export const createDepartmentToDB = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.create(payload);

  return result;
};
export const getSingleDepartmentToDB = async (id: string) => {
  const result = await AcademicDepartment.findById({ _id: id });
  return result;
};
export const getAllDepartmentToDB = async (
  paginationOptions: IPaginationOptions,
  filters: IAcademicDepartmentFilters
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const sortConditions: { [key: string]: SortOrder } = {};
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: [
        {
          title: {
            $regex: searchTerm,
            $options: 'i',
          },
        },
      ],
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  //For using sorting
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const updateDepartmentToDB = async (
  id: string,
  payload: Partial<IAcademicDepartment>
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty');
  return result;
};
export const deleteDepartmentToDB = async (id: string) => {
  const result = await AcademicDepartment.findByIdAndDelete({ _id: id });
  return result;
};
