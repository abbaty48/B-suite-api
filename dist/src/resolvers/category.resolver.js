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
exports.CategoryResolver = void 0;
const index_datasources_1 = require("../datasources/index.datasources");
const schema_category_1 = require("../databases/mongodb/schema_category");
const schema_product_1 = require("../databases/mongodb/schema_product");
(0, index_datasources_1.mongodbService)();
exports.CategoryResolver = {
    categories: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield schema_category_1.categoryModel.find();
    }),
    addCategory: (category) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (yield schema_category_1.categoryModel.exists({ name: category })) {
                    return resolve({
                        error: `Category with the name "${category}" already exist, please provide a new one.`,
                        added: false,
                    });
                } // end if-exists
                schema_category_1.categoryModel.create((error, result) => {
                    if (error) {
                        return resolve({
                            error: 'Error adding a new category, REASON: ' + error.message,
                            added: false,
                        });
                    }
                    resolve({
                        error: null,
                        added: true,
                    });
                });
            }
            catch (error) {
                resolve({
                    error: error.message,
                    added: false,
                });
            } // end catch
        })); // end promise
    }),
    editCategory: (oldCategory, newCategory) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            if (yield schema_category_1.categoryModel.exists({ name: newCategory })) {
                return resolve({
                    error: `Category with the name "${newCategory}" already exist, please provide a new one.`,
                    edited: false,
                    newValue: null,
                    oldValue: oldCategory,
                });
            } // end if-exists
            schema_category_1.categoryModel.findOneAndUpdate({ name: oldCategory }, { name: newCategory }, (error, updatedCategory) => __awaiter(void 0, void 0, void 0, function* () {
                // if error
                if (error) {
                    return resolve({
                        edited: false,
                        newValue: null,
                        error: error.message,
                        oldValue: oldCategory,
                    });
                } // end error
                // update all products under the oldCategory to a newCategory
                try {
                    yield schema_product_1.productModel.updateMany({ category: oldCategory }, { $rename: { category: newCategory } });
                    resolve({
                        edited: true,
                        error: null,
                        newValue: newCategory,
                        oldValue: oldCategory,
                    });
                }
                catch (error) {
                    resolve({
                        edited: false,
                        error: error.message,
                        newValue: null,
                        oldValue: oldCategory,
                    });
                } // end catch
            }) // end callback
            ); // end findOneAndUpdate
        })); // end Promise
    }),
    deleteCategory: (category) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => {
            schema_category_1.categoryModel.findOneAndRemove({ name: category }, (error, deletedCategory) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    return resolve({ deleted: false, error: error.message });
                } // end if
                try {
                    yield schema_product_1.productModel.updateMany({ category: category }, { $rename: { category: 'UNCATEGORIZE' } });
                    resolve({ deleted: true, error: null });
                }
                catch (error) {
                    resolve({ error: error.message, deleted: false });
                } // end catch
            }) // end  callback
            ); // end findOneAndRemove
        }); // end Promise
    }), // end deleteCategory
}; // end CategoryResolver
