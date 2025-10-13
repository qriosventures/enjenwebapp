export interface AccidentImageDto {
  id?: number;
  accidentRecordId: number;
  imagePath: string;
  description: string | null;
  uploadDate: Date;
}