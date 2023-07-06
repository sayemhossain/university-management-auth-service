import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createFaculty } from './academicFaculty.controller';
import { createAcademicFacultyZodSchema } from './acdemicFaculty.validation';
const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(createAcademicFacultyZodSchema),
  createFaculty
);

export const AcademicFacultyRoutes = router;
