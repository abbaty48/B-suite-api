"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = exports.productSchema = void 0;
const helpers_1 = require("../../commons/helpers");
const mongoose_1 = require("mongoose");
const schema_category_1 = require("./schema_category");
exports.productSchema = new mongoose_1.Schema({
    productID: { type: 'string', _id: true, required: true, index: true },
    name: { type: 'string', required: true, index: true },
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
            msg: `[VALIDATION ERROR]: The provided category does not exist in the category table, please add the category first and try again.`,
        },
    },
    quantity: { type: 'number', required: true, min: 0 },
    retailPrice: { type: 'number', required: true },
    wholesalePrice: { type: 'number', required: true },
    expirationDate: { type: 'string', required: false },
    images: { type: ['string'], required: false },
    description: { type: 'string', required: false },
    warehouse: {
        index: true,
        required: false,
        ref: 'warehouse',
        type: mongoose_1.Types.ObjectId,
        validate: {
            validator: (value) => schema_category_1.categoryModel.exists({ _id: (0, helpers_1.stringToID)(value.id) }),
            msg: `[VALIDATION ERROR]: The provided warehouse does not exist in the warehouse table, please add the warehouse data first and try again.`,
        },
    },
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
exports.productSchema.pre('save', function () {
    updateInStock(this, 'SAVE');
});
exports.productSchema.pre('findOneAndUpdate', function () {
    updateInStock(this, 'FIND_ONE_AND_UPDATE');
});
const updateInStock = (_this, action) => {
    let _update;
    //
    switch (action) {
        case 'FIND_ONE_AND_UPDATE':
            _update = _this.getUpdate().$set;
            break;
        case 'SAVE':
            _update = _this.getChanges().$set;
            break;
    }
    if (_update.quantity !== undefined) {
        _this.set({ inStock: _update.quantity > 0 });
    }
};
exports.productModel = mongoose_1.models.product ||
    (0, mongoose_1.model)('product', exports.productSchema);
