import { MutationResolvers } from '@server-models/@types/resolver_types';

export const Mutations: MutationResolvers = {
  //#region STAFF
  addStaff: async (
    _: any,
    { addStaffInput }: any,
    contextValue
  ) => {
    return await StaffResolver.addStaff(addStaffInput, context);
  },
  editStaff: async (
    _: any,
    { editStaffInput }: any,
    contextValue
  ) => {
    return await StaffResolver.editStaff(editStaffInput, context);
  },
  deleteStaff: async (_: any, { staffID }: any, contextValue) => {
    return await StaffResolver.deleteStaff(staffID, context);
  },
  //#endregion

  //#region PRODUCT
  addProduct: async (
    _: any,
    { addProductInput }: any,
    contextValue
  ) => await ProductResolver.addProduct(addProductInput, context),
  editProduct: async (
    _: any,
    { editProductInput }: any,
    contextValue
  ) => await ProductResolver.editProduct(editProductInput, context),
  deleteProduct: async (
    _: any,
    { productID, warehouseID }: any,
    contextValue
  ) => await ProductResolver.deleteProduct(productID, warehouseID, context),
  //#endregion

  //#region CATEGORY
  addCategory: async (
    _: any,
    { addCategoryInput }: any,
    contextValue
  ) => {
    return await CategoryResolver.addCategory(addCategoryInput, context);
  },
  editCategory: async (
    _: any,
    { editCategoryInput }: any,
    contextValue
  ) => {
    return await CategoryResolver.editCategory(editCategoryInput, context);
  },
  deleteCategory: async (
    _: any,
    { category }: any,
    contextValue
  ) => {
    return await CategoryResolver.deleteCategory(category, context);
  },
  //#endregion

  //#region WAREHOUSE
  addWarehouse: async (
    _: any,
    { addWarehouseInput }: any,
    { request, response, config }: IResolverContext
  ) => {
    return await WarehouseResolver.addWarehouse(addWarehouseInput, {
      request,
      response,
      config,
    });
  },
  editWarehouse: async (
    _: any,
    { editWarehouseInput }: any,
    { request, response, config }: IResolverContext
  ) => {
    return await WarehouseResolver.editWarehouse(editWarehouseInput, {
      request,
      response,
      config,
    });
  },
  deleteWarehouse: async (
    _: any,
    { warehouseID }: any,
    { request, response, config }: IResolverContext
  ) => {
    return await WarehouseResolver.deleteWarehouse(warehouseID, {
      request,
      response,
      config,
    });
  },
  //#endregion

  //#region SALE
  addSale: async (_: any, { addSaleInput }: any, contextValue) =>
    SaleResolver.addSale(addSaleInput, context),
  editSale: async (_: any, { editSaleInput }: any, contextValue) =>
    SaleResolver.editSale(editSaleInput, context),
  deleteSale: async (
    _: any,
    { saleID, warehouseID }: any,
    contextValue
  ) => SaleResolver.deleteSale(saleID, warehouseID, context),
  //#endregion

  //#region CUSTOMER
  addCustomer: async (
    _: any,
    { addCustomerInput }: any,
    contextValue
  ) => await CustomerResolver.addCustomers(addCustomerInput, context),
  editCustomer: async (
    _: any,
    { editCustomerInput }: any,
    contextValue
  ) => await CustomerResolver.editCustomers(editCustomerInput, context),
  deleteCustomer: async (
    _: any,
    { customerID, warehouseID }: any,
    contextValue
  ) => await CustomerResolver.deleteCustomers(customerID, warehouseID, context),
  //#endregion

  //#region SUPPLY
  makeSupply: async (
    _: any,
    { addSupplyInput, warehouseID }: any,
    contextValue
  ) => await SupplyResolver.makeSupply(addSupplyInput, context, warehouseID),
  editSupply: async (
    _: any,
    { supplyID, editSupplyInput, warehouseID }: any,
    contextValue
  ) =>
    await SupplyResolver.editSupply(
      supplyID,
      editSupplyInput,
      context,
      warehouseID
    ),
  deleteSupply: async (
    _: any,
    { supplyID, warehouseID }: any,
    contextValue
  ) => await SupplyResolver.deleteSupply(supplyID, context, warehouseID),
  //#endregion

  //#region STORE
  addEnterprise: async (
    _: any,
    { addEnterpriseInput }: any,
    contextValue
  ) => StoreResolver.addEnterprise(addEnterpriseInput, context),
  editEnterprise: async (
    _: any,
    { editEnterpriseInput }: any,
    contextValue
  ) => StoreResolver.editEnterprise(editEnterpriseInput, context),
  _initializeSys: async (_: any, { _init }: any, contextValue) =>
    StoreResolver._initializeSys(_init, context),
  //#endregion
};
