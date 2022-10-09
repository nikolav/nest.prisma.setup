import { join } from 'path';
import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { VariablesModule } from './variables/variables.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UtilsModule } from './utils/utils.module';
import { EmailModule } from './email/email.module';
// import { MessageGateway } from './io/message.gateway';
import { MessageModule } from './io/message.module';
import { GlobalMiddleware } from './middleware';
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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    MessageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // MessageGateway
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GlobalMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    // .forRoutes(<controller>);
    // .exclude(<routes>)
  }
}
