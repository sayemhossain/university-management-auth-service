import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createFaculty, getAllFaculty } from './academicFaculty.controller';
import { createAcademicFacultyZodSchema } from './acdemicFaculty.validation';
const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(createAcademicFacultyZodSchema),
  createFaculty
);

router.get('/', getAllFaculty);

export const AcademicFacultyRoutes = router;
