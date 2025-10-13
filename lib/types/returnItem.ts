export interface ReturnItemDto {
  id?: number;
  returnRequestId: number;
  itemId: number;
  quantity: number;
  reasonDetails: string | null;
}