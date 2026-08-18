import { Booking, MOCK_BOOKINGS, DevoteeMember } from '../data/mockBookings';

export const bookingService = {
  async getBookings(): Promise<Booking[]> {
    await new Promise((res) => setTimeout(res, 200));
    return [...MOCK_BOOKINGS];
  },

  async getBookingById(bookingId: string): Promise<Booking | undefined> {
    await new Promise((res) => setTimeout(res, 150));
    return MOCK_BOOKINGS.find((b) => b.bookingId === bookingId);
  },

  async createBooking(data: {
    templeId: string;
    templeName: string;
    sevaName: string;
    date: string;
    slotTime: string;
    priorityType: 'Standard' | 'Senior' | 'Accessible' | 'VIP';
    devotees: DevoteeMember[];
    totalAmount: number;
  }): Promise<Booking> {
    await new Promise((res) => setTimeout(res, 400));
    const newBooking: Booking = {
      bookingId: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
      templeId: data.templeId,
      templeName: data.templeName,
      sevaName: data.sevaName,
      date: data.date,
      slotTime: data.slotTime,
      totalMembers: data.devotees.length,
      totalAmount: data.totalAmount,
      status: 'Confirmed',
      priorityType: data.priorityType,
      qrPassCode: `SEVA360-${Date.now()}`,
      bookedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      devotees: data.devotees
    };
    MOCK_BOOKINGS.unshift(newBooking);
    return newBooking;
  }
};
