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
exports.SaleResolver = void 0;
const helpers_1 = require("../commons/helpers");
const schema_sale_1 = require("../databases/mongodb/schema_sale");
const schema_product_1 = require("../databases/mongodb/schema_product");
const IPagin_1 = require("../databases/mongodb/interfaces/IPagin");
const RolePrevilage_1 = require("../databases/mongodb/enums/RolePrevilage");
const authorizationMiddleware_1 = __importDefault(require("../commons/auths/authorizationMiddleware"));
const schema_customer_1 = require("../databases/mongodb/schema_customer");
exports.SaleResolver = {
    sale: (searchFilter, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // AUTHENTICATE
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.READ_SALE); // end staffRoleAuthorization
                // SEARCH FILTER
                const { date, time, saleID, staffID, paidPrice, productID, customerID, productName, } = searchFilter !== null && searchFilter !== void 0 ? searchFilter : {};
                // PAGINATE THE PRODUCTS
                let sale = null;
                if (productName) {
                    sale = (yield schema_sale_1.saleModel.find({}, {}, { populate: 'staff customer products' })).find((s) => s.products.find((p) => p.name === productName));
                }
                else {
                    sale = yield schema_sale_1.saleModel.findOne({
                        $or: [
                            date ? { date: { $eq: date } } : {},
                            time
                                ? { time: { $regex: (0, helpers_1.escapeRegExp)(time), $options: 'si' } }
                                : {},
                            saleID ? { saleID: { $eq: saleID } } : {},
                            staffID ? { staffID: { $eq: staffID } } : {},
                            paidPrice ? { paid: { $eq: paidPrice } } : {},
                            // query sale where the productIDs contain at least the productID
                            productID
                                ? {
                                    productIDs: productID,
                                }
                                : {},
                            customerID
                                ? {
                                    customerID: { $eq: customerID },
                                }
                                : {},
                        ],
                    }, {}, { populate: 'staff customer products' });
                }
                resolve({
                    error: null,
                    sale,
                });
            }
            catch (error) {
                resolve({
                    error: `[INTERNAL ERROR]: ${error.message}`,
                    sale: null,
                }); // end resolve
            } // end catch
        })); // end  promise
    }),
    sales: (searchFilter, pagin, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                // AUTHENTICATE
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.READ_SALE);
                // SEARCH FILTER
                const { date, time, saleID, staffID, paidPrice, productID, customerID, productName, } = searchFilter !== null && searchFilter !== void 0 ? searchFilter : {};
                // PAGINATE THE PRODUCTS
                const sort = (_a = pagin.sort) !== null && _a !== void 0 ? _a : IPagin_1.Pagin.sort, limit = (_b = pagin.limit) !== null && _b !== void 0 ? _b : IPagin_1.Pagin.limit, pageIndex = (_c = pagin.pageIndex) !== null && _c !== void 0 ? _c : IPagin_1.Pagin.pageIndex;
                let sales = [];
                if (productName) {
                    const _index = pageIndex <= 0 ? 1 : pageIndex;
                    const _start = (_index - 1) * limit;
                    const _end = _start + limit;
                    sales = (yield schema_sale_1.saleModel.find({}, {}, { populate: 'staff customer products' }))
                        .filter((s) => s.products.find((p) => p.name === productName))
                        .slice(_start, _end);
                }
                else {
                    sales = yield schema_sale_1.saleModel
                        .find({
                        $or: [
                            date ? { date: { $eq: date } } : {},
                            time
                                ? { time: { $regex: (0, helpers_1.escapeRegExp)(time), $options: 'si' } }
                                : {},
                            saleID ? { saleID: { $eq: saleID } } : {},
                            staffID ? { staffID: { $eq: staffID } } : {},
                            paidPrice ? { paid: { $eq: paidPrice } } : {},
                            // query sale where the productIDs contain at least the productID
                            productID
                                ? {
                                    productIDs: productID,
                                }
                                : {},
                            customerID
                                ? {
                                    customerID: { $eq: customerID },
                                }
                                : {},
                        ],
                    }, {}, { populate: 'staff customer products' })
                        .sort({ time: sort })
                        .skip(limit * pageIndex)
                        .limit(limit);
                }
                resolve({
                    error: null,
                    sales,
                    pagins: {
                        sort,
                        totalPaginated: sales.length,
                        currentPageIndex: pageIndex,
                        totalDocuments: yield schema_sale_1.saleModel.count(),
                        nextPageIndex: sales.length ? pageIndex + 1 : 0,
                    },
                });
            }
            catch (error) {
                resolve({
                    error: error.message,
                    pagins: null,
                    sales: [],
                });
            }
        })); // end promise
    }),
    addSale: (addSaleInput, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const authStaff = yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.ADD_SALE);
                // SALEID
                const saleID = `SALE${(0, helpers_1.genRandom)(10)}`;
                /** PRODUCTS */
                const products = addSaleInput.productMetas.reduce((accumulator, meta) => __awaiter(void 0, void 0, void 0, function* () {
                    const product = yield schema_product_1.productModel.findOne({ productID: meta.productID }, {}, { populate: 'category' });
                    if (product !== null) {
                        (yield Promise.resolve(accumulator)).push(Object.assign(Object.assign({}, product._doc), { quantity: meta.quantity, subTotal: meta.quantity * product.retailPrice }));
                    } // end  product
                    return yield accumulator;
                }), []);
                if ((yield products).length <= 0) {
                    return resolve({
                        added: false,
                        newAdded: null,
                        error: "[ERROR ADDING PRODUCT]: The product(`s) you're about to sell does not exist in the products stock records.",
                    });
                }
                /** CUSTOMER */
                let _customer = null;
                if (addSaleInput.customerID) {
                    // get the customer
                    _customer = yield schema_customer_1.customerModel.findOne({
                        customerID: addSaleInput.customerID,
                    });
                    _customer.saleIDs.push(saleID);
                }
                else if (addSaleInput.addCustomer) {
                    // create the new customer
                    const customerID = `CIN${(0, helpers_1.genRandom)().slice(0, 5).toUpperCase()}`;
                    _customer = new schema_customer_1.customerModel(Object.assign(Object.assign({}, addSaleInput.addCustomer), { customerID, saleIDs: [saleID] })); // end new customerModel
                }
                else {
                    return resolve({
                        added: false,
                        newAdded: null,
                        error: `[ERROR ADDING SALE]: A customer must exist to make a sale, either provide a customerID or add a new customer.`,
                    });
                }
                /** CREATE THE SALEMODEL */
                schema_sale_1.saleModel.create(Object.assign(Object.assign({}, addSaleInput), { saleID, products: yield products, staffID: authStaff.staffID, customerID: _customer.customerID }), (error, _newAdded) => __awaiter(void 0, void 0, void 0, function* () {
                    if (error) {
                        return resolve({
                            added: false,
                            newAdded: null,
                            error: `[ERROR SAVING SELL RECORD]: ${error.message}`,
                        });
                    }
                    // SAVE the Customer
                    _customer.balance = addSaleInput.balance;
                    yield _customer.save();
                    // CREATE A NEW SALE OBJECT
                    const newAdded = Object.assign(yield _newAdded.populate('staff customer'), {
                        products: yield products,
                    });
                    resolve({
                        added: true,
                        error: null,
                        newAdded,
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
        })); // end promise
    }),
    editSale: (editSaleInput, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.UPDATE_SALE);
                // editSaleInput.productMetas
                if (editSaleInput.productMetas) {
                    const products = editSaleInput.productMetas.reduce((accumulator, meta) => __awaiter(void 0, void 0, void 0, function* () {
                        const product = yield schema_product_1.productModel.findOne({ productID: meta.productID }, {}, { populate: 'category' });
                        if (product !== null) {
                            (yield Promise.resolve(accumulator)).push(Object.assign(Object.assign({}, product._doc), { quantity: meta.quantity, subTotal: meta.quantity * product.retailPrice }));
                        } // end  product
                        return yield accumulator;
                    }), []);
                    editSaleInput.productIDs = (yield products).map((product) => product.productID);
                    //
                    if ((yield products).length <= 0) {
                        return resolve({
                            edited: false,
                            newEdited: null,
                            error: "[ERROR ADDING PRODUCT]: The product(`s) you're about to sell does not exist in the products records.",
                        });
                    }
                } // end editSaleInput.productMetas
                // UPDATE
                const newEdited = yield schema_sale_1.saleModel.findOneAndUpdate({ saleID: editSaleInput.saleID }, Object.assign({}, editSaleInput), {
                    new: true,
                    runValidators: true,
                    populate: 'staff products customer',
                });
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
                    error: `[EXCEPTION]: ${error.message}`,
                });
            }
        }));
    }),
    deleteSale: (saleID, warehouseID, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.DELETE_SALE);
                if (warehouseID) {
                    yield schema_sale_1.saleModel.findOneAndRemove({
                        $and: [{ saleID }, { warehouseID }],
                    });
                }
                else {
                    yield schema_sale_1.saleModel.findOneAndRemove({ saleID });
                }
                resolve({
                    deleted: true,
                    error: null,
                });
            }
            catch (error) {
                resolve({
                    deleted: false,
                    error: `[EXCEPTION]: ${error.message}`,
                }); // end resolve
            } // end catch
        })); // end promise
    }), // end deleteSale
};
