import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { loginUser } from './auth.controller';
import { loginZodSchema } from './auth.validation';

const router = express.Router();

router.post('/login', validateRequest(loginZodSchema), loginUser);
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
