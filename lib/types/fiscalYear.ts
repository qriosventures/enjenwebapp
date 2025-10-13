export interface FiscalYearDto {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  isClosed: boolean;
  closedDate: Date | null;
  closingRemarks: string | null;
  companyId: number;
}