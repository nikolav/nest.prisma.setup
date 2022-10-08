import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';
import { AuthEntity, GetUserEntity } from './entities';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuthenticatedUser(user: User): GetUserEntity;
    register(data: RegisterUserDto): Promise<AuthEntity>;
    authenticate(data: RegisterUserDto): Promise<AuthEntity>;
}
