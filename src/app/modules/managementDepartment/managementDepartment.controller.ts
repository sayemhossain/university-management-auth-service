import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';
import { IManagementDepartment } from './managementDepartment.interface';
import {
  createDepartmentToDB,
  deleteDepartmentToDB,
  getAllDepartmentsToDB,
  getSingleDepartmentToDB,
  updateDepartmentToDB,
} from './managementDepartment.service';

export const createDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...departmentData } = req.body;
    const result = await createDepartmentToDB(departmentData);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department created successfully',
      data: result,
    });
  }
);

export const getAllDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await getAllDepartmentsToDB(filters, paginationOptions);

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management departments fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const getSingleDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleDepartmentToDB(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department fetched successfully',
      data: result,
    });
  }
);

export const updateDepartment = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await updateDepartmentToDB(id, updatedData);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department updated successfully',
      data: result,
    });
  })
);

export const deleteDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteDepartmentToDB(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department deleted successfully',
      data: result,
    });
  }
);
