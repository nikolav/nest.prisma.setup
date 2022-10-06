import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';
import { AuthEntity, GetUserEntity } from './entities';
import { JwtGuard } from './guard';
import { GetUser } from './decorators';
//
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('user')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: GetUserEntity })
  getAuthenticatedUser(@GetUser() user: User) {
    return new GetUserEntity(user);
  }

  @Post('register')
  @ApiCreatedResponse({ type: AuthEntity })
  async register(@Body() data: RegisterUserDto) {
    const user = await this.authService.register(data);
    return new AuthEntity(user);
  }

  @Post('authenticate')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthEntity })
  async authenticate(@Body() data: RegisterUserDto) {
    const user = await this.authService.authenticate(data);
    return new AuthEntity(user);
  }
}
