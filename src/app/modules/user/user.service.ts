import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const academicSemester = {
    code: '01',
    year: '2025',
  };
  let id;
  if (user.role === 'student') {
    // auto generated incremental id
    id = await generateStudentId(academicSemester);
    user.id = id;
  } else if (user?.role === 'faculty') {
    id = await generateFacultyId();
    user.id = id;
  }

  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
