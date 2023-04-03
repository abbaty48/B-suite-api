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
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffModel = void 0;
const mongoose_1 = require("mongoose");
const Role_1 = require("./enums/Role");
const schema_warehouse_1 = require("./schema_warehouse");
const StaffSchema = new mongoose_1.Schema({
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
    warehouseID: {
        type: 'string',
        required: false,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'staffs',
    timestamps: {
        createdAt: true,
        updatedAt: true,
        currentTime: () => new Date().getTime(),
    },
});
StaffSchema.virtual('warehouse', {
    ref: 'warehouse',
    localField: 'warehouseID',
    foreignField: 'warehouseID',
});
StaffSchema.pre('findOneAndUpdate', function () {
    const _u = this.getUpdate();
    _upsertStaffID(_u.warehouseID, _u.staffID);
});
StaffSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        _upsertStaffID(this.warehouseID, this.staffID);
    });
});
const _upsertStaffID = (warehouseID, staffID) => __awaiter(void 0, void 0, void 0, function* () {
    if (warehouseID) {
        yield schema_warehouse_1.warehouseModel.findOneAndUpdate({ warehouseID, staffIDs: { $ne: staffID } }, { $push: { staffIDs: staffID } }, { new: true, upsert: false }); // end findOneAndUpdate
    } // end warehouseID
});
exports.staffModel = mongoose_1.models.staff || (0, mongoose_1.model)('staff', StaffSchema);
