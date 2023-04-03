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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryResolver = void 0;
const schema_category_1 = require("../databases/mongodb/schema_category");
const schema_product_1 = require("../databases/mongodb/schema_product");
const RolePrevilage_1 = require("../databases/mongodb/enums/RolePrevilage");
const authorizationMiddleware_1 = __importDefault(require("../commons/auths/authorizationMiddleware"));
exports.CategoryResolver = {
    categories: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield schema_category_1.categoryModel.find();
    }),
    addCategory: (addCategoryInput, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.ADD_CATEGORY);
                //
                const newAdded = (yield schema_category_1.categoryModel.create({ name: addCategoryInput.name })).name;
                resolve({
                    error: null,
                    added: true,
                    newAdded,
                });
            }
            catch (error) {
                resolve({
                    error: `[EXCEPTION]: ${error.message}`,
                    added: false,
                    newAdded: null,
                });
            } // end catch
        })); // end promise
    }),
    editCategory: (editCategoryInput, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.UPDATE_CATEGORY);
                //
                const { newCategory, oldCategory } = editCategoryInput;
                //
                yield schema_category_1.categoryModel.findOneAndUpdate({ name: oldCategory }, { name: newCategory }, { new: true, runValidators: true, context: 'query' }); // end findOneAndUpdate
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
                    newValue: null,
                    oldValue: editCategoryInput.oldCategory,
                    error: `[EXCEPTION]: ${error.message}`,
                }); // end resolve
            } // end catch
        })); // end Promise
    }),
    deleteCategory: (category, { request, response, config }) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Authenticate and Authorize action user
                (0, authorizationMiddleware_1.default)(request, response, config.get('jwt.private'), RolePrevilage_1.RolePrevileges.DELETE_CATEGORY);
                // FIND AND REMOVE THE CATEGORY AND RENAME ALL THE PRODUCT USING IT TO [UNCATEGORIZE]
                yield schema_category_1.categoryModel.findOneAndRemove({ name: category });
                //
                yield schema_product_1.productModel.updateMany({ 'category.name': category }, { $set: { name: 'UNCATEGORIZED' } });
                resolve({ deleted: true, error: null });
            }
            catch (error) {
                resolve({
                    deleted: false,
                    error: `[EXCEPTION]: ${error.message}`,
                }); // end resolve
            } // end catch
        })); // end Promise
    }), // end deleteCategory
}; // end CategoryResolver
