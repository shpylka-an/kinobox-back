import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { RegisterDto } from '../src/auth/dto/register.dto';
import { LoginDto } from '../src/auth/dto/login.dto';

describe('Auth', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  describe('POST /auth/register', () => {
    it('Should register', () => {
      const registerData: RegisterDto = {
        email: 'example@gmail.com',
        username: 'user',
        password: 'secret',
      };

      return request(app.getHttpServer())
        .post('/auth/register')
        .set('Accept', 'application/json')
        .send(registerData)
        .expect(200)
        .expect((res) => {
          expect(res.body.accessToken).toBeDefined();
        });
    });
  });

  describe('POST /auth/login', () => {
    it('Should login', () => {
      const loginData: LoginDto = {
        email: 'example@gmail.com',
        password: 'secret',
      };

      return request(app.getHttpServer())
        .post('/auth/login')
        .set('Accept', 'application/json')
        .send(loginData)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.accessToken).toBeDefined();
        });
    });
  });
});
