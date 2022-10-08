import { PasswordResetDto, PasswordResetBodyDto } from './dto';
import { ResetPasswordLinkEmailedEntitiy, UserWithoutPasswordEntity } from './entities';
import { UserService } from './user.service';
export declare class UserController {
    private readonly serviceUser;
    constructor(serviceUser: UserService);
    sendPasswordResetLink(data: PasswordResetDto): Promise<ResetPasswordLinkEmailedEntitiy>;
    passwordUpdate(data: PasswordResetBodyDto): Promise<UserWithoutPasswordEntity>;
}
