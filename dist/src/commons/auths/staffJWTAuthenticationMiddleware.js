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
exports.staffVerifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../helpers");
const schema_staff_1 = require("../../databases/mongodb/schema_staff");
const staffVerifyToken = (request, response, privateKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check the Authorization key existence
        const authorizationKey = request.get('Authorization');
        if (!authorizationKey) {
            throw new Error('[UNAUTHENTICATED] Authorization bearer not found, authentication is required, provide your token.');
        }
        // check the token validity
        const token = authorizationKey.split(' ')[1];
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        // sign the token
        // let verifyToken: any;
        try {
            jsonwebtoken_1.default.verify(token, (0, helpers_1.decodeRSAKey)(privateKey), {
                algorithms: ['HS512'],
            });
        }
        catch (error) {
            throw new Error('Unable to verify token: ' + error.message);
        } // end catch
        // get staff info
        // const staff = await (staffModel as Model<IStaff>).findOne<IStaff>({
        const staff = yield schema_staff_1.staffModel.findOne({ token });
        // if staff is not found
        if (!staff) {
            throw new Error('Invalid token provided, staff not found with the provided token.');
        }
        return staff;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.staffVerifyToken = staffVerifyToken;
