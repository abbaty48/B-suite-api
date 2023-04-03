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
const helpers_1 = require("../commons/helpers");
const schema_staff_1 = require("../databases/mongodb/schema_staff");
const schema_product_1 = require("../databases/mongodb/schema_product");
const schema_warehouse_1 = require("../databases/mongodb/schema_warehouse");
const RolePrevilage_1 = require("../databases/mongodb/enums/RolePrevilage");
const authorizationMiddleware_1 = __importDefault(require("../commons/auths/authorizationMiddleware"));
const IPagin_1 = require("../databases/mongodb/interfaces/IPagin");
exports.WarehouseResolver = {
    warehouse: (searchFilter, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Apply Authorization Role
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.READ_WAREHOUSE);
                const { warehouseID, name, address } = searchFilter;
                // FINDS WAREHOUSES
                const warehouse = yield schema_warehouse_1.warehouseModel.findOne({
                    $or: [
                        warehouseID ? { warehouseID: { $eq: warehouseID } } : {},
                        name
                            ? { name: { $regex: (0, helpers_1.escapeRegExp)(name), $options: 'si' } }
                            : {},
                        address
                            ? { address: { $regex: (0, helpers_1.escapeRegExp)(address), $options: 'si' } }
                            : {},
                    ],
                }, {}, { populate: 'staffs products' });
                // console.log('WAREHOUSE: ', warehouse);
                // RESOLVE
                resolve({
                    error: null,
                    warehouse,
                }); // end resolve
            }
            catch (error) {
                resolve({
                    error: `[EXCEPTION]: ${error.message}`,
                    warehouse: null,
                }); // end resolve
            } // end catch
        })); // end promise
    }),
    warehouses: (searchFilter, pagin, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                // Apply Authorization Role
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.READ_WAREHOUSE);
                // SEARCHFILTER
                const { warehouseID, name, address } = searchFilter !== null && searchFilter !== void 0 ? searchFilter : {};
                // FILTERS
                const sort = (_a = pagin === null || pagin === void 0 ? void 0 : pagin.sort) !== null && _a !== void 0 ? _a : IPagin_1.Pagin.sort, limit = (_b = pagin === null || pagin === void 0 ? void 0 : pagin.limit) !== null && _b !== void 0 ? _b : IPagin_1.Pagin.limit, pageIndex = (_c = pagin === null || pagin === void 0 ? void 0 : pagin.pageIndex) !== null && _c !== void 0 ? _c : IPagin_1.Pagin.pageIndex;
                // FINDS WAREHOUSES
                const warehouses = yield schema_warehouse_1.warehouseModel.find({
                    $or: [
                        warehouseID ? { warehouseID: { $eq: warehouseID } } : {},
                        name
                            ? { name: { $regex: (0, helpers_1.escapeRegExp)(name), $options: 'si' } }
                            : {},
                        address
                            ? {
                                address: {
                                    $regex: (0, helpers_1.escapeRegExp)(address),
                                    $options: 'si',
                                },
                            }
                            : {},
                    ],
                }, {}, {
                    sort: { name: sort },
                    skip: pageIndex * limit,
                    limit,
                    populate: 'staffs products',
                });
                // RESOLVE
                resolve({
                    error: null,
                    warehouses,
                }); // end resolve
            }
            catch (error) {
                resolve({
                    warehouses: [],
                    error: `[EXCEPTION]: ${error.message}`,
                }); // end resolve
            } // end catch
        })); // end promise
    }),
    addWarehouse: (addWarehouseInput, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Apply Authorization Role
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.ADD_WAREHOUSE);
                //
                const warehouseID = `WID${(0, helpers_1.genRandom)().toUpperCase()}`;
                const newAdded = yield schema_warehouse_1.warehouseModel.create(Object.assign(Object.assign({}, addWarehouseInput), { warehouseID })); // end create
                resolve({
                    error: null,
                    added: true,
                    newAdded: yield newAdded.populate('staffs products'),
                }); // end resolve
            }
            catch (error) {
                resolve({
                    error: `[EXCEPTION]: ${error.message}`,
                    added: false,
                    newAdded: null,
                }); // end resolve
            } // end catch
        })); // end promise
    }),
    editWarehouse: (editWarehouseInput, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Apply Authorization Role
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.UPDATE_WAREHOUSE);
                const newEdited = yield schema_warehouse_1.warehouseModel.findOneAndUpdate({ warehouseID: editWarehouseInput.warehouseID }, { $set: Object.assign({}, editWarehouseInput) }, {
                    new: true,
                    context: 'query',
                    runValidators: true,
                    populate: 'staffs products',
                }); // end findOneAndUpdate
                resolve({
                    error: null,
                    newEdited,
                    edited: newEdited ? true : false,
                }); // end resolve
            }
            catch (error) {
                resolve({
                    edited: true,
                    newEdited: null,
                    error: `[EXCEPTION]: ${error.message}`,
                }); // end resolve
            }
        })); // end Promise
    }),
    deleteWarehouse: (warehouseID, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Apply Authorization Role
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.DELETE_WAREHOUSE);
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
                        resolve({
                            error: `[EXCEPTION] : ${error.message}`,
                            deleted: false,
                        }); // end resolve
                    } // end catch
                }) // end  callback
                ); // end findOneAndRemove
            }
            catch (error) {
                resolve({
                    deleted: false,
                    error: `[EXCEPTION]: ${error.message}`,
                }); // end resolve
            } // end catch
        })); // end Promise
    }), // end deleteCategory
}; // end CategoryResolver
