import { ObjectId, Decimal128 } from 'mongodb';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import { createRestApiServer, dbServer } from '#core/servers/index.js';
import { ENV } from '#core/constants/index.js';
import { UserSession } from '#core/models/index.js';
import { houseContext } from '#dals/house/house.context.js';
import * as model from '#dals/index.js';
import * as apiModel from './house.api-model.js';
import { houseApi } from './house.api.js';

const createReview = (id: string, date: string): model.Review => ({
  _id: id,
  date: new Date(date),
  reviewer_name: `name-${id}`,
  comments: `comment-${id}`,
});

const spainHouse: model.House = {
  _id: new ObjectId('65097600a74000a4a4a229d7'),
  name: 'house-spain',
  description: 'description-spain',
  images: { picture_url: 'picture-spain' },
  address: { street: 'street-spain', country: 'Spain' },
  bedrooms: 1,
  beds: 2,
  bathrooms: new Decimal128('1.0'),
  price: new Decimal128('20.00'),
  reviews: [
    createReview('1', '2016-01-01'),
    createReview('2', '2016-02-01'),
    createReview('3', '2016-03-01'),
    createReview('4', '2016-04-01'),
    createReview('5', '2016-05-01'),
    createReview('6', '2016-06-01'),
  ],
};

const portugalHouse: model.House = {
  _id: new ObjectId('65097600a74000a4a4a22686'),
  name: 'house-portugal',
  description: 'description-portugal',
  images: { picture_url: 'picture-portugal' },
  address: { street: 'street-portugal', country: 'Portugal' },
  bedrooms: 3,
  beds: 5,
  bathrooms: new Decimal128('2.0'),
  price: new Decimal128('80.00'),
  reviews: [],
};

const createToken = (userSession: UserSession) =>
  `Bearer ${jwt.sign(userSession, ENV.AUTH_SECRET)}`;

