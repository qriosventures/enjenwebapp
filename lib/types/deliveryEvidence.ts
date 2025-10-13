export interface DeliveryEvidenceDto {
  id?: number;
  dispatchNoteId: number;
  type: number;
  filePath: string | null;
  recordedAt: Date;
  recordedBy: string | null;
}