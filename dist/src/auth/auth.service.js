"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = require("bcryptjs");
const exceptions_1 = require("@nestjs/common/exceptions");
const config_1 = require("@nestjs/config");
const lodash_1 = require("lodash");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async register({ email, password }) {
        const saltRounds = parseInt(this.config.get('SALT_ROUNDS_BCRYPT'), 10);
        const passwordHash = await (0, bcryptjs_1.hash)(password, saltRounds);
        const newUser = await this.prisma.user.create({
            data: { email, passwordHash },
        });
        return this.withTokens(newUser);
    }
    async authenticate({ email, password }) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user || !(0, bcryptjs_1.compareSync)(password, user.passwordHash))
            throw new exceptions_1.UnauthorizedException('-- invalid credentials');
        return await this.withTokens(user);
    }
    async withTokens(user) {
        const payload = { sub: user.id };
        const secret = this.config.get('JWT_SECRET');
        const expiresIn = parseInt(this.config.get('JWT_TOKEN_EXPIRE'), 10);
        const secretRefresh = this.config.get('JWT_SECRET_TOKEN_REFRESH');
        const expiresInRefresh = parseInt(this.config.get('JWT_TOKEN_REFRESH_EXPIRE'), 10);
        const token = await this.jwt.sign(payload, {
            expiresIn,
            secret,
        });
        const refershToken = await this.jwt.sign(payload, {
            expiresIn: expiresInRefresh,
            secret: secretRefresh,
        });
        (0, lodash_1.assign)(user, { token, refershToken });
        return user;
    }
    async matchesRoles(user, roles) {
        const userRoles = await this.getUserRoles(user);
        return roles.every((role) => userRoles.includes(role));
    }
    async getUserRoles(user) {
        const res = await this.prisma.role.findMany({
            where: {
                users: {
                    some: {
                        userId: user.id,
                    },
                },
            },
            select: {
                type: true,
            },
        });
        return (0, lodash_1.map)(res, 'type');
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map