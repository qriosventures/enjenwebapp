export interface ProductionLineDto {
  id?: number;
  code: string;
  name: string;
  description: string | null;
  supervisorId: number;
  isActive: boolean;
  efficiencyFactor: number;
}