describe('pods/house/house.api specs', () => {
  const app = createRestApiServer();
  app.use(houseApi);

  beforeAll(async () => {
    await dbServer.connect(ENV.MONGODB_URL);
  });

  beforeEach(async () => {
    await houseContext.insertMany([
      { ...spainHouse, reviews: [...spainHouse.reviews] },
      { ...portugalHouse, reviews: [...portugalHouse.reviews] },
    ]);
  });

  afterEach(async () => {
    await houseContext.deleteMany({});
  });

  afterAll(async () => {
    await dbServer.disconnect();
  });

  describe('get house list', () => {
    it('should return the whole houseList when it requests "/" without query params', async () => {
      // Arrange
      const route = '/';

      // Act
      const response = await supertest(app).get(route);

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveLength(2);
    });

    it('should return only the houses of the country when it requests "/?country=Spain"', async () => {
      // Arrange
      const route = '/?country=Spain';

      // Act
      const response = await supertest(app).get(route);

      // Assert
      const expectedResult: apiModel.HouseListItem[] = [
        {
          id: '65097600a74000a4a4a229d7',
          title: 'house-spain',
          image: 'picture-spain',
          price: 20,
        },
      ];
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(expectedResult);
    });

    it('should return the second page when it requests "/?page=2&pageSize=1"', async () => {
      // Arrange
      const route = '/?page=2&pageSize=1';

      // Act
      const response = await supertest(app).get(route);

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toEqual('house-portugal');
    });
  });

  describe('get house', () => {
    it('should return the house detail with the last 5 reviews', async () => {
      // Arrange
      const route = '/65097600a74000a4a4a229d7';

      // Act
      const response = await supertest(app).get(route);

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({
        id: '65097600a74000a4a4a229d7',
        title: 'house-spain',
        image: 'picture-spain',
        description: 'description-spain',
        address: 'street-spain',
        bedrooms: 1,
        beds: 2,
        bathrooms: 1,
        reviews: expect.any(Array),
      });
      expect(response.body.reviews.map((r: apiModel.Review) => r.name)).toEqual(
        ['name-6', 'name-5', 'name-4', 'name-3', 'name-2']
      );
    });

    it.each<{ id: string }>([
      { id: '000000000000000000000000' },
      { id: 'not-valid-id' },
    ])(
      'should return 404 when the house $id does not exist',
      async ({ id }) => {
        // Arrange
        const route = `/${id}`;

        // Act
        const response = await supertest(app).get(route);

        // Assert
        expect(response.statusCode).toEqual(404);
      }
    );
  });

  describe('insert review', () => {
    it('should return 201 and insert the review with the backend date', async () => {
      // Arrange
      const route = '/65097600a74000a4a4a22686/reviews';
      const review = { name: 'test-name', comment: 'test-comment' };
      const before = Date.now();

      // Act
      const response = await supertest(app).post(route).send(review);

      // Assert
      expect(response.statusCode).toEqual(201);
      expect(response.body.name).toEqual('test-name');
      expect(response.body.comment).toEqual('test-comment');
      expect(new Date(response.body.date).getTime()).toBeGreaterThanOrEqual(
        before
      );
      const house = await houseContext
        .findOne({
          _id: portugalHouse._id,
        })
        .lean();
      expect(house.reviews).toHaveLength(1);
      expect(house.reviews[0].reviewer_name).toEqual('test-name');
    });

    it.each<{ body: object }>([
      { body: {} },
      { body: { name: 'test-name' } },
      { body: { comment: 'test-comment' } },
      { body: { name: ' ', comment: 'test-comment' } },
    ])('should return 400 when it sends $body', async ({ body }) => {
      // Arrange
      const route = '/65097600a74000a4a4a22686/reviews';

      // Act
      const response = await supertest(app).post(route).send(body);

      // Assert
      expect(response.statusCode).toEqual(400);
    });

    it('should return 404 when the house does not exist', async () => {
      // Arrange
      const route = '/000000000000000000000000/reviews';

      // Act
      const response = await supertest(app)
        .post(route)
        .send({ name: 'test-name', comment: 'test-comment' });

      // Assert
      expect(response.statusCode).toEqual(404);
    });
  });

  describe('update house', () => {
    const route = '/65097600a74000a4a4a22686';
    const houseToUpdate = {
      title: 'updated-title',
      image: 'updated-picture',
      description: 'updated-description',
      address: 'updated-street',
      bedrooms: 4,
      beds: 6,
      bathrooms: 2.5,
    };

    it('should return 401 when there is no authorization cookie', async () => {
      // Arrange

      // Act
      const response = await supertest(app).put(route).send(houseToUpdate);

      // Assert
      expect(response.statusCode).toEqual(401);
    });

    it('should return 403 when a standard user tries to update a house', async () => {
      // Arrange
      const token = createToken({ id: '1', role: 'standard-user' });

      // Act
      const response = await supertest(app)
        .put(route)
        .set('Cookie', `authorization=${token}`)
        .send(houseToUpdate);

      // Assert
      expect(response.statusCode).toEqual(403);
    });

    it('should return 204 and update only the detail fields when an admin updates a house', async () => {
      // Arrange
      const token = createToken({ id: '1', role: 'admin' });

      // Act
      const response = await supertest(app)
        .put(route)
        .set('Cookie', `authorization=${token}`)
        .send(houseToUpdate);

      // Assert
      expect(response.statusCode).toEqual(204);
      const house = await houseContext
        .findOne({
          _id: portugalHouse._id,
        })
        .lean();
      expect(house.name).toEqual('updated-title');
      expect(house.images.picture_url).toEqual('updated-picture');
      expect(house.description).toEqual('updated-description');
      expect(house.address.street).toEqual('updated-street');
      expect(house.address.country).toEqual('Portugal');
      expect(house.bedrooms).toEqual(4);
      expect(house.beds).toEqual(6);
      expect(house.bathrooms.toString()).toEqual('2.5');
      expect(house.price.toString()).toEqual('80.00');
    });

    it('should return 404 when an admin updates a house that does not exist', async () => {
      // Arrange
      const token = createToken({ id: '1', role: 'admin' });

      // Act
      const response = await supertest(app)
        .put('/000000000000000000000000')
        .set('Cookie', `authorization=${token}`)
        .send(houseToUpdate);

      // Assert
      expect(response.statusCode).toEqual(404);
    });
  });
});
