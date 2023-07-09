import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { createStudentToDB } from './user.service';

export const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    {
    }
    const { student, ...userData } = req.body;
    const result = await createStudentToDB(student, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);
