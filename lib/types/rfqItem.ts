export interface RfqItemDto {
  id?: number;
  itemId: number;
  requestForQuotationId: number;
  quantity: number;
  technicalSpecifications: string | null;
  requiredDate: Date | null;
  requisitionSource: string | null;
}