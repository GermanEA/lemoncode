import { ObjectId, Decimal128 } from 'mongodb';
import * as model from '#dals/index.js';
import * as apiModel from './house.api-model.js';
import {
  mapHouseListFromModelToApi,
  mapHouseFromModelToApi,
  mapReviewListFromModelToApi,
  mapReviewFromApiToModel,
} from './house.mappers.js';

const house: model.House = {
  _id: new ObjectId('65097600a74000a4a4a229d7'),
  name: 'test-name',
  description: 'test-description',
  images: {
    picture_url: 'test-picture-url',
  },
  address: {
    street: 'test-street',
    country: 'Spain',
  },
  bedrooms: 2,
  beds: 3,
  bathrooms: new Decimal128('1.5'),
  price: new Decimal128('80.00'),
  reviews: [
    {
      _id: '1',
      date: new Date('2016-09-27T04:00:00.000Z'),
      listing_id: '10',
      reviewer_id: '20',
      reviewer_name: 'test-reviewer',
      comments: 'test-comment',
    },
  ],
};

describe('house.mappers spec', () => {
  describe('mapHouseListFromModelToApi', () => {
    it.each<{ houseList: model.House[] }>([
      { houseList: undefined },
      { houseList: null },
      { houseList: [] },
    ])(
      'should return empty array when it feeds houseList equals $houseList',
      ({ houseList }) => {
        // Arrange

        // Act
        const result = mapHouseListFromModelToApi(houseList);

        // Assert
        const expectedResult: apiModel.HouseListItem[] = [];
        expect(result).toEqual(expectedResult);
      }
    );

    it('should return one mapped item in array when it feeds houseList with one item', () => {
      // Arrange
      const houseList: model.House[] = [house];

      // Act
      const result = mapHouseListFromModelToApi(houseList);

      // Assert
      const expectedResult: apiModel.HouseListItem[] = [
        {
          id: '65097600a74000a4a4a229d7',
          title: 'test-name',
          image: 'test-picture-url',
          price: 80,
        },
      ];
      expect(result).toEqual(expectedResult);
    });
  });

  describe('mapHouseFromModelToApi', () => {
    it('should return mapped house with its reviews when it feeds a house', () => {
      // Arrange

      // Act
      const result = mapHouseFromModelToApi(house);

      // Assert
      const expectedResult: apiModel.House = {
        id: '65097600a74000a4a4a229d7',
        title: 'test-name',
        image: 'test-picture-url',
        description: 'test-description',
        address: 'test-street',
        bedrooms: 2,
        beds: 3,
        bathrooms: 1.5,
        reviews: [
          {
            name: 'test-reviewer',
            comment: 'test-comment',
            date: '2016-09-27T04:00:00.000Z',
          },
        ],
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return empty reviews when it feeds a house without reviews', () => {
      // Arrange
      const houseWithoutReviews: model.House = { ...house, reviews: undefined };

      // Act
      const result = mapHouseFromModelToApi(houseWithoutReviews);

      // Assert
      expect(result.reviews).toEqual([]);
    });
  });

  describe('mapReviewListFromModelToApi', () => {
    it.each<{ reviewList: model.Review[] }>([
      { reviewList: undefined },
      { reviewList: null },
      { reviewList: [] },
    ])(
      'should return empty array when it feeds reviewList equals $reviewList',
      ({ reviewList }) => {
        // Arrange

        // Act
        const result = mapReviewListFromModelToApi(reviewList);

        // Assert
        expect(result).toEqual([]);
      }
    );
  });

  describe('mapReviewFromApiToModel', () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return mapped review with date calculated in backend when it feeds a review', () => {
      // Arrange
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-01-15T10:00:00.000Z'));
      const review: apiModel.Review = {
        name: 'test-name',
        comment: 'test-comment',
        date: '2000-01-01T00:00:00.000Z',
      };

      // Act
      const result = mapReviewFromApiToModel(review);

      // Assert
      const expectedResult: model.Review = {
        _id: expect.any(String),
        date: new Date('2024-01-15T10:00:00.000Z'),
        reviewer_name: 'test-name',
        comments: 'test-comment',
      };
      expect(result).toEqual(expectedResult);
      expect(ObjectId.isValid(result._id)).toBeTruthy();
    });
  });
});
