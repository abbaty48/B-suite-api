"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRandom = exports.extractToken = exports.decodeRSAKey = exports.stringToID = exports.escapeRegExp = void 0;
const mongodb_1 = require("mongodb");
const escapeRegExp = (s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
exports.escapeRegExp = escapeRegExp;
const stringToID = (s) => mongodb_1.ObjectId.isValid(s) ? new mongodb_1.ObjectId(s) : new mongodb_1.ObjectId();
exports.stringToID = stringToID;
const decodeRSAKey = (s) => {
    return Buffer.from(s, 'base64').toString('ascii');
};
exports.decodeRSAKey = decodeRSAKey;
const extractToken = (authorization) => {
    const _ = authorization.split(' '); // split the authorization
    return _[1]; // get the token string from the authorization string
};
exports.extractToken = extractToken;
const genRandom = (radix = 36) => Math.floor(Math.random() * Date.now()).toString(radix);
exports.genRandom = genRandom;
