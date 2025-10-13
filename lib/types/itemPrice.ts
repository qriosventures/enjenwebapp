export interface ItemPriceDto {
  id?: number;
  itemId: number;
  basePrice: number;
  currency: string;
  msrp: number | null;
  wholesalePrice: number | null;
  effectiveDate: Date;
  endDate: Date | null;
  isActive: boolean;
}