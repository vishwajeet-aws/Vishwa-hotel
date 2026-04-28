import { reviews } from '../data/reviews';
import { Review } from '../types';
import { mockDelay } from './mockDelay';

export const reviewService = {
  async getReviews(): Promise<Review[]> {
    await mockDelay(350);
    return reviews.map((review) => ({ ...review }));
  },

  async getReviewsByRoomId(roomId: string): Promise<Review[]> {
    await mockDelay(350);
    return reviews.filter((review) => review.roomId === roomId).map((review) => ({ ...review }));
  },
};
