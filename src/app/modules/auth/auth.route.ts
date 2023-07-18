import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { auth } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { changePassword, loginUser, refreshToken } from './auth.controller';
import {
  changePasswordZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
} from './auth.validation';

const router = express.Router();

router.post('/login', validateRequest(loginZodSchema), loginUser);
router.post(
  '/refresh-token',
  validateRequest(refreshTokenZodSchema),
  refreshToken
);
router.post(
  '/change-password',
  validateRequest(changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  changePassword
);

// router.get(
//   '/',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   getAllAdmins
// );

// router.patch(
//   '/:id',
//   validateRequest(updateAdminZodSchema),
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   updateAdmin
// );

// router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN), deleteAdmin);

export const AuthRoutes = router;
