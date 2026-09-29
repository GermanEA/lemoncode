import { ObjectId } from 'mongodb';
import supertest from 'supertest';
import { createRestApiServer, dbServer } from '#core/servers/index.js';
import { ENV } from '#core/constants/index.js';
import { hash } from '#common/helpers/index.js';
import { userContext } from '#dals/user/user.context.js';
import { securityApi } from './security.api.js';

describe('pods/security/security.api specs', () => {
  const app = createRestApiServer();
  app.use(securityApi);

  beforeAll(async () => {
    await dbServer.connect(ENV.MONGODB_URL);
  });

  beforeEach(async () => {
    await userContext.create({
      _id: new ObjectId(),
      email: 'admin@email.com',
      password: await hash('test'),
      role: 'admin',
    });
  });

  afterEach(async () => {
    await userContext.deleteMany({});
  });

  afterAll(async () => {
    await dbServer.disconnect();
  });

  describe('login', () => {
    it('should return 204 and set authorization cookie when it feeds valid credentials', async () => {
      // Arrange
      const route = '/login';

      // Act
      const response = await supertest(app)
        .post(route)
        .send({ email: 'admin@email.com', password: 'test' });

      // Assert
      expect(response.statusCode).toEqual(204);
      expect(response.headers['set-cookie'][0]).toMatch(
        /^authorization=Bearer%20.+; Path=\/; HttpOnly/
      );
    });

    it.each<{ email: string; password: string }>([
      { email: 'admin@email.com', password: 'wrong-password' },
      { email: 'unknown@email.com', password: 'test' },
    ])(
      'should return 401 when it feeds email $email and password $password',
      async ({ email, password }) => {
        // Arrange
        const route = '/login';

        // Act
        const response = await supertest(app)
          .post(route)
          .send({ email, password });

        // Assert
        expect(response.statusCode).toEqual(401);
      }
    );
  });
});
