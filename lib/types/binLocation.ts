export interface BinLocationDto {
  id?: number;
  rackId: number;
  code: string;
  level: number;
  bay: number;
  type: number;
  capacity: number;
  isActive: boolean;
}