export interface ItemSupplierDto {
  id?: number;
  itemId: number;
  supplierId: number;
  supplierPartNumber: string | null;
  purchasePrice: number;
  currency: string;
  leadTimeDays: number;
  minimumOrderQuantity: number | null;
  isPrimarySupplier: boolean;
}