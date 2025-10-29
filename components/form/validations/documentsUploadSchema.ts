 
 import { z } from "zod";

export const documentSchema = z.object({
  documentType: z.string().min(1, "Document type is required"),
});
