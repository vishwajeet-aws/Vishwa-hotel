export type RoomType = 'Standard' | 'Deluxe' | 'Suite';

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  pricePerNight: number;
  images: string[];
  amenities: string[];
  rating: number;
  description: string;
  available: boolean;
  capacity: number;
  size: number;
  bedType: string;
  view: string;
  featured: boolean;
  highlights: string[];
}

export type BookingStatus = 'Confirmed' | 'Pending' | 'Checked In' | 'Completed';

export interface Booking {
  id: string;
  roomId: string;
  userName: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: BookingStatus;
  guests: number;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  code: string;
  validUntil: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  roomId: string;
}

export interface RoomFilters {
  priceRange: [number, number];
  roomType: RoomType | 'All';
  capacity: number | 'All';
  sortBy: 'price' | 'rating';
}

export interface BookingPayload {
  roomId: string;
  userName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: number;
}
