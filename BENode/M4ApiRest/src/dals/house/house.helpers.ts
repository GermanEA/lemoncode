import { Review } from './house.model.js';

export const getLastReviews = (reviews: Review[], count: number): Review[] =>
  Array.isArray(reviews)
    ? [...reviews]
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, count)
    : [];
