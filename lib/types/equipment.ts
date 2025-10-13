export interface EquipmentDto {
  id?: number;
  code: string;
  name: string;
  type: number;
  modelNumber: string | null;
  serialNumber: string | null;
  productionLineId: number;
  installationDate: Date;
  lastMaintenanceDate: Date | null;
  nextMaintenanceDate: Date | null;
  operationalCostPerHour: number;
  status: number;
}