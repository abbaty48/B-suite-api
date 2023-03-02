import { Model, Schema, model, models } from 'mongoose';
import { IProduct } from '@server-databases/mongodb/interfaces/IProduct';

export const productModel =
  (models.product as Model<IProduct>) ||
  model('product', new Schema<IProduct>());
