import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import { IAcademicDepartment } from './academicDepartment.interface';
import {
  createDepartmentToDB,
  deleteDepartmentToDB,
  getAllDepartmentToDB,
  getSingleDepartmentToDB,
  updateDepartmentToDB,
} from './academicDepartment.service';

export const createDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...createDepartmentData } = req.body;

    const result = await createDepartmentToDB(createDepartmentData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Aademic Faculty created successfully!',
      data: result,
    });
  }
);
export const getSingleDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await getSingleDepartmentToDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Department retrieved successfully !',
      data: result,
    });
  }
);
export const getAllDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);
    const filters = pick(req.query, academicDepartmentFilterableFields);

    const result = await getAllDepartmentToDB(paginationOptions, filters);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
  }
);
export const updateDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateDepartmentData = req.body;

    const result = await updateDepartmentToDB(id, updateDepartmentData);

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Department updated successfully !',
      data: result,
    });
  }
);
export const deleteDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteDepartmentToDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department deleted successfully !',
      data: result,
    });
  }
);
