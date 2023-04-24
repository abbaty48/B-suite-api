import { MutationResolvers } from '@server-models/@types/resolver_types';
import { ProductController } from '@server-controllers/product.controller';
import { StaffController } from '@server-controllers/staff.controller';
import { CategoryController } from '../controllers/category.controller';
import { WarehouseController } from '../controllers/warehouse.controller';

// PRODUCT MUTATIONS

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

// STAFF MUTATIONS

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

// CATEGORY MUTATIONS
const CategoryMutations: MutationResolvers = {
  // Add Category
  categoryAdd: async (_, { categoryAddInput }, context) =>
    await CategoryController.addCategory(categoryAddInput, context),
  // Edit Category
  categoryEdit: async (_, { categoryEditInput }, context) =>
    await CategoryController.editCategory(categoryEditInput, context),
  // Delete Category
  categoryDelete: async (_, { category }, context) =>
    await CategoryController.deleteCategory(category, context),
};

// WAREHOUSE MUTATIONS
const WarehouseMutations: MutationResolvers = {
  warehouseAdd: async (_, { warehouseAddInput }, context) =>
    await WarehouseController.addWarehouse(warehouseAddInput, context),
  warehouseEdit: async (_, { warehouseEditInput }, context) =>
    await WarehouseController.editWarehouse(warehouseEditInput, context),
  warehouseDelete: async (_, { warehouseID }, context) =>
    await WarehouseController.deleteWarehouse(warehouseID, context),
};

export const Mutations: MutationResolvers = {
  ...WarehouseMutations,
  ...CategoryMutations,
  ...ProductMutations,
  ...StaffMutations,
};
