import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createStudent } from './user.controller';
import { createUserZodSchema } from './user.validation';
const router = express.Router();

//create student
router.post(
  '/create-student',
  validateRequest(createUserZodSchema),
  createStudent
);

//create faculty
router.post(
  '/create-faculty',
  validateRequest(createUserZodSchema),
  createStudent
);

//create admin
router.post(
  '/create-admin',
  validateRequest(createUserZodSchema),
  createStudent
);

export const UserRoutes = router;
