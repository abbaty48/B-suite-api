import { Document } from 'mongoose';
import { ICategory } from '@server-databases/mongodb/interfaces/ICategory';
import { IWarehouse } from '@server-databases/mongodb/interfaces/IWarehouse';

export interface IProductsPayload {
  error: string;
  products: IProduct[];
  pagins?: {
    sort: string;
    totalPaginated: number;
    totalDocuments: number;
    nextPageIndex: number;
    currentPageIndex: number;
  };
}

export interface IProductPayload {
  error: string | null;
  product: IProduct | null;
}

export interface IProductAddPayload {
  error: string | null;
  added: boolean;
  newAdded: IProduct | null;
}

export interface IProductEditPayload {
  error: string | null;
  edited: boolean;
  newEdited: IProduct | null;
}

export interface IProductDeletePayload {
  error: string;
  deleted: boolean;
}

export interface IProductFeature {
  url: string;
  size: number;
  fileName: string;
  filePath: string;
  extension: string;
}

export interface IProduct extends Document {
  productID: string;
  name: string;
  inStock?: boolean;
  quantity: number;
  expired?: boolean;
  category: ICategory;
  expirationDate?: string;
  retailPrice: number;
  wholesalePrice: number;
  features?: IProductFeature[];
  description?: string;
  warehouses?: IWarehouse[];
  warehouseIDs?: string[];
  _doc: IProduct;
}
