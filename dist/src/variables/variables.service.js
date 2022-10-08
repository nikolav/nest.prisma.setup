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
exports.VariablesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VariablesService = class VariablesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createVariableDto) {
        return this.prisma.main.create({ data: createVariableDto });
    }
    findAll() {
        return this.prisma.main.findMany({});
    }
    findOne(id) {
        return this.prisma.main.findUnique({ where: { id } });
    }
    update(id, updateVariableDto) {
        return this.prisma.main.update({
            where: { id },
            data: updateVariableDto,
        });
    }
    remove(id) {
        return this.prisma.main.delete({ where: { id } });
    }
    findOneByName(name) {
        return this.prisma.main.findUnique({ where: { name } });
    }
};
VariablesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VariablesService);
exports.VariablesService = VariablesService;
//# sourceMappingURL=variables.service.js.map