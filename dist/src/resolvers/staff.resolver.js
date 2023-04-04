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
const Role_1 = require("../databases/mongodb/enums/Role");
const schema_staff_1 = require("../databases/mongodb/schema_staff");
const authorizationMiddleware_1 = __importDefault(require("../commons/auths/authorizationMiddleware"));
const helpers_1 = require("../commons/helpers");
const IPagin_1 = require("../databases/mongodb/interfaces/IPagin");
const RolePrevilage_1 = require("../databases/mongodb/enums/RolePrevilage");
const file_1 = require("../commons/file");
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
                        { staffID: { $regex: (0, helpers_1.escapeRegExp)(staffID), $options: 'si' } },
                        {
                            firstName: { $regex: (0, helpers_1.escapeRegExp)(firstName), $options: 'si' },
                        },
                        { lastName: { $regex: (0, helpers_1.escapeRegExp)(lastName), $options: 'si' } },
                        warehouseID
                            ? {
                                warehouse: {
                                    warehouseID: { $eq: (0, helpers_1.stringToID)(warehouseID) },
                                },
                            }
                            : {},
                    ],
                }, {}, { populate: 'warehouse' });
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
    staffs: (searchFilter, pagin, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                // AUTHENTICATED
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.READ_STAFF);
                // SEARCH FILTER
                const { staffID, firstName, lastName, warehouseID } = searchFilter !== null && searchFilter !== void 0 ? searchFilter : {};
                // PAGINATE THE STAFFS
                const sort = (_a = pagin.sort) !== null && _a !== void 0 ? _a : IPagin_1.Pagin.sort, limit = (_b = pagin.limit) !== null && _b !== void 0 ? _b : IPagin_1.Pagin.limit, pageIndex = (_c = pagin.pageIndex) !== null && _c !== void 0 ? _c : IPagin_1.Pagin.pageIndex;
                //
                const staffs = yield schema_staff_1.staffModel.find({
                    $or: [
                        staffID
                            ? {
                                staffID: {
                                    $regex: (0, helpers_1.escapeRegExp)(staffID),
                                    $options: 'si',
                                },
                            }
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
                }, {}, {
                    sort: { firstName: sort },
                    skip: limit * pageIndex,
                    limit,
                    populate: 'warehouse',
                });
                // POPULATE THE STAFF WITH WAREHOUSE
                resolve({
                    error: null,
                    staffs,
                    pagins: {
                        sort,
                        nextPageIndex: pageIndex + 1,
                        currentPageIndex: pageIndex,
                        totalPaginated: staffs.length,
                        totalDocuments: yield schema_staff_1.staffModel.count(),
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
    addStaff: (addStaffInput, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // AUTHORIZE ONLY A MANAGER/ACCOUTANT/ADMIN
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.ADD_STAFF);
                const { firstName, lastName, email, password, role, featureURI } = addStaffInput;
                // CHECK USER VALIDATION
                if (role === Role_1.StaffRole.Manager || role === Role_1.StaffRole.Admin) {
                    // check for already manager
                    if (yield schema_staff_1.staffModel.exists({
                        $or: [
                            role == Role_1.StaffRole.Manager ? { role: Role_1.StaffRole.Manager } : {},
                            role == Role_1.StaffRole.Admin ? { role: Role_1.StaffRole.Admin } : {},
                        ],
                    })) {
                        return resolve({
                            added: false,
                            newAdded: null,
                            error: `[VALIDATION ERROR]: A staff with a "${role}" role already exist, only one manager/admin is allowed, please provide a different role.`,
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
                yield schema_staff_1.staffModel.create(Object.assign(Object.assign({}, addStaffInput), { staffID,
                    token, password: passwordHash }), (error, newStaff) => __awaiter(void 0, void 0, void 0, function* () {
                    // IF ADD A PICTURE
                    if (featureURI) {
                        // UPLOAD THE PICTURE
                        const _feature = yield (0, file_1.serverFileUploader)(featureURI, `./public/uploads/features/staffs/${newStaff.staffID}`, config.get('server.domain'), `${newStaff.staffID}`);
                        if (_feature) {
                            newStaff.picture = _feature;
                            yield newStaff.save({ validateBeforeSave: false });
                        }
                    } // end if featureURI
                    //
                    resolve({
                        error: null,
                        added: true,
                        newAdded: newStaff,
                    });
                }));
            }
            catch (error) {
                resolve({
                    added: false,
                    newAdded: null,
                    error: `[EXCEPTION]: ${error.message}`,
                });
            }
        })); // end Promise
    }),
    editStaff: (editStaffInput, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // AUTHORIZE ONLY A MANAGER/ACCOUTANT/ADMIN
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.UPDATE_STAFF);
                // TARGET STAFF
                const { staffID, firstName, lastName, email, role } = yield schema_staff_1.staffModel.findOne({ staffID: editStaffInput.staffID });
                // CHECK USER VALIDATION
                if (editStaffInput.role) {
                    if (editStaffInput.role === Role_1.StaffRole.Manager ||
                        editStaffInput.role === Role_1.StaffRole.Admin) {
                        // check for already manager
                        if (yield schema_staff_1.staffModel.exists({
                            $or: [{ role: Role_1.StaffRole.Manager }, { role: Role_1.StaffRole.Admin }],
                        })) {
                            return resolve({
                                edited: false,
                                newEdited: null,
                                error: `[VALIDATION ERROR]: A staff with a "${editStaffInput.role}" role already exist, only one manager/admin is allowed, please provide a different role.`,
                            });
                        }
                    }
                } // end if input.role
                // IF TO UPDATE THE PASSWORD
                let passwordHash, token;
                if (editStaffInput.password) {
                    //   BCRYPT STAFF PASSWORD
                    passwordHash = yield bcrypt_1.default.hash(editStaffInput.password, yield bcrypt_1.default.genSalt());
                    //   GENERATE TOKEN
                    token = jsonwebtoken_1.default.sign({
                        staffID,
                        firstName,
                        lastName,
                        email,
                        role,
                    }, (0, helpers_1.decodeRSAKey)(config.get('jwt.private')), { algorithm: 'HS512' });
                    // UPDATE WITH PASSWORD
                    const newEdited = yield schema_staff_1.staffModel.findOneAndUpdate({ staffID: editStaffInput.staffID }, Object.assign(Object.assign({}, editStaffInput), { password: passwordHash, token }));
                    return resolve({
                        edited: true,
                        error: null,
                        newEdited,
                    });
                } // end editStaffInput.password
                // EDIT STAFF
                schema_staff_1.staffModel.findOneAndUpdate({ staffID: editStaffInput.staffID }, Object.assign({}, editStaffInput), { runValidators: true, new: true, populate: 'warehouse' }, (error, newEdited) => __awaiter(void 0, void 0, void 0, function* () {
                    var _d;
                    //
                    if (editStaffInput.editFeature) {
                        const { action, addFeatureURI, removeFeatureByName } = editStaffInput.editFeature;
                        if (action == 'ADD') {
                            // CHECK IF PICTURE ALREADY EXIST, REJECT, OTHERWISE ADD
                            if (newEdited.picture &&
                                (yield (0, file_1.checkFileExistant)(`.${(_d = newEdited.picture) === null || _d === void 0 ? void 0 : _d.filePath}`))) {
                                return resolve({
                                    edited: true,
                                    error: null,
                                    newEdited,
                                }); // end resolve;
                            }
                            else {
                                addFeatureURI.forEach((uri) => __awaiter(void 0, void 0, void 0, function* () {
                                    try {
                                        // upload each each
                                        const _feature = yield (0, file_1.serverFileUploader)(
                                        // IMAGEPATH
                                        uri, 
                                        // UPLOAD PATH
                                        `./public/uploads/features/staffs/${newEdited.staffID}`, 
                                        // SERVER URL
                                        config.get('server.domain'), 
                                        // DESTINATED FILE NAME
                                        `${newEdited.staffID}`);
                                        if (_feature) {
                                            newEdited.picture = _feature;
                                            yield newEdited.save({ validateBeforeSave: false });
                                        }
                                    }
                                    catch (error) { }
                                })); // end forEach
                            } // end
                        }
                        else if (action == 'REMOVE') {
                            if ((0, file_1.deleteFileUploader)(`./public/uploads/features/staffs/${editStaffInput.staffID}`)) {
                                // delete the file the product feature array
                                newEdited.picture = undefined;
                                yield newEdited.save({ validateBeforeSave: false });
                            }
                        } // end if EDIT
                    } // end editFeature
                    // RESOLVE
                    resolve({
                        edited: true,
                        error: null,
                        newEdited,
                    }); // end resolve
                }) // end callback
                ); // end fineOneAndUpdate
            }
            catch (error) {
                resolve({
                    edited: false,
                    newEdited: null,
                    error: `[EXCEPTION]: ${error.message}`,
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
                                error: '[UNAUTHORIZED ACTION]: Only a admin/manager could delete an admin/manager account.',
                            });
                    } // end switch
                } // end if role
                // DELETE THE TARGET
                yield schema_staff_1.staffModel.findOneAndRemove({ staffID });
                // DELETE STAFF PICTURE
                yield (0, file_1.deleteDirUploader)(`./public/uploads/features/staffs/${staffID}`);
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
                    error: `[EXCEPTION]: ${error.message}`,
                });
            }
        })); // end promise
    }), // end deleteStaff
}; // end StaffResolver
