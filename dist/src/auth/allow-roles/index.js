"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowRoles = void 0;
const common_1 = require("@nestjs/common");
const AllowRoles = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.AllowRoles = AllowRoles;
//# sourceMappingURL=index.js.map