import { Model, Schema, model, models } from 'mongoose';
import { ISale } from '@server-databases/mongodb/interfaces/ISale';

const SaleSchema = new Schema<ISale>(
  {},
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

SaleSchema.virtual('Products', {
  ref: 'product',
  foreignField: 'productID',
  localField: 'products.productID',
});

SaleSchema.virtual('Staff', {
  ref: 'staff',
  foreignField: 'staffID',
  localField: 'staff.staffID',
});

export const saleModel =
  (models.sale as Model<ISale>) || model('sale', SaleSchema);
