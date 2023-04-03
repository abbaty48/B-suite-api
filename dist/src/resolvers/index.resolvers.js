"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const sale_resolver_1 = require("./sale.resolver");
const store_resolver_1 = require("./store.resolver");
const staff_resolver_1 = require("./staff.resolver");
const supply_resolver_1 = require("./supply.resolver");
const product_resolver_1 = require("./product.resolver");
const customer_resolver_1 = require("./customer.resolver");
const category_resolver_1 = require("./category.resolver");
const warehouse_resolver_1 = require("./warehouse.resolver");
exports.resolvers = {
    Query: {
        //#region STAFF
        staff: (_, { searchFilter }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield staff_resolver_1.StaffResolver.staff(searchFilter, context);
        }),
        staffs: (_, { searchFilter, pagin }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield staff_resolver_1.StaffResolver.staffs(searchFilter, pagin, context);
        }),
        //#endregion STAFFS
        //#region PRODUCT
        product: (_, { searchFilter }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield product_resolver_1.ProductResolver.product(searchFilter, context); }),
        products: (_, { searchFilter, pagin }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield product_resolver_1.ProductResolver.products(searchFilter, pagin, context); }),
        //#endregion PRODUCT
        //#region CATEGORY
        categories: (_) => __awaiter(void 0, void 0, void 0, function* () {
            return yield category_resolver_1.CategoryResolver.categories();
        }),
        //#endregion CATEGORY
        //#region WAREHOUSE
        warehouse: (_, { searchFilter }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield warehouse_resolver_1.WarehouseResolver.warehouse(searchFilter, context); }),
        warehouses: (_, { searchFilter, pagin }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield warehouse_resolver_1.WarehouseResolver.warehouses(searchFilter, pagin, context); }),
        //#endregion WARHOUSE
        //#region SALE
        sale: (_, { searchFilter }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield sale_resolver_1.SaleResolver.sale(searchFilter, context); }),
        sales: (_, { searchFilter, pagin }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield sale_resolver_1.SaleResolver.sales(searchFilter, pagin, context); }),
        //#endregion SALE
        //#region CUSTOMER
        customer: (_, { searchFilter }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield customer_resolver_1.CustomerResolver.customer(searchFilter, context); }),
        customers: (_, { searchFilter, pagin }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield customer_resolver_1.CustomerResolver.customers(searchFilter, pagin, context); }),
        //#endregion CUSTOMER
        //#region SUPPLY
        supply: (_, { searchFilter }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield supply_resolver_1.SupplyResolver.supply(searchFilter, context); }),
        supplies: (_, { searchFilter, pagin }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield supply_resolver_1.SupplyResolver.supplies(searchFilter, pagin, context); }),
        //#endregion PURCHASE
        // STORE
        store: (_, _args, context) => __awaiter(void 0, void 0, void 0, function* () { return yield store_resolver_1.StoreResolver.store(context); }),
    },
    Mutation: {
        //#region STAFF
        addStaff: (_, { addStaffInput }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield staff_resolver_1.StaffResolver.addStaff(addStaffInput, context);
        }),
        editStaff: (_, { editStaffInput }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield staff_resolver_1.StaffResolver.editStaff(editStaffInput, context);
        }),
        deleteStaff: (_, { staffID }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield staff_resolver_1.StaffResolver.deleteStaff(staffID, context);
        }),
        //#endregion
        //#region PRODUCT
        addProduct: (_, { addProductInput }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield product_resolver_1.ProductResolver.addProduct(addProductInput, context); }),
        editProduct: (_, { editProductInput }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield product_resolver_1.ProductResolver.editProduct(editProductInput, context); }),
        deleteProduct: (_, { productID, warehouseID }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield product_resolver_1.ProductResolver.deleteProduct(productID, warehouseID, context); }),
        //#endregion
        //#region CATEGORY
        addCategory: (_, { addCategoryInput }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield category_resolver_1.CategoryResolver.addCategory(addCategoryInput, context);
        }),
        editCategory: (_, { editCategoryInput }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield category_resolver_1.CategoryResolver.editCategory(editCategoryInput, context);
        }),
        deleteCategory: (_, { category }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield category_resolver_1.CategoryResolver.deleteCategory(category, context);
        }),
        //#endregion
        //#region WAREHOUSE
        addWarehouse: (_, { addWarehouseInput }, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield warehouse_resolver_1.WarehouseResolver.addWarehouse(addWarehouseInput, {
                request,
                response,
                config,
            });
        }),
        editWarehouse: (_, { editWarehouseInput }, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield warehouse_resolver_1.WarehouseResolver.editWarehouse(editWarehouseInput, {
                request,
                response,
                config,
            });
        }),
        deleteWarehouse: (_, { warehouseID }, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield warehouse_resolver_1.WarehouseResolver.deleteWarehouse(warehouseID, {
                request,
                response,
                config,
            });
        }),
        //#endregion
        //#region SALE
        addSale: (_, { addSaleInput }, context) => __awaiter(void 0, void 0, void 0, function* () { return sale_resolver_1.SaleResolver.addSale(addSaleInput, context); }),
        editSale: (_, { editSaleInput }, context) => __awaiter(void 0, void 0, void 0, function* () { return sale_resolver_1.SaleResolver.editSale(editSaleInput, context); }),
        deleteSale: (_, { saleID, warehouseID }, context) => __awaiter(void 0, void 0, void 0, function* () { return sale_resolver_1.SaleResolver.deleteSale(saleID, warehouseID, context); }),
        //#endregion
        //#region CUSTOMER
        addCustomer: (_, { addCustomerInput }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield customer_resolver_1.CustomerResolver.addCustomers(addCustomerInput, context); }),
        editCustomer: (_, { editCustomerInput }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield customer_resolver_1.CustomerResolver.editCustomers(editCustomerInput, context); }),
        deleteCustomer: (_, { customerID, warehouseID }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield customer_resolver_1.CustomerResolver.deleteCustomers(customerID, warehouseID, context); }),
        //#endregion
        //#region SUPPLY
        makeSupply: (_, { addSupplyInput, warehouseID }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield supply_resolver_1.SupplyResolver.makeSupply(addSupplyInput, context, warehouseID); }),
        editSupply: (_, { supplyID, editSupplyInput, warehouseID }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield supply_resolver_1.SupplyResolver.editSupply(supplyID, editSupplyInput, context, warehouseID);
        }),
        deleteSupply: (_, { supplyID, warehouseID }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield supply_resolver_1.SupplyResolver.deleteSupply(supplyID, context, warehouseID); }),
        //#endregion
        //#region STORE
        addEnterprise: (_, { addEnterpriseInput }, context) => __awaiter(void 0, void 0, void 0, function* () { return store_resolver_1.StoreResolver.addEnterprise(addEnterpriseInput, context); }),
        editEnterprise: (_, { editEnterpriseInput }, context) => __awaiter(void 0, void 0, void 0, function* () { return store_resolver_1.StoreResolver.editEnterprise(editEnterpriseInput, context); }),
        _initializeSys: (_, { _init }, context) => __awaiter(void 0, void 0, void 0, function* () { return store_resolver_1.StoreResolver._initializeSys(_init, context); }),
        //#endregion
        //
        uploadData: (_, { uploadDataInput }) => __awaiter(void 0, void 0, void 0, function* () { return yield product_resolver_1.ProductResolver.uploadData(uploadDataInput); }),
    },
};
