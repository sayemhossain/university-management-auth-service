import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { auth } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import {
  createFaculty,
  deleteFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
} from './academicFaculty.controller';
import {
  createAcademicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
} from './acdemicFaculty.validation';
const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(createAcademicFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  createFaculty
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  getSingleFaculty
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  getAllFaculty
);
router.patch(
  '/update-faculty/:id',
  validateRequest(updateAcademicFacultyZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  updateFaculty
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  deleteFaculty
);

export const AcademicFacultyRoutes = router;
