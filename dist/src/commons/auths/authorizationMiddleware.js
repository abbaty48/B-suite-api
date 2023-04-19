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
const RolePrevilege_1 = require("../../models/databases/mongodb/enums/RolePrevilege");
const staffJWTAuthenticationMiddleware_1 = require("./staffJWTAuthenticationMiddleware");
const staffRoleAuthorization = (req, res, privateKey, previlege) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authenticatedStaff = yield (0, staffJWTAuthenticationMiddleware_1.staffVerifyToken)(req, res, privateKey);
        const staffPrevileges = {
            Accountant: [
                // CATEGORY
                RolePrevilege_1.RolePrevileges.ALL_CATEGORY_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_CATEGORY,
                RolePrevilege_1.RolePrevileges.READ_CATEGORY,
                RolePrevilege_1.RolePrevileges.UPDATE_CATEGORY,
                RolePrevilege_1.RolePrevileges.DELETE_CATEGORY,
                // PRODUCT
                RolePrevilege_1.RolePrevileges.ALL_PRODUCT_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_PRODUCT,
                RolePrevilege_1.RolePrevileges.READ_PRODUCT,
                RolePrevilege_1.RolePrevileges.UPDATE_PRODUCT,
                RolePrevilege_1.RolePrevileges.DELETE_PRODUCT,
                // SALE
                RolePrevilege_1.RolePrevileges.ALL_SALE_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_SALE,
                RolePrevilege_1.RolePrevileges.READ_SALE,
                RolePrevilege_1.RolePrevileges.UPDATE_SALE,
                RolePrevilege_1.RolePrevileges.DELETE_SALE,
                // WAREHOUSE
                RolePrevilege_1.RolePrevileges.ALL_WAREHOUSE_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_WAREHOUSE,
                RolePrevilege_1.RolePrevileges.READ_WAREHOUSE,
                RolePrevilege_1.RolePrevileges.UPDATE_WAREHOUSE,
                RolePrevilege_1.RolePrevileges.DELETE_WAREHOUSE,
                // CUSTOMER
                RolePrevilege_1.RolePrevileges.ALL_CUSTOMER_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_CUSTOMER,
                RolePrevilege_1.RolePrevileges.READ_CUSTOMER,
                RolePrevilege_1.RolePrevileges.UPDATE_CUSTOMER,
                RolePrevilege_1.RolePrevileges.DELETE_CUSTOMER,
                // STAFF
                RolePrevilege_1.RolePrevileges.ALL_STAFF_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_STAFF,
                RolePrevilege_1.RolePrevileges.READ_STAFF,
                RolePrevilege_1.RolePrevileges.UPDATE_STAFF,
                RolePrevilege_1.RolePrevileges.DELETE_STAFF,
                // SUPPLY
                RolePrevilege_1.RolePrevileges.ALL_SUPPLY_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_SUPPLY,
                RolePrevilege_1.RolePrevileges.READ_SUPPLY,
                RolePrevilege_1.RolePrevileges.UPDATE_SUPPLY,
                RolePrevilege_1.RolePrevileges.DELETE_SUPPLY,
            ],
            Manager: [
                // CATEGORY
                RolePrevilege_1.RolePrevileges.ALL_CATEGORY_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_CATEGORY,
                RolePrevilege_1.RolePrevileges.READ_CATEGORY,
                RolePrevilege_1.RolePrevileges.UPDATE_CATEGORY,
                RolePrevilege_1.RolePrevileges.DELETE_CATEGORY,
                // PRODUCTS
                RolePrevilege_1.RolePrevileges.ALL_PRODUCT_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_PRODUCT,
                RolePrevilege_1.RolePrevileges.READ_PRODUCT,
                RolePrevilege_1.RolePrevileges.UPDATE_PRODUCT,
                RolePrevilege_1.RolePrevileges.DELETE_PRODUCT,
                // SALE
                RolePrevilege_1.RolePrevileges.READ_SALE,
                RolePrevilege_1.RolePrevileges.UPDATE_SALE,
                RolePrevilege_1.RolePrevileges.DELETE_SALE,
                // WAREHOUSE
                RolePrevilege_1.RolePrevileges.ALL_WAREHOUSE_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_WAREHOUSE,
                RolePrevilege_1.RolePrevileges.READ_WAREHOUSE,
                RolePrevilege_1.RolePrevileges.UPDATE_WAREHOUSE,
                RolePrevilege_1.RolePrevileges.DELETE_WAREHOUSE,
                // CUSTOMER
                RolePrevilege_1.RolePrevileges.DELETE_CUSTOMER,
                RolePrevilege_1.RolePrevileges.READ_CUSTOMER,
                RolePrevilege_1.RolePrevileges.UPDATE_CUSTOMER,
                // STAFF
                RolePrevilege_1.RolePrevileges.ALL_STAFF_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_STAFF,
                RolePrevilege_1.RolePrevileges.READ_STAFF,
                RolePrevilege_1.RolePrevileges.UPDATE_STAFF,
                RolePrevilege_1.RolePrevileges.DELETE_STAFF,
                // SUPPLY
                RolePrevilege_1.RolePrevileges.ALL_SUPPLY_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_SUPPLY,
                RolePrevilege_1.RolePrevileges.READ_SUPPLY,
                RolePrevilege_1.RolePrevileges.UPDATE_SUPPLY,
                RolePrevilege_1.RolePrevileges.DELETE_SUPPLY,
                // ENTERPRISE
                RolePrevilege_1.RolePrevileges.ADD_ENTERPRISE,
                RolePrevilege_1.RolePrevileges.UPDATE_ENTERPRISE,
                // INITIALIZED_SYSTEM
                RolePrevilege_1.RolePrevileges.INITIALIZED_SYSTEM,
            ],
            Warehouse: [
                // CATEGORY
                RolePrevilege_1.RolePrevileges.ALL_CATEGORY_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_CATEGORY,
                RolePrevilege_1.RolePrevileges.READ_CATEGORY,
                RolePrevilege_1.RolePrevileges.UPDATE_CATEGORY,
                RolePrevilege_1.RolePrevileges.DELETE_CATEGORY,
                // PRODUCT
                RolePrevilege_1.RolePrevileges.ALL_PRODUCT_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_PRODUCT,
                RolePrevilege_1.RolePrevileges.READ_PRODUCT,
                RolePrevilege_1.RolePrevileges.UPDATE_PRODUCT,
                RolePrevilege_1.RolePrevileges.DELETE_PRODUCT,
                // WAREHOUSE
                RolePrevilege_1.RolePrevileges.ALL_WAREHOUSE_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_WAREHOUSE,
                RolePrevilege_1.RolePrevileges.READ_WAREHOUSE,
                RolePrevilege_1.RolePrevileges.UPDATE_WAREHOUSE,
                RolePrevilege_1.RolePrevileges.DELETE_WAREHOUSE,
            ],
            Saller: [
                // PRODUCT
                RolePrevilege_1.RolePrevileges.READ_PRODUCT,
                // SALE
                RolePrevilege_1.RolePrevileges.ALL_SALE_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_SALE,
                RolePrevilege_1.RolePrevileges.READ_SALE,
                RolePrevilege_1.RolePrevileges.UPDATE_SALE,
                RolePrevilege_1.RolePrevileges.DELETE_SALE,
                // CUSTOMER
                RolePrevilege_1.RolePrevileges.ALL_CUSTOMER_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_CUSTOMER,
                RolePrevilege_1.RolePrevileges.READ_CUSTOMER,
                RolePrevilege_1.RolePrevileges.UPDATE_CUSTOMER,
                RolePrevilege_1.RolePrevileges.DELETE_CUSTOMER,
            ],
            Admin: [
                // CATEGORY
                RolePrevilege_1.RolePrevileges.ALL_CATEGORY_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_CATEGORY,
                RolePrevilege_1.RolePrevileges.READ_CATEGORY,
                RolePrevilege_1.RolePrevileges.UPDATE_CATEGORY,
                RolePrevilege_1.RolePrevileges.DELETE_CATEGORY,
                // PRODUCT
                RolePrevilege_1.RolePrevileges.ALL_PRODUCT_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_PRODUCT,
                RolePrevilege_1.RolePrevileges.READ_PRODUCT,
                RolePrevilege_1.RolePrevileges.UPDATE_PRODUCT,
                RolePrevilege_1.RolePrevileges.DELETE_PRODUCT,
                // SALES
                RolePrevilege_1.RolePrevileges.READ_SALE,
                RolePrevilege_1.RolePrevileges.UPDATE_SALE,
                RolePrevilege_1.RolePrevileges.DELETE_SALE,
                // WAREHOUSE
                RolePrevilege_1.RolePrevileges.ALL_WAREHOUSE_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_WAREHOUSE,
                RolePrevilege_1.RolePrevileges.READ_WAREHOUSE,
                RolePrevilege_1.RolePrevileges.UPDATE_WAREHOUSE,
                RolePrevilege_1.RolePrevileges.DELETE_WAREHOUSE,
                // CUSTOMER
                RolePrevilege_1.RolePrevileges.ALL_CUSTOMER_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_CUSTOMER,
                RolePrevilege_1.RolePrevileges.READ_CUSTOMER,
                RolePrevilege_1.RolePrevileges.UPDATE_CUSTOMER,
                RolePrevilege_1.RolePrevileges.DELETE_CUSTOMER,
                // STAFF
                RolePrevilege_1.RolePrevileges.ALL_STAFF_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_STAFF,
                RolePrevilege_1.RolePrevileges.READ_STAFF,
                RolePrevilege_1.RolePrevileges.UPDATE_STAFF,
                RolePrevilege_1.RolePrevileges.DELETE_STAFF,
                // SUPPLY
                RolePrevilege_1.RolePrevileges.ALL_SUPPLY_OPERATIONS,
                RolePrevilege_1.RolePrevileges.ADD_SUPPLY,
                RolePrevilege_1.RolePrevileges.READ_SUPPLY,
                RolePrevilege_1.RolePrevileges.UPDATE_SUPPLY,
                RolePrevilege_1.RolePrevileges.DELETE_SUPPLY,
                // ENTERPRISE
                RolePrevilege_1.RolePrevileges.ADD_ENTERPRISE,
                RolePrevilege_1.RolePrevileges.UPDATE_ENTERPRISE,
                // INITIALIZED_SYSTEM
                RolePrevilege_1.RolePrevileges.INITIALIZED_SYSTEM,
            ],
        };
        if (staffPrevileges[authenticatedStaff.role].includes(previlege)) {
            return authenticatedStaff;
        }
        throw new Error(`[UNAUTHORIZED]: you are not authorized to "${RolePrevilege_1.RolePrevileges[previlege].replace('_', ' ')}".`);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.default = staffRoleAuthorization;
