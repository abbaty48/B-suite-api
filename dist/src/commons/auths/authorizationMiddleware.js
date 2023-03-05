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
const RolePrevilage_1 = require("../../databases/mongodb/enums/RolePrevilage");
const staffJWTAuthenticationMiddleware_1 = require("./staffJWTAuthenticationMiddleware");
const staffRoleAuthorization = (req, res, privateKey, previlege) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authenticatedStaff = yield (0, staffJWTAuthenticationMiddleware_1.staffVerifyToken)(req, res, privateKey);
        const staffPrevileges = {
            Accountant: [
                RolePrevilage_1.RolePrevileges.ALL_CATEGORY_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_CATEGORY,
                RolePrevilage_1.RolePrevileges.READ_CATEGORY,
                RolePrevilage_1.RolePrevileges.UPDATE_CATEGORY,
                RolePrevilage_1.RolePrevileges.DELETE_CATEGORY,
                RolePrevilage_1.RolePrevileges.ALL_PRODUCT_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_PRODUCT,
                RolePrevilage_1.RolePrevileges.READ_PRODUCT,
                RolePrevilage_1.RolePrevileges.UPDATE_PRODUCT,
                RolePrevilage_1.RolePrevileges.DELETE_PRODUCT,
                RolePrevilage_1.RolePrevileges.ALL_SALE_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_SALE,
                RolePrevilage_1.RolePrevileges.READ_SALE,
                RolePrevilage_1.RolePrevileges.UPDATE_SALE,
                RolePrevilage_1.RolePrevileges.DELETE_SALE,
                RolePrevilage_1.RolePrevileges.ALL_WAREHOUSE_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_WAREHOUSE,
                RolePrevilage_1.RolePrevileges.READ_WAREHOUSE,
                RolePrevilage_1.RolePrevileges.UPDATE_WAREHOUSE,
                RolePrevilage_1.RolePrevileges.DELETE_WAREHOUSE,
                RolePrevilage_1.RolePrevileges.ALL_CUSTOMER_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_CUSTOMER,
                RolePrevilage_1.RolePrevileges.READ_CUSTOMER,
                RolePrevilage_1.RolePrevileges.UPDATE_CUSTOMER,
                RolePrevilage_1.RolePrevileges.DELETE_CUSTOMER,
                RolePrevilage_1.RolePrevileges.ALL_STAFF_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_STAFF,
                RolePrevilage_1.RolePrevileges.READ_STAFF,
                RolePrevilage_1.RolePrevileges.UPDATE_STAFF,
                RolePrevilage_1.RolePrevileges.DELETE_STAFF,
            ],
            Manager: [
                // CATEGORY
                RolePrevilage_1.RolePrevileges.ALL_CATEGORY_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_CATEGORY,
                RolePrevilage_1.RolePrevileges.READ_CATEGORY,
                RolePrevilage_1.RolePrevileges.UPDATE_CATEGORY,
                RolePrevilage_1.RolePrevileges.DELETE_CATEGORY,
                // PRODUCTS
                RolePrevilage_1.RolePrevileges.ALL_PRODUCT_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_PRODUCT,
                RolePrevilage_1.RolePrevileges.READ_PRODUCT,
                RolePrevilage_1.RolePrevileges.UPDATE_PRODUCT,
                RolePrevilage_1.RolePrevileges.DELETE_PRODUCT,
                // SALE
                RolePrevilage_1.RolePrevileges.READ_SALE,
                RolePrevilage_1.RolePrevileges.UPDATE_SALE,
                RolePrevilage_1.RolePrevileges.DELETE_SALE,
                // WAREHOUSE
                RolePrevilage_1.RolePrevileges.ALL_WAREHOUSE_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_WAREHOUSE,
                RolePrevilage_1.RolePrevileges.READ_WAREHOUSE,
                RolePrevilage_1.RolePrevileges.UPDATE_WAREHOUSE,
                RolePrevilage_1.RolePrevileges.DELETE_WAREHOUSE,
                // CUSTOMER
                RolePrevilage_1.RolePrevileges.DELETE_CUSTOMER,
                RolePrevilage_1.RolePrevileges.READ_CUSTOMER,
                RolePrevilage_1.RolePrevileges.UPDATE_CUSTOMER,
                // STAFF
                RolePrevilage_1.RolePrevileges.ALL_STAFF_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_STAFF,
                RolePrevilage_1.RolePrevileges.READ_STAFF,
                RolePrevilage_1.RolePrevileges.UPDATE_STAFF,
                RolePrevilage_1.RolePrevileges.DELETE_STAFF,
            ],
            Warehouse: [
                RolePrevilage_1.RolePrevileges.ALL_CATEGORY_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_CATEGORY,
                RolePrevilage_1.RolePrevileges.READ_CATEGORY,
                RolePrevilage_1.RolePrevileges.UPDATE_CATEGORY,
                RolePrevilage_1.RolePrevileges.DELETE_CATEGORY,
                RolePrevilage_1.RolePrevileges.ALL_PRODUCT_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_PRODUCT,
                RolePrevilage_1.RolePrevileges.READ_PRODUCT,
                RolePrevilage_1.RolePrevileges.UPDATE_PRODUCT,
                RolePrevilage_1.RolePrevileges.DELETE_PRODUCT,
                RolePrevilage_1.RolePrevileges.ALL_WAREHOUSE_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_WAREHOUSE,
                RolePrevilage_1.RolePrevileges.READ_WAREHOUSE,
                RolePrevilage_1.RolePrevileges.UPDATE_WAREHOUSE,
                RolePrevilage_1.RolePrevileges.DELETE_WAREHOUSE,
            ],
            Saller: [
                RolePrevilage_1.RolePrevileges.READ_PRODUCT,
                RolePrevilage_1.RolePrevileges.ALL_SALE_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_SALE,
                RolePrevilage_1.RolePrevileges.READ_SALE,
                RolePrevilage_1.RolePrevileges.UPDATE_SALE,
                RolePrevilage_1.RolePrevileges.DELETE_SALE,
                RolePrevilage_1.RolePrevileges.ALL_CUSTOMER_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_CUSTOMER,
                RolePrevilage_1.RolePrevileges.READ_CUSTOMER,
                RolePrevilage_1.RolePrevileges.UPDATE_CUSTOMER,
                RolePrevilage_1.RolePrevileges.DELETE_CUSTOMER,
            ],
            Admin: [
                RolePrevilage_1.RolePrevileges.ALL_CATEGORY_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_CATEGORY,
                RolePrevilage_1.RolePrevileges.READ_CATEGORY,
                RolePrevilage_1.RolePrevileges.UPDATE_CATEGORY,
                RolePrevilage_1.RolePrevileges.DELETE_CATEGORY,
                RolePrevilage_1.RolePrevileges.ALL_PRODUCT_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_PRODUCT,
                RolePrevilage_1.RolePrevileges.READ_PRODUCT,
                RolePrevilage_1.RolePrevileges.UPDATE_PRODUCT,
                RolePrevilage_1.RolePrevileges.DELETE_PRODUCT,
                // SALES
                RolePrevilage_1.RolePrevileges.READ_SALE,
                RolePrevilage_1.RolePrevileges.UPDATE_SALE,
                RolePrevilage_1.RolePrevileges.DELETE_SALE,
                RolePrevilage_1.RolePrevileges.ALL_WAREHOUSE_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_WAREHOUSE,
                RolePrevilage_1.RolePrevileges.READ_WAREHOUSE,
                RolePrevilage_1.RolePrevileges.UPDATE_WAREHOUSE,
                RolePrevilage_1.RolePrevileges.DELETE_WAREHOUSE,
                RolePrevilage_1.RolePrevileges.ALL_CUSTOMER_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_CUSTOMER,
                RolePrevilage_1.RolePrevileges.READ_CUSTOMER,
                RolePrevilage_1.RolePrevileges.UPDATE_CUSTOMER,
                RolePrevilage_1.RolePrevileges.DELETE_CUSTOMER,
                RolePrevilage_1.RolePrevileges.ALL_STAFF_OPERATIONS,
                RolePrevilage_1.RolePrevileges.ADD_STAFF,
                RolePrevilage_1.RolePrevileges.READ_STAFF,
                RolePrevilage_1.RolePrevileges.UPDATE_STAFF,
                RolePrevilage_1.RolePrevileges.DELETE_STAFF,
            ],
        };
        if (staffPrevileges[authenticatedStaff.role].includes(previlege)) {
            return authenticatedStaff;
        }
        throw new Error(`[UNAUTHORIZED]: you are not authorized to "${RolePrevilage_1.RolePrevileges[previlege].replace('_', ' ')}".`);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.default = staffRoleAuthorization;
