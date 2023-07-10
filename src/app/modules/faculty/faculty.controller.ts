import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableFields } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import {
  deleteFacultyToDB,
  getAllFacultyToDB,
  getSingleFacultyToDB,
  updateFacultyToDB,
} from './faculty.service';

export const getSingleFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleFacultyToDB(id);

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty retrieved successfully !',
      data: result,
    });
  }
);
export const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, facultyFilterableFields);

  const result = await getAllFacultyToDB(paginationOptions, filters);

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});
export const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await updateFacultyToDB(id, updatedData);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully !',
    data: result,
  });
});
export const deletefaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteFacultyToDB(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully !',
    data: result,
  });
});
