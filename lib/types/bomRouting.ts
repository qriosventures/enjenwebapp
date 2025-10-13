export interface BomRoutingDto {
  id?: number;
  bomId: number;
  operationId: number;
  operationSequence: number;
  workCenter: string;
  setupTime: number;
  runTime: number;
  yieldPercentage: number;
  notes: string | null;
}