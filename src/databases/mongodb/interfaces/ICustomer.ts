import { Document } from 'mongoose';

export interface ICustomer extends Document {
  customerID: string;
  name: string;
  address?: string;
  dateOfBirth?: string;
  beneficiary?: boolean;
}
