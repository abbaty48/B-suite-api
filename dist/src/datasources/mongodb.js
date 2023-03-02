"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongodbService = void 0;
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importStar(require("mongoose"));
// ENABLE strictQuery in mongoose 7
mongoose_1.default.set('strictQuery', true);
const mongodbService = () => {
    (0, mongoose_1.connect)(config_1.default.get('databases.mongodb.schemaUri'), config_1.default.get('databases.mongodb.options'), (error) => {
        if (error) {
            console.log(`ERROR MONGO SERVER CONNECTION, REASON: ${error.message}`);
            return;
        }
        console.info(`${mongoose_1.default.connection.db.databaseName} DATABASE CONNECTED. `);
    });
}; // end mongodbService()
exports.mongodbService = mongodbService;
