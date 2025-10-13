import { CustomerStatus } from "../enums/customerStatus";
import { CustomerType } from "../enums/customerType";

export interface CustomerDto {
    id: number;
    customerCode: string;
    name: string;
    customerType: CustomerType;
    contactPerson: string;
    email: string;
    phone: string;
    creditLimit: number;
    outstandingBalance: number;
    paymentTermId?: number | null;
    status: CustomerStatus;
    customerSince: Date;
}