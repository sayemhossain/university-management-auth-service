import express from 'express';
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
  createFaculty
);
router.get('/:id', getSingleFaculty);
router.get('/', getAllFaculty);
router.patch(
  '/update-faculty/:id',
  validateRequest(updateAcademicFacultyZodSchema),
  updateFaculty
);
router.delete('/:id', deleteFaculty);

export const AcademicFacultyRoutes = router;
