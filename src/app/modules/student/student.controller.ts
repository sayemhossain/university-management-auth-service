import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentsFilterableFields } from './student.constant';
import { IStudent } from './student.interface';
import {
  deleteStudentToDB,
  getAllStudentToDB,
  getSingleStudentToDB,
  updateStudentToDB,
} from './student.service';

export const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, studentsFilterableFields);

  const result = await getAllStudentToDB(paginationOptions, filters);

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

export const getSingleStudent = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleStudentToDB(id);

    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students retrieved successfully !',
      data: result,
    });
  }
);

export const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await updateStudentToDB(id, updatedData);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully !',
    data: result,
  });
});

export const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteStudentToDB(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students deleted successfully !',
    data: result,
  });
});
