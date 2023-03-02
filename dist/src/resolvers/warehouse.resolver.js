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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseResolver = void 0;
const schema_staff_1 = require("../databases/mongodb/schema_staff");
const index_datasources_1 = require("../datasources/index.datasources");
const schema_product_1 = require("../databases/mongodb/schema_product");
const schema_warehouse_1 = require("../databases/mongodb/schema_warehouse");
const RolePrevilage_1 = require("../databases/mongodb/enums/RolePrevilage");
const authorizationMiddleware_1 = __importDefault(require("../commons/auths/authorizationMiddleware"));
(0, index_datasources_1.mongodbService)();
exports.WarehouseResolver = {
    warehouses: ({ request, response, config, }) => __awaiter(void 0, void 0, void 0, function* () {
        // Apply Authorization Role
        yield (0, authorizationMiddleware_1.default)(request, response, config, RolePrevilage_1.RolePrevileges.READ_WAREHOUSE);
        return yield schema_warehouse_1.warehouseModel.find();
    }),
    addWarehouse: (inputs, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            const { warehouseID, address, products, staffs } = inputs;
            try {
                if (yield schema_warehouse_1.warehouseModel.exists({ address })) {
                    return resolve({
                        error: `A warehouse with the same address "${address}" already exist, please provide a new one.`,
                        added: false,
                        newAdded: null,
                    });
                } // end if-exists
                // Apply Authorization Role
                yield (0, authorizationMiddleware_1.default)(request, response, config, RolePrevilage_1.RolePrevileges.READ_WAREHOUSE);
                schema_warehouse_1.warehouseModel.create({
                    warehouseID,
                    address,
                    staffs: staffs !== null && staffs !== void 0 ? staffs : [],
                    products: products !== null && products !== void 0 ? products : [],
                }, (error, result) => {
                    if (error) {
                        return resolve({
                            error: 'Error adding a new warehouse, REASON: ' + error.message,
                            added: false,
                            newAdded: null,
                        });
                    }
                    resolve({
                        error: null,
                        added: true,
                        newAdded: result,
                    });
                });
            }
            catch (error) {
                resolve({
                    error: error.message,
                    added: false,
                    newAdded: null,
                });
            } // end catch
        })); // end promise
    }),
    editWarehouse: (inputs, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            const { warehouseID, address, products, staffs } = inputs;
            if (yield schema_warehouse_1.warehouseModel.exists({ address })) {
                return resolve({
                    edited: false,
                    error: `A warehouse with the same "${address}" already exist, please provide a new one.`,
                });
            } // end if-exists
            // Apply Authorization Role
            yield (0, authorizationMiddleware_1.default)(request, response, config, RolePrevilage_1.RolePrevileges.UPDATE_WAREHOUSE);
            schema_warehouse_1.warehouseModel.findOneAndUpdate({ warehouseID }, { $set: { address, staffs, products } }, (error, updatedCategory) => __awaiter(void 0, void 0, void 0, function* () {
                // if error
                if (error) {
                    return resolve({
                        edited: false,
                        error: error.message,
                    });
                } // end error
                resolve({
                    edited: true,
                    error: null,
                }); // end resolve
            }) // end callback
            ); // end findOneAndUpdate
        })); // end Promise
    }),
    deleteWarehouse: (warehouseID, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            // Apply Authorization Role
            yield (0, authorizationMiddleware_1.default)(request, response, config, RolePrevilage_1.RolePrevileges.DELETE_WAREHOUSE);
            schema_warehouse_1.warehouseModel.findOneAndRemove({ warehouseID }, (error, deletedCategory) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    return resolve({ deleted: false, error: error.message });
                } // end if
                try {
                    // Delete all products under the warehouse
                    yield schema_product_1.productModel.deleteMany({ warehouseID });
                    // Delete all staffs under the warehouse
                    yield schema_staff_1.staffModel.deleteMany({ warehouseID });
                    resolve({ deleted: true, error: null });
                }
                catch (error) {
                    resolve({ error: error.message, deleted: false });
                } // end catch
            }) // end  callback
            ); // end findOneAndRemove
        })); // end Promise
    }), // end deleteCategory
}; // end CategoryResolver
