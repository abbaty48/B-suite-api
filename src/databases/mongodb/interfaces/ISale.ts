import { Document, Types } from 'mongoose';
import { IStaff } from '@server-databases/mongodb/interfaces/IStaff';
import { IProduct } from '@server-databases/mongodb/interfaces/IProduct';

export interface ISaleProduct extends IProduct {
  quantity: number;
  subTotal: number;
}

export interface ISale extends Document {
  saleID: string;
  date: string;
  time: string;
  products: Types.DocumentArray<ISaleProduct>;
  staff: IStaff;
  wholesalePrice: number;
  retailPrice: number;
}
