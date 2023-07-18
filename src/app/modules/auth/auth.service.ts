import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { createToken, verifyToken } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import { IAuth, IChangePassword } from './auth.interface';

export const loginUserToDB = async (payload: IAuth) => {
  const { id, password } = payload;

  //checking user exist
  const user = new User();
  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //match password
  if (
    isUserExist.password &&
    !(await user.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //crate access token & refresh token
  const { id: userId, role, needsPassword } = isUserExist;
  const accessToken = createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPassword,
  };
};
export const refreshTokenToDB = async (token: string) => {
  //verify token
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(token, config.jwt.refresh_secret as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  //checking deleted users refresh token
  const { userId, role } = verifiedToken;
  const user = new User(); //creating instance
  const isUserExist = user.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //genereate new token
  const newAccessToken = createToken(
    { id: userId, role: role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const changePasswordToDB = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  //checking is user exist
  const isUserExist = await new User().isUserExist(user?.userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //checking old password
  if (
    isUserExist.password &&
    !(await user?.isPasswordMatched(oldPassword, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  //hash password before saving
  const newHashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bycrypt_salt_rounds)
  );

  //update user password
  await User.findByIdAndUpdate(
    { id: user?.userId },
    {
      password: newHashPassword,
      needsPassword: false,
      passwordChangedAt: new Date(),
    }
  );
};
