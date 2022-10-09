import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { assign } from 'lodash';
import { hash } from 'bcryptjs';
import { PasswordResetBodyDto, PasswordResetDto } from './dto';
import { EmailService } from '../email/email.service';
import { PrismaService } from '../prisma/prisma.service';
//
@Injectable()
export class UserService {
  constructor(
    private readonly mailer: EmailService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}
  //
  async sendPasswordResetLink(data: PasswordResetDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    // 400 if no user with this email
    if (!user) throw new BadRequestException();
    // mail reset link with password reset token
    const mail = await this.mailer.sendMailPasswordResetLink(
      this.withPasswordResetToken(user),
    );
    //
    return { ...data, ...mail };
  }

  withPasswordResetToken(user: User) {
    const token = this.jwt.sign(
      { id: user.id },
      {
        secret: this.config.get('JWT_SECRET_UPDATE_PASSWORD'),
        expiresIn: parseInt(
          this.config.get('JWT_SECRET_UPDATE_PASSWORD_EXPIRE'),
          10,
        ),
      },
    );
    //
    return assign(user, { token });
  }
  //
  async passwordUpdate({ password, token }: PasswordResetBodyDto) {
    // steps
    //  - verify token
    //  - get user
    //  - hash/update new password
    //  - send res
    try {
      // veirfy
      const { id } = this.jwt.verify(token, {
        secret: this.config.get('JWT_SECRET_UPDATE_PASSWORD'),
        maxAge: parseInt(
          this.config.get('JWT_SECRET_UPDATE_PASSWORD_EXPIRE'),
          10,
        ),
      });
      // get user
      const user = this.prisma.user.findUnique({ where: { id } });
      if (!user) throw new BadRequestException();
      // user exists & token valid/not-expired here
      // hash, save, send
      const passwordHash = await hash(
        password,
        parseInt(this.config.get('SALT_ROUNDS_BCRYPT'), 10),
      );
      //
      return await this.prisma.user.update({
        where: { id },
        data: { passwordHash },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
