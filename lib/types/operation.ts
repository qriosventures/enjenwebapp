export interface OperationDto {
  id?: number;
  code: string;
  name: string;
  description: string | null;
  standardHours: number;
  skillLevelRequired: string | null;
  requiresInspection: boolean;
}