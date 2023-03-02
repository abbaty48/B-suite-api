import { Document } from 'mongoose';
import { ICategory } from '@server-databases/mongodb/interfaces/ICategory';

export interface IProduct extends Document {
  productID: string;
  name: string;
  category: ICategory;
  images?: string[];
  inStock: boolean;
  quantity: number;
  expirationDate?: string;
  wholesalePrice: number;
  retailPrice: number;
  description?: string;
  warehouseID?: string;
}
