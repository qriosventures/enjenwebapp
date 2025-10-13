import { BloodGroup } from "../enums/bloodGroup";

export interface DriverDto {
  id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    contactNumber: string;
    email?: string | null;
    address: string;
    hireDate: Date;
    terminationDate?: Date | null;
    isActive: boolean;
    emergencyContactName: string;
    emergencyContactNumber: string;
    bloodGroup?: BloodGroup | null;
    notes?: string | null;
}