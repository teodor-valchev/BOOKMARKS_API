import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

describe('App e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    const app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // whatever is in the dto defined that will be used!!!
      }),
    );

    await app.init();
  });

  afterAll(() => {
    if (app) {
      app.close();
    }
  });
  it.todo('Should pass');
});
