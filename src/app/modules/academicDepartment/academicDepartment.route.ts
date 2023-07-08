import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createDepartment,
  deleteDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
} from './academicDepartment.controller';
import {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
} from './acdemicDepartment.validation';
const router = express.Router();

router.post(
  '/create-department',
  validateRequest(createAcademicDepartmentZodSchema),
  createDepartment
);
router.get('/:id', getSingleDepartment);
router.get('/', getAllDepartment);
router.patch(
  '/update-department/:id',
  validateRequest(updateAcademicDepartmentZodSchema),
  updateDepartment
);
router.delete('/:id', deleteDepartment);

export const AcademicDepartmentRoutes = router;
