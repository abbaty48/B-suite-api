"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryModel = void 0;
const mongoose_1 = require("mongoose");
exports.categoryModel = mongoose_1.models.category ||
    (0, mongoose_1.model)('category', new mongoose_1.Schema({
        name: { type: 'string', required: true },
    }));
