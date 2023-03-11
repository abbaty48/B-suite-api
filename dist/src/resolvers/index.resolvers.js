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
const staff_resolver_1 = require("./staff.resolver");
const product_resolver_1 = require("./product.resolver");
const customer_resolver_1 = require("./customer.resolver");
const category_resolver_1 = require("./category.resolver");
const warehouse_resolver_1 = require("./warehouse.resolver");
exports.resolvers = {
    Query: {
        // STAFF
        staff: (_, { searchFilter }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield staff_resolver_1.StaffResolver.staff(searchFilter, context);
        }),
        staffs: (_, { searchFilter, filters }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield staff_resolver_1.StaffResolver.staffs(searchFilter, filters, context);
        }),
        // PRODUCT
        product: (_, { searchFilter }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield product_resolver_1.ProductResolver.product(searchFilter, context); }),
        products: (_, { searchFilter, filters }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield product_resolver_1.ProductResolver.products(searchFilter, filters, context); }),
        // CATEGORY
        categories: (_) => __awaiter(void 0, void 0, void 0, function* () {
            return yield category_resolver_1.CategoryResolver.categories();
        }),
        // WAREHOUSE
        warehouses: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield warehouse_resolver_1.WarehouseResolver.warehouses(context);
        }),
        // SALE
        sale: (_, { searchFilter }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield sale_resolver_1.SaleResolver.sale(searchFilter, context); }),
        sales: (_, { searchFilter, filters }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield sale_resolver_1.SaleResolver.sales(searchFilter, filters, context); }),
        // CUSTOMER
        customer: (_, { searchFilter }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield customer_resolver_1.CustomerResolver.customer(searchFilter, context); }),
        customers: (_, { searchFilter, filters }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield customer_resolver_1.CustomerResolver.customers(searchFilter, filters, context); }),
    },
    Mutation: {
        // STAFF
        addStaff: (_, inputs, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield staff_resolver_1.StaffResolver.addStaff(inputs, context);
        }),
        editStaff: (_, inputs, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield staff_resolver_1.StaffResolver.editStaff(inputs, context);
        }),
        deleteStaff: (_, { staffID }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield staff_resolver_1.StaffResolver.deleteStaff(staffID, context);
        }),
        // PRODUCT
        addProduct: (_, { addProductInput }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield product_resolver_1.ProductResolver.addProduct(addProductInput, context); }),
        editProduct: (_, { editProductInput }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield product_resolver_1.ProductResolver.editProduct(editProductInput, context); }),
        deleteProduct: (_, { productID, warehouseID }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield product_resolver_1.ProductResolver.deleteProduct(productID, warehouseID, context); }),
        // CATEGORY
        addCategory: (_, { category }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield category_resolver_1.CategoryResolver.addCategory(category);
        }),
        editCategory: (_, { oldCategory, newCategory }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield category_resolver_1.CategoryResolver.editCategory(oldCategory, newCategory);
        }),
        deleteCategory: (_, { category }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield category_resolver_1.CategoryResolver.deleteCategory(category);
        }),
        // WAREHOUSE
        addWarehouse: (_, { warehouseID, address, staffs, products }, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield warehouse_resolver_1.WarehouseResolver.addWarehouse({
                warehouseID,
                address,
                staffs,
                products,
            }, { request, response, config });
        }),
        editWarehouse: (_, { warehouseID, name, address, staffs, products }, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield warehouse_resolver_1.WarehouseResolver.editWarehouse({
                warehouseID,
                address,
                staffs,
                products,
            }, {
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
        // SALE
        addSale: (_, { addSaleInput }, context) => __awaiter(void 0, void 0, void 0, function* () { return sale_resolver_1.SaleResolver.addSale(addSaleInput, context); }),
        editSale: (_, { editSaleInput }, context) => __awaiter(void 0, void 0, void 0, function* () { return sale_resolver_1.SaleResolver.editSale(editSaleInput, context); }),
        deleteSale: (_, { saleID, warehouseID }, context) => __awaiter(void 0, void 0, void 0, function* () { return sale_resolver_1.SaleResolver.deleteSale(saleID, warehouseID, context); }),
        // CUSTOMER
        addCustomer: (_, { addCustomerInput }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield customer_resolver_1.CustomerResolver.addCustomers(addCustomerInput, context); }),
        editCustomer: (_, { editCustomerInput }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield customer_resolver_1.CustomerResolver.editCustomers(editCustomerInput, context); }),
        deleteCustomer: (_, { customerID, warehouseID }, context) => __awaiter(void 0, void 0, void 0, function* () { return yield customer_resolver_1.CustomerResolver.deleteCustomers(customerID, warehouseID, context); }),
    },
};
