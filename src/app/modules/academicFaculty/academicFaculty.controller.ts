import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import sendReponse from '../../../shared/sendResponse';
import {
  createFacultyToDB,
  getAllFacultyToDB,
} from './academicFaculty.service';

export const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;

  const result = await createFacultyToDB(academicFacultyData);

  sendReponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Aademic Faculty created successfully!',
    data: result,
  });
});

export const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);

  const result = await getAllFacultyToDB(paginationOptions);

  sendReponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});
