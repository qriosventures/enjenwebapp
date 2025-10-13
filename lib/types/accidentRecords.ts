import { AccidentSeverityType } from "../enums/accidentSeverityTypes";

export interface AccidentRecordDto {
  id?: number;
  vehicleId: number;
  driverId: number;
  accidentDate: Date;
  location: string;
  description: string | null;
  weatherConditions: string | null;
  roadConditions: string | null;
  policeReportFiled: boolean;
  policeReportNumber: string;
  actualRepairCost: number;
  atFault: boolean;
  otherPartyInformation: string | null;
  notes: string | null;
  estimatedRepairCost: number;
  severity: number;
  accidentSeverityType: AccidentSeverityType;
}