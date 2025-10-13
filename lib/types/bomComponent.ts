export interface BomComponentDto {
  id?: number;
  bomId: number;
  componentId: number;
  quantityPerUnit: number;
  position: string;
  operationSequence: number;
  consumptionType: string;
  isCritical: boolean;
  instructions: string | null;
}