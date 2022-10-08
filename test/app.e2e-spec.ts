import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { HttpAdapterHost, Reflector } from '@nestjs/core';
import * as request from 'supertest';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaClientExceptionFilter } from '../src/prisma-client-exception.filter';
import { EmailService } from '../src/email/email.service';

describe('test --integration', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let mailer: EmailService;
  let config: ConfigService;
  let jwt: JwtService;

  const fakeEmail = () => `user--${Math.random()}@email.com`;
  const fakePassword = () => String(Math.random());
  const testUserEmail = 'admin@nikolav.rs';
  const password = '122333';
  let testUserToken: string;
  let testAdminToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // setup pipes, filters, interceptors
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        // disableErrorMessages: true
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

    await app.init();

    prisma = app.get(PrismaService);
    mailer = app.get(EmailService);
    config = app.get(ConfigService);
    jwt = app.get(JwtService);

    jest.clearAllMocks();
  });
  afterAll(async () => {
    await app.close();
    jest.clearAllMocks();
  });
  // init
  describe('@status', () => {
    it('api online', () =>
      request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect((res) => expect(res.body.status).toMatch(/ok/i)));
    it('test db online', async () => {
      const { value } = await prisma.main.findUnique({
        where: { name: 'test' },
      });
      expect(value).toMatch(/test/i);
    });
  });
  // register
  describe('@/auth/register', () => {
    const routeRegister = '/auth/register';
    it('201 -- registers new users, providing access token', () =>
      request(app.getHttpServer())
        .post(routeRegister)
        .send({ email: fakeEmail(), password })
        .expect((res) => {
          expect(res.statusCode).toBe(201);
          expect(res.body.token).toBeTruthy();
          testUserToken = res.body.token;
        }));
    it('409 -- conflict, existing email credentials', () =>
      request(app.getHttpServer())
        .post(routeRegister)
        .send({ email: testUserEmail, password })
        .expect(409));
    it('400 -- short password', () =>
      request(app.getHttpServer())
        .post(routeRegister)
        .send({ email: fakeEmail(), password: '1' })
        .expect(400));
    it('400 -- no email', () =>
      request(app.getHttpServer())
        .post(routeRegister)
        .send({ password })
        .expect(400));
    it('400 -- no password', () =>
      request(app.getHttpServer())
        .post(routeRegister)
        .send({ email: fakeEmail() })
        .expect(400));
    it('400 -- no credentials', async () =>
      request(app.getHttpServer()).post(routeRegister).send({}).expect(400));
  });
  // login
  describe('@/auth/authenticate', () => {
    const routeAuth = '/auth/authenticate';
    it('200 -- authenticates existing users, providing access token', () =>
      request(app.getHttpServer())
        .post(routeAuth)
        .send({ email: testUserEmail, password })
        .expect((res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.id).toBeTruthy();
          expect(res.body.token).toBeTruthy();
          testAdminToken = res.body.token;
        }));
    it('401 -- invalid email', () =>
      request(app.getHttpServer())
        .post(routeAuth)
        .send({ email: `invalid-${testUserEmail}`, password })
        .expect((res) => {
          expect(res.statusCode).toBe(401);
        }));
    it('401 -- invalid password', () =>
      request(app.getHttpServer())
        .post(routeAuth)
        .send({
          email: testUserEmail,
          password: `invalid-${password}`,
        })
        .expect((res) => {
          expect(res.statusCode).toBe(401);
        }));
    it('400 -- no email', () =>
      request(app.getHttpServer())
        .post(routeAuth)
        .send({ password })
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        }));
    it('400 -- no password', () =>
      request(app.getHttpServer())
        .post(routeAuth)
        .send({ email: testUserEmail })
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        }));
    it('400 -- no credentials', () =>
      request(app.getHttpServer())
        .post(routeAuth)
        .send({})
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        }));
  });
  // auth/user
  describe('#protected route @/auth/user', () => {
    const routeGetUser = '/auth/user';
    it('200 -- returns user data for authenticated requests', () =>
      request(app.getHttpServer())
        .get(routeGetUser)
        .set('Authorization', `Bearer ${testUserToken}`)
        .expect((res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.id).toBeTruthy();
        }));
    it('401 -- unauthenticated request for protected content', () =>
      request(app.getHttpServer())
        .get(routeGetUser)
        .expect((res) => {
          expect(res.statusCode).toBe(401);
        }));
    it('401 -- invalid access token request for protected content', () =>
      request(app.getHttpServer())
        .get(routeGetUser)
        .set('Authorization', `Bearer FAKE_TOKEN`)
        .expect((res) => {
          expect(res.statusCode).toBe(401);
        }));
  });
  // role policy
  describe('#role based access policy for protected email route with admin-guard', () => {
    const testToute = '/email/plaintext';

    it('200 -- admin policy can send emails', () => {
      const messageId = '<yiqkplzbqlx>';
      const messageSentPayload = { messageId };
      const mockSendMail = jest
        .spyOn(mailer, 'plaintext')
        .mockResolvedValue(messageSentPayload);

      return request(app.getHttpServer())
        .post(testToute)
        .set('Authorization', `Bearer ${testAdminToken}`)
        .send({
          to: testUserEmail,
          from: 'admin@nikolav.rs',
          subject: 'test',
          message: 'test',
        })
        .expect((res) => {
          expect(mockSendMail).toHaveBeenCalled();
          expect(res.statusCode).toBe(200);
          expect(res.body.messageId).toBe(messageId);
        });
    });

    it('403 -- blocks authenticated/non-admin-policy to access admin-guarded route', () =>
      request(app.getHttpServer())
        .post(testToute)
        .set('Authorization', `Bearer ${testUserToken}`)
        .send({
          to: testUserEmail,
          from: 'admin@nikolav.rs',
          subject: 'test',
          message: 'test',
        })
        .expect(403));

    it('401 -- invalid access-token request to guarded route', () =>
      request(app.getHttpServer())
        .post(testToute)
        .set('Authorization', `Bearer FAKE_TOKEN`)
        .send({
          to: testUserEmail,
          from: 'admin@nikolav.rs',
          subject: 'test',
          message: 'test',
        })
        .expect(401));

    it('401 -- unauthorized request to guarded route', () =>
      request(app.getHttpServer())
        .post(testToute)
        .send({
          to: testUserEmail,
          from: 'admin@nikolav.rs',
          subject: 'test',
          message: 'test',
        })
        .expect(401));
  });

  describe('@users service, password reset', () => {

    it('201 -- emails password-reset link', () => {
      const testRoutePasswordReset = '/users/send-password-reset-link';
      const messageId = '<ijnqnrflcss>';
      const messageSentPayload = { messageId };
      const mockSendMail = jest
        .spyOn(mailer, 'sendMailPasswordResetLink')
        .mockResolvedValue(messageSentPayload);

      return request(app.getHttpServer())
        .post(testRoutePasswordReset)
        .send({ email: testUserEmail })
        .expect((res) => {
          expect(mockSendMail).toHaveBeenCalled();
          expect(res.statusCode).toBe(201);
          expect(res.body.messageId).toBe(messageId);
        });
    });

    const testRoutePR = '/users/password-reset';
    const testUserPR = {
      email: `user--${fakePassword()}@email.com`,
      passwordHash: fakePassword(),
    };
    let testPRToken;

    it('200 -- resets password for request with valid reset token', async () => {
      // test user for password reset test
      // save, get id to sign
      const { id } = await prisma.user.create({ data: testUserPR });
      testPRToken = jwt.sign(
        { id },
        {
          secret: config.get('JWT_SECRET_UPDATE_PASSWORD'),
          expiresIn: parseInt(
            config.get('JWT_SECRET_UPDATE_PASSWORD_EXPIRE'),
            10,
          ),
        },
      );

      return request(app.getHttpServer())
        .post(testRoutePR)
        .send({ token: testPRToken, password: fakePassword() })
        .expect(200);
    });
    it('400 -- fails if provided invalid password reset token', () =>
      request(app.getHttpServer())
        .post(testRoutePR)
        .send({ token: 'INVALID_TOKEN', password: fakePassword() })
        .expect(400));
    it('400 -- fails if short password provided', () =>
      request(app.getHttpServer())
        .post(testRoutePR)
        .send({ token: testPRToken, password: '1' })
        .expect(400));
    it('400 -- fails if no password provided', () =>
      request(app.getHttpServer())
        .post(testRoutePR)
        .send({ token: testPRToken })
        .expect(400));
  });
});
