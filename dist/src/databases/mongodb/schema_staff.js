"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffModel = void 0;
const mongoose_1 = require("mongoose");
const Role_1 = require("./enums/Role");
exports.staffModel = mongoose_1.models.staff ||
    (0, mongoose_1.model)('staff', new mongoose_1.Schema({
        staffID: { type: 'string', _id: true, required: true },
        firstName: { type: 'string', required: true },
        lastName: { type: 'string', required: true },
        otherName: { type: 'string', required: false },
        email: { type: 'string', required: false },
        role: { type: 'string', enum: Role_1.StaffRole, required: true },
        phoneNumber: { type: 'string', required: false },
        address: { type: 'string', required: false },
        passport: { type: 'string', required: false },
        password: { type: 'string', required: true },
        token: { type: 'string', required: true },
        warehouse: { type: mongoose_1.Types.ObjectId, ref: 'warehouse', required: false },
    }, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }));
