"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = require("mongoose");
exports.productModel = mongoose_1.models.product ||
    (0, mongoose_1.model)('product', new mongoose_1.Schema());
