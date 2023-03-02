import { Model, Schema, model, models } from 'mongoose';
import { ICustomer } from '@server-databases/mongodb/interfaces/ICustomer';

const CustomerSchema = new Schema<ICustomer>({
  customerID: { type: 'string', required: true },
  name: { type: 'string', required: true },
  address: { type: 'string', required: false },
  dateOfBirth: { type: 'string', required: false },
  beneficiary: { type: 'boolean', required: false, default: false },
});

export const customerModel =
  (models.customer as Model<ICustomer>) || model('customer', CustomerSchema);
