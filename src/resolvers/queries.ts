import { QueryResolvers } from '@server-models/@types/resolver_types';
import { WarehouseController } from '@server-controllers/warehouse.controller';
import { CategoryController } from '@server-controllers/category.controller';
import { ProductController } from '@server-controllers/product.controller';
import { SupplyController } from '@server-controllers/supply.controller';
import { StaffController } from '@server-controllers/staff.controller';
import { StoreController } from '@server-controllers/store.controller';

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
  staffs: async (_, { searchTerm, pagin }) =>
    await StaffController.staffs(searchTerm, pagin),
  // category
  categories: async (_, { pagin }) =>
    await CategoryController.categories(pagin),
  // warehouse
  warehouse: async (_, { searchTerm }) =>
    await WarehouseController.warehouse(searchTerm),
  // warehouses
  warehouses: async (_, { searchTerm, pagin }) =>
    await WarehouseController.warehouses(searchTerm, pagin),
  // supplies
  supplies: async (_, { searchTerm, pagin }) =>
    await SupplyController.supplies(searchTerm, pagin),
  // supply
  supply: async (_, { searchTerm }) =>
    await SupplyController.supply(searchTerm),
  // store
  store: async () => await StoreController.store(),
};
