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
exports.ProductResolver = void 0;
const config_1 = __importDefault(require("config"));
const schema_product_1 = require("../databases/mongodb/schema_product");
const IPagin_1 = require("../databases/mongodb/interfaces/IPagin");
const file_1 = require("../commons/file");
const helpers_1 = require("../commons/helpers");
const RolePrevilage_1 = require("../databases/mongodb/enums/RolePrevilage");
const authorizationMiddleware_1 = __importDefault(require("../commons/auths/authorizationMiddleware"));
const schema_warehouse_1 = require("../databases/mongodb/schema_warehouse");
exports.ProductResolver = {
    product: (searchFilter, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // AUTHENTICATE
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.READ_PRODUCT); // end staffRoleAuthorization
                // SEARCH FILTER
                const { name, inStock, expired, quantity, productID, categoryID, warehouseID, retailPrice, expirationDate, wholesalePrice, } = searchFilter;
                const product = yield schema_product_1.productModel.findOne({
                    $or: [
                        inStock !== undefined ? { inStock } : {},
                        expired !== undefined ? { expired } : {},
                        quantity ? { quantity: { $eq: quantity } } : {},
                        retailPrice ? { retailPrice: { $eq: retailPrice } } : {},
                        expirationDate ? { expirationDate: { $eq: expirationDate } } : {},
                        wholesalePrice ? { wholesalePrice: { $eq: wholesalePrice } } : {},
                        name
                            ? { name: { $regex: (0, helpers_1.escapeRegExp)(name), $options: 'si' } }
                            : {},
                        productID
                            ? {
                                productID: {
                                    $eq: productID,
                                },
                            }
                            : {},
                        categoryID
                            ? {
                                category: { $eq: (0, helpers_1.stringToID)(categoryID) },
                            }
                            : {},
                        warehouseID
                            ? {
                                warehouses: [warehouseID],
                            }
                            : {},
                    ],
                }, {}, { populate: 'category warehouses' });
                resolve({
                    error: null,
                    product,
                });
            }
            catch (error) {
                resolve({
                    product: null,
                    error: `[EXCEPTION]: ${error.message}`,
                }); // end resolve
            } // end catch
        })); // end  promise
    }),
    products: (searchFilter, pagin, { request, config, response }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                // AUTHENTICATE
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.READ_PRODUCT);
                // SEARCH FILTER
                const { name, inStock, expired, quantity, productID, categoryID, retailPrice, warehouseID, expirationDate, wholesalePrice, } = searchFilter !== null && searchFilter !== void 0 ? searchFilter : {};
                // PAGINATE THE PRODUCTS
                const sort = (_a = pagin === null || pagin === void 0 ? void 0 : pagin.sort) !== null && _a !== void 0 ? _a : IPagin_1.Pagin.sort, limit = (_b = pagin === null || pagin === void 0 ? void 0 : pagin.limit) !== null && _b !== void 0 ? _b : IPagin_1.Pagin.limit, pageIndex = (_c = pagin === null || pagin === void 0 ? void 0 : pagin.pageIndex) !== null && _c !== void 0 ? _c : IPagin_1.Pagin.pageIndex;
                //
                const products = yield schema_product_1.productModel.find({
                    $or: [
                        inStock !== undefined ? { inStock } : {},
                        expired !== undefined ? { expired } : {},
                        quantity ? { quantity: { $eq: quantity } } : {},
                        retailPrice ? { retailPrice: { $eq: retailPrice } } : {},
                        expirationDate ? { expirationDate: { $eq: expirationDate } } : {},
                        wholesalePrice ? { wholesalePrice: { $eq: wholesalePrice } } : {},
                        name
                            ? { name: { $regex: (0, helpers_1.escapeRegExp)(name), $options: 'si' } }
                            : {},
                        productID
                            ? {
                                productID: {
                                    $eq: productID,
                                },
                            }
                            : {},
                        categoryID
                            ? {
                                category: { $eq: (0, helpers_1.stringToID)(categoryID) },
                            }
                            : {},
                        warehouseID
                            ? {
                                warehouse: { $eq: (0, helpers_1.stringToID)(warehouseID) },
                            }
                            : {},
                    ],
                }, {}, {
                    sort: { name: { sort } },
                    skip: limit * pageIndex,
                    limit,
                    populate: 'category warehouses',
                });
                resolve({
                    error: null,
                    products,
                    pagins: {
                        sort,
                        currentPageIndex: pageIndex,
                        nextPageIndex: pageIndex + 1,
                        totalPaginated: products.length,
                        totalDocuments: yield schema_product_1.productModel.count(),
                    }, // end pagins
                }); // end resolve
            }
            catch (error) {
                resolve({
                    pagins: null,
                    products: [],
                    error: `[EXCEPTION]: ${error.message}`,
                }); // end resolve
            } // end catch
        })); // end promise
    }),
    addProduct: (addProductInput, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.ADD_PRODUCT);
                const productID = `PID${(0, helpers_1.genRandom)(10)}`;
                yield schema_product_1.productModel.create(Object.assign(Object.assign({}, addProductInput), { productID, category: addProductInput.categoryID }), (error, newAdded) => __awaiter(void 0, void 0, void 0, function* () {
                    /**
                     * FEATURES
                     * --upload features image if provided
                     */
                    if (addProductInput.featuresURI) {
                        addProductInput.featuresURI.forEach((uri) => __awaiter(void 0, void 0, void 0, function* () {
                            try {
                                // upload each each
                                const _feature = yield (0, file_1.serverFileUploader)(
                                // IMAGEPATH
                                uri, 
                                // UPLOAD PATH
                                `./public/uploads/features/products/${productID.toUpperCase()}`, 
                                // SERVER URL
                                config.get('server.domain'), 
                                // DESTINATED FILE NAME
                                `${addProductInput.name}_${(0, helpers_1.genRandom)().toLowerCase()}`);
                                if (_feature) {
                                    // console.log('_F: ', _feature);
                                    newAdded.features.push(_feature);
                                    yield newAdded.save({ validateBeforeSave: false });
                                    // _features.push(_feature);
                                }
                            }
                            catch (error) { }
                        })); // end forEach
                        // update the
                        // console.log('FEATURES: ', _features);
                    } // end featuresURI
                    //
                    resolve({
                        added: true,
                        error: null,
                        newAdded: yield newAdded.populate('category warehouses'),
                    }); // end resolve
                }) // end callbacck
                ); // end create
            }
            catch (error) {
                resolve({
                    added: false,
                    newAdded: null,
                    error: `[EXCEPTION]: ${error.message}`,
                });
            }
        })); // end promise
    }),
    editProduct: (editProductInput, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.UPDATE_PRODUCT);
                // UPDATE
                schema_product_1.productModel.findOneAndUpdate({ productID: editProductInput.productID }, Object.assign({}, editProductInput), { new: true, runValidators: true, populate: 'category warehouses' }, (error, newEdited) => __awaiter(void 0, void 0, void 0, function* () {
                    // EDIT FEATURE
                    if (editProductInput.editFeatures) {
                        const { action, addFeatureURI, removeFeatureByName } = editProductInput.editFeatures;
                        if (action == 'ADD') {
                            addFeatureURI.forEach((uri) => __awaiter(void 0, void 0, void 0, function* () {
                                try {
                                    // upload each each
                                    const _feature = yield (0, file_1.serverFileUploader)(
                                    // IMAGEPATH
                                    uri, 
                                    // UPLOAD PATH
                                    `./public/uploads/features/products/${newEdited.productID.toUpperCase()}`, 
                                    // SERVER URL
                                    config.get('server.domain'), 
                                    // DESTINATED FILE NAME
                                    `${newEdited.name}_${(0, helpers_1.genRandom)().toLowerCase()}`);
                                    console.log('##');
                                    if (_feature) {
                                        console.log('_F: ', _feature);
                                        newEdited.features.push(_feature);
                                        yield newEdited.save({ validateBeforeSave: false });
                                        // _features.push(_feature);
                                    }
                                }
                                catch (error) {
                                    console.log('#ERROR: ', error);
                                }
                            })); // end forEach
                        }
                        else if (action == 'REMOVE') {
                            if ((0, file_1.deleteFileUploader)(`./public/uploads/features/products/${editProductInput.productID}/${removeFeatureByName}`)) {
                                // delete the file the product feature array
                                newEdited.features = newEdited.features.filter((_feature) => _feature.fileName !== removeFeatureByName);
                                yield newEdited.save({ validateBeforeSave: false });
                            }
                        } // end if EDIT
                    } // end if feature
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
        }));
    }),
    deleteProduct: (productID, warehouseID, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.DELETE_PRODUCT);
                // FIND THE PORDUCT AND DELETE IT
                if (warehouseID) {
                    yield schema_product_1.productModel.findOneAndRemove({
                        $and: [{ productID }, { warehouseID }],
                    });
                }
                else {
                    yield schema_product_1.productModel.findOneAndRemove({ productID });
                    // DELETE ALL PRODUCT IMAGES
                    yield (0, file_1.deleteFileUploader)(`./public/uploads/features/products/${productID}`);
                }
                // DELETE A PRODUCTID FROM WAREHOUSE IF WAREHOUSEID NOT UNDEFINED AND PRODUCTIDS CONTAIN THE PRODUCTID
                const criteria = warehouseID
                    ? { $and: [{ warehouseID }, { productIDs: productID }] }
                    : { productIDs: productID };
                yield schema_warehouse_1.warehouseModel.findOneAndUpdate(criteria, { $pull: { productIDs: productID } }, { multi: true });
                //
                resolve({
                    deleted: true,
                    error: null,
                });
            }
            catch (error) {
                resolve({
                    deleted: false,
                    error: `[EXCEPTION]: ${error.message}`,
                });
            }
        })); // end promise
    }),
    uploadData: (uploadDataInput) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, imagePath, name } = uploadDataInput;
        const fileStats = yield (0, file_1.serverFileUploader)(imagePath, 
        // `./public/uploads/features/products/${id.toUpperCase()}`,
        `./public/uploads/${id.toUpperCase()}`, config_1.default.get('server.domain'));
        console.log('RESULT FILESTATS: ', fileStats);
        return Promise.resolve(fileStats);
    }),
};
