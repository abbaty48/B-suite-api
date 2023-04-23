import { QueryResolvers } from '@server-models/@types/resolver_types';
import { ProductController } from '@server-controllers/product.controller';
import { StaffController } from '@server-controllers/staff.controller';

export const Queries: QueryResolvers = {
  // product
  product: async (_, { searchTerm }) =>
    await ProductController.getProduct(searchTerm),
  // products
  products: async (_, { searchTerm, pagin }) =>
    await ProductController.getProducts(searchTerm, pagin),
  // staff
  staff: async (_, { searchTerm }) => await StaffController.staff(searchTerm),
  // staffs
  staffs: async (_, { searchTerm, pagin }, context) =>
    await StaffController.staffs(searchTerm, pagin),
};
