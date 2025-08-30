import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('CORS (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Enable CORS as the real app would: allow a sample origin and credentials
    app.enableCors({
      origin: ['http://example.test'],
      credentials: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    });

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should include Access-Control-Allow-Origin and credentials for allowed origin', async () => {
    const origin = 'http://example.test';

  const res = await (request as any)(app.getHttpServer())
      .get('/')
      .set('Origin', origin)
      .expect(200);

    // supertest lower-cases header names
    expect(res.headers['access-control-allow-origin']).toBe(origin);
    expect(res.headers['access-control-allow-credentials']).toBe('true');
  });
});
