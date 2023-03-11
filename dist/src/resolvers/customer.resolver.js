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
exports.CustomerResolver = void 0;
const IFilter_1 = require("../databases/mongodb/interfaces/IFilter");
const helpers_1 = require("../commons/helpers");
const schema_customer_1 = require("../databases/mongodb/schema_customer");
const RolePrevilage_1 = require("../databases/mongodb/enums/RolePrevilage");
const authorizationMiddleware_1 = __importDefault(require("../commons/auths/authorizationMiddleware"));
exports.CustomerResolver = {
    customer: (searchFilter, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.READ_CUSTOMER); //end staffRoleAuthorization
                // SEARCH A STAFF BY EITHER (staffID, firstName, lastName, warehouse)
                //AND POPULATE THE STAFF WITH WAREHOUSE
                const { name, email, customerID, address, dateOfBirth, beneficiaries } = searchFilter !== null && searchFilter !== void 0 ? searchFilter : {};
                const customer = yield schema_customer_1.customerModel.findOne({
                    $or: [
                        customerID
                            ? {
                                customerID: {
                                    $eq: customerID,
                                },
                            }
                            : {},
                        name
                            ? {
                                name: {
                                    $eq: name,
                                },
                            }
                            : {},
                        email
                            ? {
                                email: {
                                    $eq: email,
                                },
                            }
                            : {},
                        address
                            ? {
                                address: {
                                    $eq: address,
                                },
                            }
                            : {},
                        dateOfBirth
                            ? {
                                'metas.dateOfBirth': {
                                    $regex: (0, helpers_1.escapeRegExp)(dateOfBirth),
                                    $options: 'si',
                                },
                            }
                            : {},
                        beneficiaries !== undefined
                            ? {
                                beneficiary: beneficiaries,
                            }
                            : {},
                    ],
                }, {}, {
                    populate: {
                        path: 'warehouse purchases',
                        populate: 'staff products',
                    },
                });
                resolve({
                    error: null,
                    customer,
                });
            }
            catch (error) {
                resolve({
                    error: `[INTERVAL ERROR]: ${error.message}`,
                    customer: null,
                }); // end resolve
            } // end catch
        })); // end Promise
    }),
    customers: (searchFilter, filter, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.READ_CUSTOMER); //end staffRoleAuthorization
                const { name, email, customerID, address, dateOfBirth, beneficiaries } = searchFilter !== null && searchFilter !== void 0 ? searchFilter : {};
                // PAGINATE THE STAFFS
                const sort = (_a = filter === null || filter === void 0 ? void 0 : filter.sort) !== null && _a !== void 0 ? _a : IFilter_1.Filter.sort, limit = (_b = filter === null || filter === void 0 ? void 0 : filter.limit) !== null && _b !== void 0 ? _b : IFilter_1.Filter.limit, pageIndex = (_c = filter === null || filter === void 0 ? void 0 : filter.pageIndex) !== null && _c !== void 0 ? _c : IFilter_1.Filter.pageIndex;
                const customers = yield schema_customer_1.customerModel
                    .find({
                    $or: [
                        customerID
                            ? {
                                customerID: {
                                    $eq: customerID,
                                },
                            }
                            : {},
                        name
                            ? {
                                name: {
                                    $regex: (0, helpers_1.escapeRegExp)(name),
                                    $options: 'si',
                                },
                            }
                            : {},
                        email
                            ? {
                                email: {
                                    $regex: (0, helpers_1.escapeRegExp)(email),
                                    $options: 'si',
                                },
                            }
                            : {},
                        address
                            ? {
                                address: {
                                    $regex: (0, helpers_1.escapeRegExp)(address),
                                    $options: 'si',
                                },
                            }
                            : {},
                        dateOfBirth
                            ? {
                                'metas.dateOfBirth': {
                                    $regex: (0, helpers_1.escapeRegExp)(dateOfBirth),
                                    $options: 'si',
                                },
                            }
                            : {},
                        beneficiaries !== undefined
                            ? {
                                beneficiary: beneficiaries,
                            }
                            : {},
                    ],
                }, {}, {
                    populate: {
                        path: 'warehouse purchases',
                        populate: 'staff products',
                    },
                })
                    .sort({ name: sort })
                    .skip(limit * pageIndex)
                    .limit(limit);
                console.log('CUSTOMERS: ', customers);
                // POPULATE THE STAFF WITH WAREHOUSE
                resolve({
                    error: null,
                    customers,
                    filters: {
                        sort,
                        totalFilter: customers.length,
                        nextPageIndex: pageIndex + 1,
                        currentPageIndex: pageIndex,
                        totalDocuments: yield schema_customer_1.customerModel.count(),
                    },
                });
            }
            catch (error) {
                resolve({
                    error: `[INTERVAL ERROR]: ${error.message}`,
                    customers: null,
                    filters: null,
                }); // end resolve
            } // end catch
        })); // end Promise
    }),
    addCustomers: (addCustomerInput, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.ADD_CUSTOMER); //end staffRoleAuthorization
                const customerID = `CIN${(0, helpers_1.genRandom)().slice(0, 5).toUpperCase()}`;
                const newAdded = yield schema_customer_1.customerModel.create(Object.assign({ customerID }, addCustomerInput));
                resolve({
                    added: true,
                    error: null,
                    newAdded: yield newAdded.populate({
                        path: 'warehouse purchases',
                        populate: 'staff products',
                    }),
                });
            }
            catch (error) {
                resolve({
                    added: false,
                    newAdded: null,
                    error: `[INTERVAL ERROR]: ${error.message}`,
                }); // end resolve
            } // end catch
        })); // end Promise
    }),
    editCustomers: (editCustomerInput, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.UPDATE_CUSTOMER); //end staffRoleAuthorization
                const newEdited = yield schema_customer_1.customerModel.findOneAndUpdate({
                    customerID: editCustomerInput.customerID,
                }, Object.assign({}, editCustomerInput), {
                    runValidators: true,
                    new: true,
                    populate: {
                        path: 'warehouse purchases',
                        populate: 'staff products',
                    },
                });
                resolve({
                    error: null,
                    edited: true,
                    newEdited,
                });
            }
            catch (error) {
                resolve({
                    edited: false,
                    newEdited: null,
                    error: `[INTERVAL ERROR]: ${error.message}`,
                }); // end resolve
            } // end catch
        })); // end Promise
    }),
    deleteCustomers: (customerID, warehouseID, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.DELETE_CUSTOMER); //end staffRoleAuthorization
                if (warehouseID) {
                    yield schema_customer_1.customerModel.findOneAndRemove({
                        $and: [{ customerID }, { warehouseID }],
                    });
                }
                else {
                    yield schema_customer_1.customerModel.findOneAndRemove({ customerID });
                }
                resolve({
                    error: null,
                    deleted: true,
                });
            }
            catch (error) {
                resolve({
                    deleted: false,
                    error: `[INTERVAL ERROR]: ${error.message}`,
                }); // end resolve
            } // end catch
        })); // end Promise
    }),
};
