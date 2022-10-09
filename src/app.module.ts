import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { VariablesModule } from './variables/variables.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UtilsModule } from './utils/utils.module';
import { EmailModule } from './email/email.module';
import { MessageGateway } from './io/message.gateway';
//
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    VariablesModule,
    AuthModule,
    UtilsModule,
    UserModule,
    // https://notiz.dev/blog/send-emails-with-nestjs
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService, MessageGateway],
})
export class AppModule {}
