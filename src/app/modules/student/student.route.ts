import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  deleteStudent,
  getAllStudent,
  getSingleStudent,
  updateStudent,
} from './student.controller';
import { updateStudentZodSchema } from './student.validation';
const router = express.Router();

router.get('/:id', getSingleStudent);
router.get('/', getAllStudent);
router.patch(
  '/update-student/:id',
  validateRequest(updateStudentZodSchema),
  updateStudent
);
router.delete('/:id', deleteStudent);

export const StudentRoutes = router;
