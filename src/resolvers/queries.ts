import { QueryResolvers } from '@server-models/@types/resolver_types';

export const Queries: QueryResolvers = {
  //#region STAFF
  staff: async (
    _: any,
    { searchFilter }: any,
    contextValue
  ): Promise<IStaffPayload> => {
    return await StaffResolver.staff(searchFilter, context);
  },
  staffs: async (
    _: any,
    { searchFilter, pagin }: any,
    contextValue
  ): Promise<IStaffsPayload> => {
    return await StaffResolver.staffs(searchFilter, pagin, context);
  },
  //#endregion STAFFS

  //#region PRODUCT
  product: async (_: any, { searchFilter }: any, contextValue) =>
    await ProductResolver.product(searchFilter, context),
  products: async (_: any, { searchFilter, pagin }: any, contextValue) =>
    await ProductResolver.products(searchFilter, pagin, context),
  //#endregion PRODUCT

  //#region CATEGORY
  categories: async (_: any): Promise<ICategory[]> => {
    return await CategoryResolver.categories();
  },
  //#endregion CATEGORY

  //#region WAREHOUSE
  warehouse: async (_: any, { searchFilter }: any, contextValue) =>
    await WarehouseResolver.warehouse(searchFilter, context),
  warehouses: async (_: any, { searchFilter, pagin }: any, contextValue) =>
    await WarehouseResolver.warehouses(searchFilter, pagin, context),
  //#endregion WARHOUSE

  //#region SALE
  sale: async (_: any, { searchFilter }: any, contextValue) =>
    await SaleResolver.sale(searchFilter, context),
  sales: async (_: any, { searchFilter, pagin }: any, contextValue) =>
    await SaleResolver.sales(searchFilter, pagin, context),
  //#endregion SALE

  //#region CUSTOMER
  customer: async (_: any, { searchFilter }: any, contextValue) =>
    await CustomerResolver.customer(searchFilter, context),
  customers: async (_: any, { searchFilter, pagin }: any, contextValue) =>
    await CustomerResolver.customers(searchFilter, pagin, context),
  //#endregion CUSTOMER

  //#region SUPPLY
  supply: async (_: any, { searchFilter }: any, contextValue) =>
    await SupplyResolver.supply(searchFilter, context),
  supplies: async (_: any, { searchFilter, pagin }: any, contextValue) =>
    await SupplyResolver.supplies(searchFilter, pagin, context),
  //#endregion PURCHASE
  // STORE
  store: async (_: any, _args: any, contextValue) =>
    await StoreResolver.store(context),
};
