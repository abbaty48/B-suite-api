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
const schema_product_1 = require("../databases/mongodb/schema_product");
const helpers_1 = require("../commons/helpers");
const RolePrevilage_1 = require("../databases/mongodb/enums/RolePrevilage");
const IFilter_1 = require("../databases/mongodb/interfaces/IFilter");
const authorizationMiddleware_1 = __importDefault(require("../commons/auths/authorizationMiddleware"));
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
                                warehouse: { $eq: (0, helpers_1.stringToID)(warehouseID) },
                            }
                            : {},
                    ],
                }, {}, { populate: 'category warehouse' });
                resolve({
                    error: null,
                    product,
                });
            }
            catch (error) {
                resolve({
                    error: `[INTERNAL ERROR]: ${error.message}`,
                    product: null,
                }); // end resolve
            } // end catch
        })); // end  promise
    }),
    products: (searchFilter, filter, { request, config, response }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                // AUTHENTICATE
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.READ_PRODUCT);
                // SEARCH FILTER
                const { name, inStock, expired, quantity, productID, categoryID, retailPrice, warehouseID, expirationDate, wholesalePrice, } = searchFilter !== null && searchFilter !== void 0 ? searchFilter : {};
                // PAGINATE THE PRODUCTS
                const sort = (_a = filter.sort) !== null && _a !== void 0 ? _a : IFilter_1.Filter.sort, limit = (_b = filter.limit) !== null && _b !== void 0 ? _b : IFilter_1.Filter.limit, pageIndex = (_c = filter.pageIndex) !== null && _c !== void 0 ? _c : IFilter_1.Filter.pageIndex;
                const products = yield schema_product_1.productModel
                    .find({
                    $or: [
                        inStock !== undefined ? { inStock } : {},
                        expired !== undefined ? { expired } : {},
                        quantity ? { quantity: { $eq: quantity } } : {},
                        retailPrice ? { retailPrice: { $eq: retailPrice } } : {},
                        expirationDate
                            ? { expirationDate: { $eq: expirationDate } }
                            : {},
                        wholesalePrice
                            ? { wholesalePrice: { $eq: wholesalePrice } }
                            : {},
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
                }, {}, { populate: 'category warehouse' })
                    .sort({ firstName: sort })
                    .skip(limit * pageIndex)
                    .limit(limit);
                resolve({
                    error: null,
                    products,
                    filters: {
                        sort,
                        total: products.length,
                        nextPageIndex: pageIndex + 1,
                        currentPageIndex: pageIndex,
                    },
                });
            }
            catch (error) {
                resolve({
                    error: error.message,
                    filters: null,
                    products: [],
                });
            }
        })); // end promise
    }),
    addProduct: (addProductInput, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            var _d;
            try {
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.ADD_PRODUCT);
                // PRODUCT VALIDATION
                if (yield schema_product_1.productModel.exists({ name: addProductInput.name })) {
                    return resolve({
                        added: false,
                        newAdded: null,
                        error: `[DUPLICATE ERROR]: A product with the same name "${addProductInput.name}" already exist, please provide a different name.`,
                    });
                }
                //
                const productID = `PID${(0, helpers_1.genRandom)(10)}`;
                schema_product_1.productModel.create(Object.assign(Object.assign({}, addProductInput), { productID, category: addProductInput.categoryID, warehouse: (_d = addProductInput.warehouseID) !== null && _d !== void 0 ? _d : null }), (error, newAdded) => __awaiter(void 0, void 0, void 0, function* () {
                    if (error) {
                        console.log(`[ERROR ADDING PRODUCT]: ${error.message}`);
                        return;
                    }
                    resolve({
                        added: true,
                        error: null,
                        newAdded: yield newAdded.populate('category warehouse'),
                    });
                }));
            }
            catch (error) {
                resolve({
                    error: `[INTERNAL ERROR]: ${error.message}`,
                    added: false,
                    newAdded: null,
                });
            }
        })); // end promise
    }),
    editProduct: (editProductInput, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.UPDATE_PRODUCT);
                // UPDATE
                const newEdited = yield schema_product_1.productModel.findOneAndUpdate({ productID: editProductInput.productID }, Object.assign({}, editProductInput), { new: true, runValidators: true, populate: 'category warehouse' });
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
        }));
    }),
    deleteProduct: (productID, warehouseID, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.DELETE_PRODUCT);
                // FIND THE PRDDUCT AND DELETE IT
                if (warehouseID) {
                    yield schema_product_1.productModel.findOneAndRemove({
                        $and: [{ productID }, { warehouseID }],
                    });
                }
                else {
                    yield schema_product_1.productModel.findOneAndRemove({ productID });
                }
                resolve({
                    deleted: true,
                    error: null,
                });
            }
            catch (error) {
                resolve({
                    deleted: false,
                    error: error.message,
                });
            }
        })); // end promise
    }), // end deleteProduct
};
