import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';
import config$ from '../config';
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';
//
const { PORT, DOCS_ENDPOINT } = config$;
const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  //
  app.use(helmet());
  app.enableCors();
  app.use(compression());
  //
  // validate input
  app.useGlobalPipes(
    new ValidationPipe({
      // skips fields not provided in dto
      whitelist: true,
      // disableErrorMessages: true
      // auto transform primitives
      transform: true,
      transformOptions: {
        // auto transform input to dto types
        enableImplicitConversion: true,
      },
    }),
  );
  // serialize output
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // handle global exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  //
  const config = new DocumentBuilder()
    .setTitle('@API')
    .setDescription('rest.api@nest.prisma')
    .setVersion('1.0')
    // .addTag('nestjs-prisma-rest-starter')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(DOCS_ENDPOINT, app, document, {
    customSiteTitle: 'welcome to api-docs',
  });

  await app.listen(PORT);
};
//
bootstrap();
