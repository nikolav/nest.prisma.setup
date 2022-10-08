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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariablesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lodash_1 = require("lodash");
const variables_service_1 = require("./variables.service");
const dto_1 = require("./dto");
const entities_1 = require("./entities");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
let VariablesController = class VariablesController {
    constructor(variablesService) {
        this.variablesService = variablesService;
    }
    async create(createVariableDto) {
        return new entities_1.VariableEntity(await this.variablesService.create(createVariableDto));
    }
    async findAll() {
        return (0, lodash_1.map)(await this.variablesService.findAll(), (node) => new entities_1.VariableEntity(node));
    }
    async findOne(id) {
        return new entities_1.VariableEntity(await this.variablesService.findOne(id));
    }
    async update(id, updateVariableDto) {
        return new entities_1.VariableEntity(await this.variablesService.update(id, updateVariableDto));
    }
    async remove(id) {
        return new entities_1.VariableEntity(await this.variablesService.remove(id));
    }
    async findOneByName(name) {
        return new entities_1.VariableEntity(await this.variablesService.findOneByName(name));
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOkResponse)({ type: entities_1.VariableEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateVariableDto]),
    __metadata("design:returntype", Promise)
], VariablesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: entities_1.VariableEntity, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VariablesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: entities_1.VariableEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VariablesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: entities_1.VariableEntity }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateVariableDto]),
    __metadata("design:returntype", Promise)
], VariablesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: entities_1.VariableEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VariablesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('name/:name'),
    (0, swagger_1.ApiOkResponse)({ type: entities_1.VariableEntity }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VariablesController.prototype, "findOneByName", null);
VariablesController = __decorate([
    (0, common_1.Controller)('variables'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Variables'),
    __metadata("design:paramtypes", [variables_service_1.VariablesService])
], VariablesController);
exports.VariablesController = VariablesController;
//# sourceMappingURL=variables.controller.js.map