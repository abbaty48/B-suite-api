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
exports.saleModel = void 0;
const mongoose_1 = require("mongoose");
const schema_product_1 = require("./schema_product");
const SaleProductSchema = new mongoose_1.Schema(Object.assign(Object.assign({}, schema_product_1.productSchema.paths), { kind: {
        type: 'string',
        required: false,
        default: function () {
            return this.category.name;
        },
    }, quantity: {
        type: 'number',
        required: true,
    }, subTotal: {
        type: 'number',
        required: false,
        default: function () {
            return this.retailPrice * this.quantity;
        }, // end function
    } }));
SaleProductSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        // DECREASE THE PRODUCT QUANTITY
        const _product = yield schema_product_1.productModel.findOne({
            productID: this.productID,
        });
        if (_product.quantity <= 0) {
            throw new Error(`[OUT OF STOCK]: The product "${_product.name}" is currently unavailable in the products stock records.`);
        } // end meta check
        if (this.quantity > _product.quantity) {
            throw new Error(`[OUT OF STOCK]: The available quantity (${_product.quantity}) of product "${_product.name}" in the stock record is less than the sale quantity (${this.quantity}), please provide the quantity for "${_product.name}" to be less than or equal to ${_product.quantity}`);
        }
    });
});
const SaleSchema = new mongoose_1.Schema({
    saleID: { type: 'string', required: true },
    staffID: { type: 'string', required: true },
    customerID: {
        type: 'string',
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
        default: function () {
            // total all subtotal
            // e.g 1800
            const _totalSubtotal = this.products.reduce((total, cProduct) => (total += cProduct.subTotal), 0);
            // total with discount
            // eg 1800 - ((5% / 100) * 100) = 1795
            const _total = _totalSubtotal - (this.discount / 100) * 100;
            // differences 1795 - 1700PAID = 95
            const _diff = _total - this.paid;
            // Percentage
            // e.g 1700/1795 * 100 = 94.707521 ceil will round up and remove the decimal part = 95
            const percentage = Math.floor((this.paid / _total) * 100);
            return {
                percentage,
                status: percentage >= 90 ? 'Gain' : 'Lost',
            }; // end return
        }, // end default
    },
    paid: { type: 'number', required: true },
    totalPrice: {
        type: 'number',
        required: false,
        default: function () {
            return this.products.reduce((total, cProduct) => {
                return (total += cProduct.subTotal);
            }, 0);
        },
    },
    discount: { type: 'number', required: false, default: 0 },
    totalQuantity: {
        type: 'number',
        required: false,
        default: function () {
            return this.products.reduce((total, cProduct) => (total += cProduct.quantity), 0);
        }, // end default
    },
    products: [SaleProductSchema],
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    collection: 'sales',
    timestamps: {
        createdAt: true,
        updatedAt: true,
        currentTime: () => new Date().getTime(),
    },
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
SaleSchema.virtual('warehouse', {
    ref: 'warehouse',
    localField: 'warehouseID',
    foreignField: 'warehouseID',
    options: { populate: 'Staffs Products' },
});
SaleSchema.pre('save', function () {
    // DECREASE THE PRODUCT QUANTITY RECORD IN THE STORE
    this.products.forEach(({ productID, quantity }) => __awaiter(this, void 0, void 0, function* () {
        const _product = yield schema_product_1.productModel.findOne({
            productID,
        });
        _product.quantity -= quantity;
        yield _product.save();
    }) // end async
    ); // end each
});
exports.saleModel = mongoose_1.models.sale || (0, mongoose_1.model)('sale', SaleSchema);
