"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerModel = void 0;
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
    customerID: { type: 'string', required: true },
    warehouseID: { type: 'string', required: false },
    name: { type: 'string', required: true },
    email: { type: 'string', required: false },
    address: { type: 'string', required: false },
    phoneNumber: { type: 'string', required: false },
    beneficiary: { type: 'boolean', required: false, default: false },
    balance: { type: 'number', required: false, default: 0 },
    saleIDs: { type: ['string'], required: false, default: [] },
    metas: {
        type: {
            avatarURL: 'string',
            dateOfBirth: 'string',
            socialMedia: {
                facebook: 'string',
                twitter: 'string',
                instagram: 'string',
            },
        },
        required: false,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'customers',
    timestamps: {
        createdAt: true,
        updatedAt: true,
        currentTime: () => new Date().getTime(),
    },
});
CustomerSchema.virtual('warehouse', {
    ref: 'warehouse',
    localField: 'warehouseID',
    foreignField: 'warehouseID',
});
CustomerSchema.virtual('purchases', {
    ref: 'sale',
    foreignField: 'saleID',
    localField: 'saleIDs',
});
exports.customerModel = mongoose_1.models.customer ||
    (0, mongoose_1.model)('customer', CustomerSchema);
