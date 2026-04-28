import { rooms } from '../data/rooms';
import { mockDelay } from './mockDelay';
import { Room, RoomFilters } from '../types';

const cloneRooms = () => rooms.map((room) => ({ ...room, images: [...room.images], amenities: [...room.amenities], highlights: [...room.highlights] }));

export const roomService = {
  async getRooms(): Promise<Room[]> {
    await mockDelay();
    return cloneRooms();
  },

  async getFeaturedRooms(): Promise<Room[]> {
    await mockDelay(350);
    return cloneRooms().filter((room) => room.featured);
  },

  async getRoomById(id: string): Promise<Room | undefined> {
    await mockDelay(300);
    return cloneRooms().find((room) => room.id === id);
  },

  async filterRooms(filters: RoomFilters): Promise<Room[]> {
    await mockDelay(350);
    const filtered = cloneRooms()
      .filter((room) => room.pricePerNight >= filters.priceRange[0] && room.pricePerNight <= filters.priceRange[1])
      .filter((room) => filters.roomType === 'All' || room.type === filters.roomType)
      .filter((room) => filters.capacity === 'All' || room.capacity >= filters.capacity)
      .sort((left, right) =>
        filters.sortBy === 'price'
          ? left.pricePerNight - right.pricePerNight
          : right.rating - left.rating,
      );

    return filtered;
  },
};
