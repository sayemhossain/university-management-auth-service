import { Model, Types } from 'mongoose';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';

export type IName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type IGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};
export type ILocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IStudent = {
  id: string;
  name: IName;
  dateOfBirth: string;
  gender: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  profileImage?: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicSemester: Types.ObjectId | IAcademicSemester;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;

export type IStudentsFilters = {
  searchTerm?: string;
  id?: string;
  contactNo?: string;
  bloodGroup?: string;
  email?: string;
  emergencyContactNo?: string;
};
