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
exports.productModel = exports.productSchema = void 0;
const helpers_1 = require("../../commons/helpers");
const mongoose_1 = require("mongoose");
const schema_feature_1 = require("./schema_feature");
const schema_category_1 = require("./schema_category");
const schema_warehouse_1 = require("./schema_warehouse");
exports.productSchema = new mongoose_1.Schema({
    productID: { type: 'string', _id: true, required: true, index: true },
    name: {
        type: 'string',
        required: true,
        index: true,
        validate: {
            validator: function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const name = this.op === 'findOneAndUpdate'
                        ? this.getUpdate().$set.name
                        : this.name;
                    //
                    return (yield exports.productModel.exists({ name })) ? false : true;
                });
            },
            message: (_prop) => `[DUPLICATE ERROR]:  A product with the provided name "${_prop.value}" already exist in the products record, please provide a different one and try again.`,
        },
    },
    inStock: {
        index: true,
        type: 'boolean',
        required: false,
        default: function () {
            return (this === null || this === void 0 ? void 0 : this.quantity) > 0;
        },
    },
    expired: {
        index: true,
        type: 'boolean',
        required: false,
        default: (schema) => {
            return schema.expirationDate
                ? Date.now() >= Date.parse(schema.expirationDate)
                : false;
        },
    },
    category: {
        index: true,
        required: true,
        ref: 'category',
        type: mongoose_1.Types.ObjectId,
        validate: {
            validator: (value) => schema_category_1.categoryModel.exists({ _id: (0, helpers_1.stringToID)(value.id) }),
            msg: `[VALIDATION ERROR]: The provided category does not exist in the category records, please add the category first and try again.`,
        },
    },
    quantity: { type: 'number', required: true, min: 0 },
    retailPrice: { type: 'number', required: true },
    wholesalePrice: { type: 'number', required: true },
    expirationDate: { type: 'string', required: false },
    features: { type: [schema_feature_1.FeatureSchema], required: false },
    description: { type: 'string', required: false },
    warehouseIDs: ['string'],
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'products',
    timestamps: {
        createdAt: true,
        updatedAt: true,
        currentTime: () => new Date().getTime(),
    },
});
exports.productSchema.virtual('warehouses', {
    ref: 'warehouse',
    localField: 'warehouseIDs',
    foreignField: 'warehouseID',
});
exports.productSchema.pre('save', function () {
    updateProperties(this, 'SAVE');
});
exports.productSchema.pre('findOneAndUpdate', function () {
    updateProperties(this, 'FIND_ONE_AND_UPDATE');
});
const updateProperties = (_this, action) => {
    let _update;
    //
    switch (action) {
        case 'FIND_ONE_AND_UPDATE':
            {
                _update = _this.getUpdate().$set;
                // UPDATE PRODUCT_IDS IN WAREHOUSE
                if ((_this === null || _this === void 0 ? void 0 : _this.getUpdate().warehouseIDs) !== undefined) {
                    _upsertProductID(_this.getUpdate().warehouseIDs, _this.getUpdate().productID);
                }
            }
            break;
        case 'SAVE':
            {
                _update = _this.getChanges().$set;
                // UPDATE PRODUCT_IDS IN WAREHOUSE
                if ((_update === null || _update === void 0 ? void 0 : _update.warehouseIDs) !== undefined) {
                    _upsertProductID(_update.warehouseIDs, _update.productID);
                }
            }
            break;
    }
    // UPDATE QUANTITY
    if ((_update === null || _update === void 0 ? void 0 : _update.quantity) !== undefined) {
        _this.set({ inStock: _update.quantity > 0 });
    }
};
const _upsertProductID = (warehouseIDs, productID) => __awaiter(void 0, void 0, void 0, function* () {
    if (warehouseIDs.length > 0) {
        warehouseIDs.forEach((warehouseID) => __awaiter(void 0, void 0, void 0, function* () {
            yield schema_warehouse_1.warehouseModel.findOneAndUpdate({ warehouseID, productIDs: { $ne: productID } }, { $push: { productIDs: productID } }, { new: true, upsert: false }); // end findOneAndUpdate
        }));
    } // end warehouseID
});
exports.productModel = mongoose_1.models.product ||
    (0, mongoose_1.model)('product', exports.productSchema);
