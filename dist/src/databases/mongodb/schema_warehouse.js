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
exports.warehouseModel = void 0;
const mongoose_1 = require("mongoose");
const WarehouseSchema = new mongoose_1.Schema({
    warehouseID: { type: 'string', _id: true, required: true, index: true },
    name: {
        type: 'string',
        required: false,
        index: true,
        validate: {
            validator: function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const name = this.op === 'findOneAndUpdate'
                        ? this.getUpdate().$set.name
                        : this.name;
                    //
                    return (yield exports.warehouseModel.exists({ name })) ? false : true;
                });
            },
            message: (props) => `[DUPLICATION ERROR]: A Warehouse with the same name "${props.value}" already exist.`,
        },
    },
    address: {
        type: 'string',
        required: true,
        validate: {
            validator: function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const address = this.op === 'findOneAndUpdate'
                        ? this.getUpdate().$set.address
                        : this.address;
                    //
                    return (yield exports.warehouseModel.exists({ address })) ? false : true;
                });
            },
            message: (props) => `[DUPLICATION ERROR]: A Warehouse with the same address ("${props.value}") could not exist.`,
        },
    },
    staffIDs: { type: ['string'], required: false, default: [] },
    productIDs: {
        type: ['string'],
        required: false,
        default: [],
    },
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    collection: 'warehouses',
    timestamps: {
        createdAt: true,
        updatedAt: true,
        currentTime: () => new Date().getTime(),
    },
});
WarehouseSchema.virtual('staffs', {
    ref: 'staff',
    foreignField: 'staffID',
    localField: 'staffIDs',
});
WarehouseSchema.virtual('products', {
    ref: 'product',
    foreignField: 'productID',
    localField: 'productIDs',
});
exports.warehouseModel = mongoose_1.models.warehouse ||
    (0, mongoose_1.model)('warehouse', WarehouseSchema);
