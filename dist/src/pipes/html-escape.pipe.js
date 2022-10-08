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
exports.HtmlEscapeValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const lodash_1 = require("lodash");
const html_escaper_1 = require("html-escaper");
let HtmlEscapeValidationPipe = class HtmlEscapeValidationPipe {
    constructor(fields) {
        this.fields = fields;
    }
    async transform(value, d) {
        const { metatype } = d;
        const { fields } = this;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = (0, class_transformer_1.plainToClass)(metatype, value);
        const errors = await (0, class_validator_1.validate)(object);
        if (errors.length > 0) {
            throw new common_1.BadRequestException('Validation failed');
        }
        return (0, lodash_1.transform)(value, (res, content, field) => {
            res[field] = fields.includes(field) ? (0, html_escaper_1.escape)(content) : content;
        }, {});
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
};
HtmlEscapeValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Array])
], HtmlEscapeValidationPipe);
exports.HtmlEscapeValidationPipe = HtmlEscapeValidationPipe;
//# sourceMappingURL=html-escape.pipe.js.map