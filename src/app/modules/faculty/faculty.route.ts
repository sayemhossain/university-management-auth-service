import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  deletefaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
} from './faculty.controller';
import { updateFacultyZodSchema } from './faculty.validation';
const router = express.Router();

router.get('/:id', getSingleFaculty);
router.get('/', getAllFaculty);
router.patch(
  '/update-student/:id',
  validateRequest(updateFacultyZodSchema),
  updateFaculty
);
router.delete('/:id', deletefaculty);

export const FacultyRoutes = router;
