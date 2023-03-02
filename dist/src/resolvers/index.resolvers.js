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
const staff_resolver_1 = require("./staff.resolver");
const category_resolver_1 = require("./category.resolver");
const warehouse_resolver_1 = require("./warehouse.resolver");
exports.resolvers = {
    Query: {
        staff: (_, { searchFilter }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield staff_resolver_1.StaffResolver.staff(searchFilter, context);
        }),
        staffs: (_, { searchFilter, filters }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield staff_resolver_1.StaffResolver.staffs(searchFilter, filters, context);
        }),
        categories: (_) => __awaiter(void 0, void 0, void 0, function* () {
            return yield category_resolver_1.CategoryResolver.categories();
        }),
        warehouses: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield warehouse_resolver_1.WarehouseResolver.warehouses(context);
        }),
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
        /*
        // WAREHOUSE
        addWarehouse: async (
          _: any,
          { warehouseID, address, staffs, products }: any,
          { request, response, config }: IResolverContext
        ) => {
          return await WarehouseResolver.addWarehouse(
            {
              warehouseID,
              address,
              staffs,
              products,
            },
            { request, response, config }
          );
        },
        editWarehouse: async (
          _: any,
          { warehouseID, address, staffs, products }: any,
          { request, response, config }: IResolverContext
        ) => {
          return await WarehouseResolver.editWarehouse(warehouseID, {
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
        */
    },
};
