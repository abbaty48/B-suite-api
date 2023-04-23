import { MutationResolvers } from '@server-models/@types/resolver_types';
import { ProductController } from '@server-controllers/product.controller';
import { StaffController } from '@server-controllers/staff.controller';

// PRODUCT MUTATION

const ProductMutations: MutationResolvers = {
  // productAdd
  productAdd: async (_, { productAddInput }, context) =>
    await ProductController.addProduct(productAddInput, context),
  // productEdit
  productEdit: async (_, { productEditInput }, context) =>
    await ProductController.editProduct(productEditInput, context),
  // productDelete
  productDelete: async (_, { productID, warehouseID }, context) =>
    await ProductController.deleteProduct(productID, warehouseID, context),
};

// STAFF MUTATION

const StaffMutations: MutationResolvers = {
  // staffAdd
  staffAdd: async (_, { staffAddInput }, context) =>
    await StaffController.addStaff(staffAddInput, context),
  // staffEdit
  staffEdit: async (_, { staffEditInput }, context) =>
    await StaffController.editStaff(staffEditInput, context),
  // staffDelete
  staffDelete: async (_, { staffID }, context) =>
    await StaffController.deleteStaff(staffID, context),
};

export const Mutations: MutationResolvers = {
  ...ProductMutations,
  ...StaffMutations,
};
