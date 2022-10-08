"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const DEFAULT_JWT_SECRET = 'dlvldyipdlk';
const jwtSign = (payload, jwtSecret = DEFAULT_JWT_SECRET) => {
    const header = { alg: 'HS256', type: 'JWT' };
    const encodeHeader = Buffer.from(JSON.stringify(header)).toString('base64');
    const encodePayload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = (0, crypto_1.createHmac)('sha256', jwtSecret)
        .update(`${encodeHeader}.${encodePayload}`)
        .digest('base64');
    const token = `${encodeHeader}.${encodePayload}.${signature}`;
    return token;
};
exports.default = jwtSign;
//# sourceMappingURL=jwt-sign.js.map