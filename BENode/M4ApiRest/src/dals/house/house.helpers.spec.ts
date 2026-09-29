import { Review } from './house.model.js';
import { getLastReviews } from './house.helpers.js';

const createReview = (id: string, date: string): Review => ({
  _id: id,
  date: new Date(date),
  reviewer_name: `name-${id}`,
  comments: `comment-${id}`,
});

describe('house.helpers specs', () => {
  describe('getLastReviews', () => {
    it.each<{ reviews: Review[] }>([
      { reviews: undefined },
      { reviews: null },
      { reviews: [] },
    ])(
      'should return empty array when it feeds reviews equals $reviews',
      ({ reviews }) => {
        // Arrange

        // Act
        const result = getLastReviews(reviews, 5);

        // Assert
        expect(result).toEqual([]);
      }
    );

    it('should return the newest reviews first limited by count', () => {
      // Arrange
      const reviews: Review[] = [
        createReview('1', '2016-01-01'),
        createReview('2', '2016-03-01'),
        createReview('3', '2016-02-01'),
        createReview('4', '2016-05-01'),
        createReview('5', '2016-04-01'),
        createReview('6', '2016-06-01'),
      ];

      // Act
      const result = getLastReviews(reviews, 5);

      // Assert
      expect(result.map((r) => r._id)).toEqual(['6', '4', '5', '2', '3']);
    });

    it('should return all reviews when there are less than count', () => {
      // Arrange
      const reviews: Review[] = [
        createReview('1', '2016-01-01'),
        createReview('2', '2016-03-01'),
      ];

      // Act
      const result = getLastReviews(reviews, 5);

      // Assert
      expect(result.map((r) => r._id)).toEqual(['2', '1']);
    });

    it('should not mutate the original reviews', () => {
      // Arrange
      const reviews: Review[] = [
        createReview('1', '2016-01-01'),
        createReview('2', '2016-03-01'),
      ];

      // Act
      getLastReviews(reviews, 5);

      // Assert
      expect(reviews.map((r) => r._id)).toEqual(['1', '2']);
    });
  });
});
