// validations/supplierSchema.ts
import { z } from "zod";


export const supplierSchema = z.object({
  companyName: z
    .string()
    .min(1, "Company Name is required")
    .min(3, "Company Name must be at least 3 characters")
    .regex(/^[A-Za-z\s]+$/, "Company Name cannot contain numbers or special characters"),

  primaryContactName: z
    .string()
    .min(1, "Primary Contact Name is required")
    .min(3, "Primary Contact Name must be at least 3 characters")
    .regex(/^[A-Za-z\s]+$/, "Name cannot contain numbers or special characters"),

  legalName: z
    .string()
    .min(1, "Legal Name is required")
    .regex(/^[A-Za-z\s]+$/, "Legal Name cannot contain numbers or special characters"),

  emailAddress: z.string().email("Enter a valid email"),

  phoneNumber: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Enter a valid phone number"),

  yearEstablished: z.coerce.date({
  required_error: "Select established year",
  invalid_type_error: "Invalid date format",
  }),



  annualRevenue: z
    .string()
    .regex(/^[0-9]+$/, "Annual Revenue must be numeric"),

  taxId: z
    .string()
    .min(1, "Tax ID is required"),

  isoCertified: z.boolean(),

  numberOfEmployees: z.string().min(1, "Select number of employees"),

   // Documents
  documents: z.array(z.any()).optional(),
});
