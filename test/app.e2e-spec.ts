import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/posts (GET)', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .expect((res) => {
        // Customize this based on the expected response for your /posts endpoint
        // Ensure the response is an array
        expect(Array.isArray(res.body)).toBe(true);
        // Add specific expectations based on your application's logic
        // For example, assuming you have a service that provides posts
        expect(res.body).toHaveLength(2);
        expect(res.body[0].title).toEqual('Post 1');
        expect(res.body[1].title).toEqual('Post 2');
      });
  });



});
