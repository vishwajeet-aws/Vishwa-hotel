import { offers } from '../data/offers';
import { Offer } from '../types';
import { mockDelay } from './mockDelay';

export const offerService = {
  async getOffers(): Promise<Offer[]> {
    await mockDelay(300);
    return offers.map((offer) => ({ ...offer }));
  },
};
