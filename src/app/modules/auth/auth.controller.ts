import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IRefreshTokenResponse } from './auth.interface';
import {
  changePasswordToDB,
  loginUserToDB,
  refreshTokenToDB,
} from './auth.service';

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await loginUserToDB(loginData);
  const { refreshToken, ...other } = result;

  //set refresh token in cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Loggedin Successfully !',
    data: other,
  });
});
export const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken, ...others } = req.cookies;

  const result = await refreshTokenToDB(refreshToken);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Loggedin Successfully !',
    data: result,
  });
});
export const changePassword = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const { ...passwordData } = req.body;
    const result = await changePasswordToDB(user, passwordData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password reset Successfully !',
      data: result,
    });
  }
);
