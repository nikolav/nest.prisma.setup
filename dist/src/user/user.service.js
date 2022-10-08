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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const lodash_1 = require("lodash");
const bcryptjs_1 = require("bcryptjs");
const email_service_1 = require("../email/email.service");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(mailer, prisma, config, jwt) {
        this.mailer = mailer;
        this.prisma = prisma;
        this.config = config;
        this.jwt = jwt;
    }
    async sendPasswordResetLink(data) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (!user)
            throw new exceptions_1.BadRequestException();
        const mail = await this.mailer.sendMailPasswordResetLink(this.withPasswordResetToken(user));
        return Object.assign(Object.assign({}, data), mail);
    }
    withPasswordResetToken(user) {
        const token = this.jwt.sign({ id: user.id }, {
            secret: this.config.get('JWT_SECRET_UPDATE_PASSWORD'),
            expiresIn: parseInt(this.config.get('JWT_SECRET_UPDATE_PASSWORD_EXPIRE'), 10),
        });
        return (0, lodash_1.assign)(user, { token });
    }
    async passwordUpdate({ password, token }) {
        try {
            const { id } = this.jwt.verify(token, {
                secret: this.config.get('JWT_SECRET_UPDATE_PASSWORD'),
                maxAge: parseInt(this.config.get('JWT_SECRET_UPDATE_PASSWORD_EXPIRE'), 10),
            });
            const user = this.prisma.user.findUnique({ where: { id } });
            if (!user)
                throw new exceptions_1.BadRequestException();
            const passwordHash = await (0, bcryptjs_1.hash)(password, parseInt(this.config.get('SALT_ROUNDS_BCRYPT'), 10));
            return await this.prisma.user.update({
                where: { id },
                data: { passwordHash },
            });
        }
        catch (error) {
            throw new exceptions_1.BadRequestException();
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        prisma_service_1.PrismaService,
        config_1.ConfigService,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map