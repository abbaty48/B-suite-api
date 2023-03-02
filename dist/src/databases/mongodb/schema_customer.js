"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerModel = void 0;
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
    customerID: { type: 'string', required: true },
    name: { type: 'string', required: true },
    address: { type: 'string', required: false },
    dateOfBirth: { type: 'string', required: false },
    beneficiary: { type: 'boolean', required: false, default: false },
});
exports.customerModel = mongoose_1.models.customer || (0, mongoose_1.model)('customer', CustomerSchema);
