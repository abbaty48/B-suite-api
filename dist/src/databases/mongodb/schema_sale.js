"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleModel = void 0;
const mongoose_1 = require("mongoose");
const SaleSchema = new mongoose_1.Schema({}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
SaleSchema.virtual('Products', {
    ref: 'product',
    foreignField: 'productID',
    localField: 'products.productID',
});
SaleSchema.virtual('Staff', {
    ref: 'staff',
    foreignField: 'staffID',
    localField: 'staff.staffID',
});
exports.saleModel = mongoose_1.models.sale || (0, mongoose_1.model)('sale', SaleSchema);
