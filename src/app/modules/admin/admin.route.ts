import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import {
  deleteAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
} from './admin.controller';
import { updateAdminZodSchema } from './admin.validation';
const router = express.Router();

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  getSingleAdmin
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  getAllAdmins
);

router.patch(
  '/:id',
  validateRequest(updateAdminZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  updateAdmin
);

router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN), deleteAdmin);

export const AdminRoutes = router;
