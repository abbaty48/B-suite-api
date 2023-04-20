"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeStaff = void 0;
const graphql_1 = require("graphql");
const RolePrevilege_1 = require("../../models/databases/mongodb/enums/RolePrevilege");
const AuthorizeStaff = (previlege, authenticatedStaff) => {
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
            // SUBSCRIPTION
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_CATEGORY,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_PRODUCT,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_SALE,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_STAFF,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_SUPPLY,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_WAREHOUSE,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_CATEGORY,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_PRODUCT,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_SALE,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_SUPPLY,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_WAREHOUSE,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_CATEGORY,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_PRODUCT,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_SALE,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_STAFF,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_SUPPLY,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_WAREHOUSE,
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
            // SUBSCRIPTION
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_CATEGORY,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_PRODUCT,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_SALE,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_STAFF,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_SUPPLY,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_WAREHOUSE,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_CATEGORY,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_PRODUCT,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_SALE,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_SUPPLY,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_WAREHOUSE,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_CATEGORY,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_PRODUCT,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_SALE,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_STAFF,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_SUPPLY,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_WAREHOUSE,
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
            // SUBSCRIPTION
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_PRODUCT,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_SUPPLY,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_WAREHOUSE,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_PRODUCT,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_SUPPLY,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_WAREHOUSE,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_PRODUCT,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_SUPPLY,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_WAREHOUSE,
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
            // SUBSCRIPTION
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_CATEGORY,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_PRODUCT,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_SALE,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_SUPPLY,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_WAREHOUSE,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_CATEGORY,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_PRODUCT,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_SALE,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_SUPPLY,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_CATEGORY,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_PRODUCT,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_SALE,
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
            // SUBSCRIPTION
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_CATEGORY,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_PRODUCT,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_SALE,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_STAFF,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_SUPPLY,
            RolePrevilege_1.RolePrevileges.LISTEN_ADD_WAREHOUSE,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_CATEGORY,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_PRODUCT,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_SALE,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_SUPPLY,
            RolePrevilege_1.RolePrevileges.LISTEN_EDIT_WAREHOUSE,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_CATEGORY,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_PRODUCT,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_SALE,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_STAFF,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_SUPPLY,
            RolePrevilege_1.RolePrevileges.LISTEN_DELETE_WAREHOUSE,
            // ENTERPRISE
            RolePrevilege_1.RolePrevileges.ADD_ENTERPRISE,
            RolePrevilege_1.RolePrevileges.UPDATE_ENTERPRISE,
            // INITIALIZED_SYSTEM
            RolePrevilege_1.RolePrevileges.INITIALIZED_SYSTEM,
        ],
    };
    /*
     * Check if the authenticated staff role includes the any the prelilege, then return the staff,
     */
    if (staffPrevileges[authenticatedStaff.role].includes(previlege)) {
        return authenticatedStaff;
    }
    // else return an error
    throw new graphql_1.GraphQLError(`You are not authorized to "${RolePrevilege_1.RolePrevileges[previlege].replace('_', ' ')}".`, {
        extensions: {
            code: 'UNAUTHORIZED',
            http: { status: 401 },
        },
    }); // end GraphQLError
}; // end
exports.AuthorizeStaff = AuthorizeStaff;
