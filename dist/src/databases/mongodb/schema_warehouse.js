"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warehouseModel = void 0;
const mongoose_1 = require("mongoose");
const WarehouseSchema = new mongoose_1.Schema({
    warehouseID: { type: mongoose_1.Types.ObjectId, _id: true, required: true },
    name: { type: 'string', required: false },
    address: { type: 'string', required: true },
    staffs: { type: [{ staffID: 'string' }], default: [] },
    products: { type: [{ productID: 'string' }], default: [] },
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
WarehouseSchema.virtual('Staffs', {
    ref: 'staff',
    foreignField: 'staffID',
    localField: 'staffs.staffID',
});
WarehouseSchema.virtual('Products', {
    ref: 'product',
    foreignField: 'productID',
    localField: 'products.productID',
});
exports.warehouseModel = mongoose_1.models.warehouse ||
    (0, mongoose_1.model)('warehouse', WarehouseSchema);
