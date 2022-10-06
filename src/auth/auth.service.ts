import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compareSync } from 'bcryptjs';
import { User } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { assign, map } from 'lodash';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto';
//
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register({ email, password }: RegisterUserDto) {
    const saltRounds = parseInt(this.config.get('SALT_ROUNDS_BCRYPT'), 10);
    const passwordHash = await hash(password, saltRounds);
    // try create, handle exception @prisma.filters
    const newUser = await this.prisma.user.create({
      data: { email, passwordHash },
    });
    // g2g here, paste tokens, send
    return this.withTokens(newUser);
  }

  async authenticate({ email, password }: RegisterUserDto) {
    // get user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    // run credentials
    if (!user || !compareSync(password, user.passwordHash))
      throw new UnauthorizedException('-- invalid credentials');
    // credentials ok, send user info
    return await this.withTokens(user);
  }

  async withTokens(user: User) {
    const payload = { sub: user.id };
    // config.acces-token
    const secret = this.config.get('JWT_SECRET');
    const expiresIn = `${this.config.get('JWT_TOKEN_EXPIRE')}s`;
    // config.refresh-token
    const secretRefresh = this.config.get('JWT_SECRET_TOKEN_REFRESH');
    const expiresInRefresh = `${this.config.get('JWT_TOKEN_REFRESH_EXPIRE')}s`;
    // encrypt.AT
    const token = await this.jwt.sign(payload, {
      expiresIn,
      secret,
    });
    // encrypt.RT
    const refershToken = await this.jwt.sign(payload, {
      expiresIn: expiresInRefresh,
      secret: secretRefresh,
    });
    // merge tokens in user{}
    assign(user, { token, refershToken });
    return user;
  }
  //
  async matchesRoles(user: User, roles: string[]) {
    const userRoles = await this.getUserRoles(user);
    return roles.every((role) => userRoles.includes(role));
  }
  //
  async getUserRoles(user: User) {
    // filter user's roles
    const res = await this.prisma.role.findMany({
      where: {
        users: {
          some: {
            userId: user.id,
          },
        },
      },
      select: {
        type: true,
      },
    });
    // get role list: string[]
    return map(res, 'type');
  }
  //
  async findManyByRole(roleType: string) {
    // get *users with a .type role
    return await this.prisma.user.findMany({
      where: {
        roles: {
          some: {
            role: {
              type: roleType,
            },
          },
        },
      },
    });
  }
}
