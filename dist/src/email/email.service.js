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
exports.EmailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const utils_service_1 = require("../utils/utils.service");
let EmailService = class EmailService {
    constructor(mailer, config, utils) {
        this.mailer = mailer;
        this.config = config;
        this.utils = utils;
    }
    sendMailPasswordResetLink({ email, token }) {
        const domain = this.utils.stripEndSlashes(this.config.get('API_DOMAIN'));
        const link = `${domain}/users/edit-password?token=${token}`;
        return this.mailer.sendMail({
            to: email,
            subject: 'password reset @nikolav.rs',
            template: 'password-reset/message',
            context: { link },
        });
    }
    plaintext({ to = 'admin@nikolav.rs', from = 'admin@nikolav.rs', subject = 'NestJS MailerModule ✔', message = 'message --test', }) {
        return this.mailer.sendMail({
            to,
            from,
            subject,
            template: 'promo/message',
            context: { message, link: 'https://nikolav.rs/' },
        });
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService,
        utils_service_1.UtilsService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map