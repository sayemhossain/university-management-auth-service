import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
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
  const result = await getAllFacultyToDB();

  sendReponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully !',
    data: result,
  });
});
