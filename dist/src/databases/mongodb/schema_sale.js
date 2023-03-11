"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleModel = void 0;
const mongoose_1 = require("mongoose");
const SaleSchema = new mongoose_1.Schema({
    saleID: { type: 'string', required: true },
    staffID: { type: 'string', required: true },
    customerID: {
        type: 'string',
        required: true,
    },
    productIDs: {
        type: ['string'],
        required: true,
    },
    warehouseID: { type: mongoose_1.Schema.Types.ObjectId, required: false },
    date: {
        type: 'string',
        required: true,
        default: new Date(Date.now()).toLocaleDateString(),
    },
    time: {
        type: 'string',
        required: true,
        default: new Date(Date.now()).toLocaleTimeString(),
    },
    profit: {
        type: { percentage: 'number', status: 'string' },
        required: false,
    },
    paid: { type: 'number', required: true },
    totalPrice: { type: 'number', required: true },
    balance: { type: 'number', required: false, default: 0 },
    discount: { type: 'number', required: false, default: 0 },
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    collection: 'sales',
});
SaleSchema.virtual('staff', {
    ref: 'staff',
    justOne: true,
    localField: 'staffID',
    foreignField: 'staffID',
});
SaleSchema.virtual('customer', {
    ref: 'customer',
    justOne: true,
    localField: 'customerID',
    foreignField: 'customerID',
});
SaleSchema.virtual('products', {
    ref: 'product',
    localField: 'productIDs',
    foreignField: 'productID',
    options: { populate: 'category' },
});
SaleSchema.virtual('warehouse', {
    ref: 'warehouse',
    localField: 'warehouseID',
    foreignField: 'warehouseID',
    options: { populate: 'Staffs Products' },
});
exports.saleModel = mongoose_1.models.sale || (0, mongoose_1.model)('sale', SaleSchema);
