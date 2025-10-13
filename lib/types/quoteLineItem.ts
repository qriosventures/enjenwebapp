export interface QuoteLineItemDto {
  id?: number;
  supplierQuoteId: number;
  rfqItemId: number;
  unitPrice: number;
  discountPercent: number;
  currency: string;
  leadTimeDays: number;
  priceValidityDate: Date | null;
  notes: string | null;
}