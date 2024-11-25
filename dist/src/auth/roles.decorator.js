"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const common_1 = require("@nestjs/common");
// este es el decorador que se en el controlador
const Roles = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.Roles = Roles;
