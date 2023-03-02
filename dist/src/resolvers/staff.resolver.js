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
exports.StaffResolver = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("../datasources/mongodb");
const Role_1 = require("../databases/mongodb/enums/Role");
const schema_staff_1 = require("../databases/mongodb/schema_staff");
const authorizationMiddleware_1 = __importDefault(require("../commons/auths/authorizationMiddleware"));
const helpers_1 = require("../commons/helpers");
const IFilter_1 = require("../databases/mongodb/interfaces/IFilter");
const RolePrevilage_1 = require("../databases/mongodb/enums/RolePrevilage");
(0, mongodb_1.mongodbService)();
exports.StaffResolver = {
    staff: (searchFilter, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                //
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.READ_STAFF);
                // SEARCH A STAFF BY EITHER (staffID, firstName, lastName, warehouse)
                //AND POPULATE THE STAFF WITH WAREHOUSE
                const { staffID, firstName, lastName, warehouseID } = searchFilter;
                const staff = yield schema_staff_1.staffModel.findOne({
                    $or: [
                        { staffID: { $regex: (0, helpers_1.escapeRegExp)(staffID), $options: 'su' } },
                        { firstName: { $eq: (0, helpers_1.escapeRegExp)(firstName), $options: 'si' } },
                        { lastName: { $eq: (0, helpers_1.escapeRegExp)(lastName), $options: 'si' } },
                        warehouseID
                            ? {
                                warehouse: {
                                    warehouseID: { $eq: (0, helpers_1.stringToID)(warehouseID) },
                                },
                            }
                            : {},
                    ],
                }, {}, { populate: 'user' });
                resolve({
                    error: null,
                    staff,
                });
            }
            catch (error) {
                resolve({
                    error: error.message,
                    staff: null,
                });
            }
        }));
    }),
    staffs: (searchFilter, filter, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                // AUTHENTICATED
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.READ_STAFF);
                // SEARCH FILTER
                const { staffID, firstName, lastName, warehouseID } = searchFilter !== null && searchFilter !== void 0 ? searchFilter : {};
                // PAGINATE THE STAFFS
                const sort = (_a = filter.sort) !== null && _a !== void 0 ? _a : IFilter_1.Filter.sort, limit = (_b = filter.limit) !== null && _b !== void 0 ? _b : IFilter_1.Filter.limit, pageIndex = (_c = filter.pageIndex) !== null && _c !== void 0 ? _c : IFilter_1.Filter.pageIndex;
                const paginatedStaffs = yield schema_staff_1.staffModel
                    .find({
                    $or: [
                        staffID
                            ? { staffID: { $regex: (0, helpers_1.escapeRegExp)(staffID), $options: 'si' } }
                            : {},
                        firstName
                            ? {
                                firstName: {
                                    $regex: (0, helpers_1.escapeRegExp)(firstName),
                                    $options: 'si',
                                },
                            }
                            : {},
                        lastName
                            ? {
                                lastName: {
                                    $regex: (0, helpers_1.escapeRegExp)(lastName),
                                    $options: 'si',
                                },
                            }
                            : {},
                        warehouseID
                            ? {
                                warehouse: {
                                    warehouseID: { $eq: (0, helpers_1.stringToID)(warehouseID) },
                                },
                            }
                            : {},
                    ],
                })
                    .sort({ firstName: sort })
                    .skip(limit * pageIndex)
                    .limit(limit);
                // POPULATE THE STAFF WITH WAREHOUSE
                const staffs = yield schema_staff_1.staffModel.populate(paginatedStaffs, 'user');
                resolve({
                    error: null,
                    staffs,
                    filters: {
                        sort,
                        total: paginatedStaffs.length,
                        nextPageIndex: pageIndex + 1,
                        currentPageIndex: pageIndex,
                    },
                });
            }
            catch (error) {
                resolve({
                    error: error.message,
                    staffs: [],
                });
            }
        }));
    }),
    addStaff: (inputs, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // AUTHORIZE ONLY A MANAGER/ACCOUTANT/ADMIN
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.ADD_STAFF);
                const { firstName, lastName, email, password, role } = inputs;
                // CHECK USER VALIDATION
                if (role === Role_1.StaffRole.Manager || role === Role_1.StaffRole.Admin) {
                    // check for already manager
                    if (yield schema_staff_1.staffModel.exists({
                        $or: [{ role: Role_1.StaffRole.Manager }, { role: Role_1.StaffRole.Admin }],
                    })) {
                        return resolve({
                            added: false,
                            newAdded: null,
                            error: `A staff with a "${role}" role already exist, only one manager/admin is allowed, please provide a different role.`,
                        });
                    }
                }
                //   GENERATE STAFF UNIQUE ID
                const staffID = `ID${(0, helpers_1.genRandom)().slice(0, 5).toUpperCase()}`;
                //   BCRYPT STAFF PASSWORD
                const passwordHash = yield bcrypt_1.default.hash(password, yield bcrypt_1.default.genSalt());
                //   GENERATE TOKEN
                const token = jsonwebtoken_1.default.sign({
                    staffID,
                    firstName,
                    lastName,
                    email,
                    role,
                }, (0, helpers_1.decodeRSAKey)(config.get('jwt.private')), { algorithm: 'HS512' });
                const newStaff = yield schema_staff_1.staffModel.create(Object.assign(Object.assign({}, inputs), { staffID,
                    token, password: passwordHash }));
                resolve({
                    error: null,
                    added: true,
                    newAdded: newStaff,
                });
            }
            catch (error) {
                resolve({
                    error: error.message,
                    added: false,
                    newAdded: null,
                });
            }
        })); // end Promise
    }),
    editStaff: (inputs, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // AUTHORIZE ONLY A MANAGER/ACCOUTANT/ADMIN
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.UPDATE_STAFF);
                // TARGET STAFF
                const { staffID, firstName, lastName, email, role } = yield schema_staff_1.staffModel.findOne({ staffID: inputs.staffID });
                // CHECK USER VALIDATION
                if (inputs.role) {
                    if (inputs.role === Role_1.StaffRole.Manager ||
                        inputs.role === Role_1.StaffRole.Admin) {
                        // check for already manager
                        if (yield schema_staff_1.staffModel.exists({
                            $or: [{ role: Role_1.StaffRole.Manager }, { role: Role_1.StaffRole.Admin }],
                        })) {
                            return resolve({
                                edited: false,
                                newEdited: null,
                                error: `A staff with a "${inputs.role}" role already exist, only one manager/admin is allowed, please provide a different role.`,
                            });
                        }
                    }
                } // end if input.role
                // IF TO UPDATE THE PASSWORD
                let passwordHash, token;
                if (inputs.password) {
                    //   BCRYPT STAFF PASSWORD
                    passwordHash = yield bcrypt_1.default.hash(inputs.password, yield bcrypt_1.default.genSalt());
                    //   GENERATE TOKEN
                    token = jsonwebtoken_1.default.sign({
                        staffID,
                        firstName,
                        lastName,
                        email,
                        role,
                    }, (0, helpers_1.decodeRSAKey)(config.get('jwt.private')), { algorithm: 'HS512' });
                    // UPDATE WITH PASSWORD
                    const newEdited = yield schema_staff_1.staffModel.findOneAndUpdate({ staffID: inputs.staffID }, Object.assign(Object.assign({}, inputs), { password: passwordHash, token }));
                    return resolve({
                        edited: true,
                        error: null,
                        newEdited,
                    });
                } // end inputs.password
                // EDIT STAFF
                const newEdited = yield schema_staff_1.staffModel.findOneAndUpdate({ staffID: inputs.staffID }, Object.assign({}, inputs));
                // RESOLVE
                resolve({
                    edited: true,
                    error: null,
                    newEdited,
                });
            }
            catch (error) {
                resolve({
                    edited: false,
                    newEdited: null,
                    error: error.message,
                });
            }
        })); // end
    }),
    deleteStaff: (staffID, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // AUTHORIZE ONLY A MANAGER/ACCOUTANT/ADMIN
                const authStaff = yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.DELETE_STAFF);
                // TARGET STAFF
                const { role } = yield schema_staff_1.staffModel.findOne({ staffID });
                if (role === Role_1.StaffRole.Manager || role === Role_1.StaffRole.Admin) {
                    // ONLY ADMIN/MANAGER COULD DELETE A MANAGER/ADMIN
                    switch (authStaff.role) {
                        case Role_1.StaffRole.Saller:
                        case Role_1.StaffRole.Warehouse:
                        case Role_1.StaffRole.Accountant:
                            return resolve({
                                deleted: false,
                                error: 'UNAUTHORIZED ACTION, only a admin/manager could delete an admin/manager account.',
                            });
                    } // end switch
                } // end if role
                // DELETE THE TARGET
                yield schema_staff_1.staffModel.findOneAndRemove({ staffID });
                // RESOLVE
                resolve({
                    deleted: true,
                    error: null,
                });
            }
            catch (error) {
                // RESOLVE
                resolve({
                    deleted: false,
                    error: error.message,
                });
            }
        })); // end promise
    }), // end deleteStaff
}; // end StaffResolver
