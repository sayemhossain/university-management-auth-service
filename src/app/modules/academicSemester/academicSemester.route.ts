import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createSemester,
  deleteSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
} from './academicSemester.controller';
import {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
} from './acdemicSemester.validation';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(createAcademicSemesterZodSchema),
  createSemester
);

router.get('/:id', getSingleSemester);

router.get('/', getAllSemesters);

router.patch(
  '/update-semster/:id',
  validateRequest(updateAcademicSemesterZodSchema),
  updateSemester
);

router.delete('/:id', deleteSemester);

export const AcademicSemesterRoutes = router;
