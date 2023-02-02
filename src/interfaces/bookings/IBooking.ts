export interface IBooking {
  bookingID: number;
  userName: string;
  userPicture: string;
  orderDate: Date;
  checkIn: Date;
  checkOut: Date;
  specialRequest: string;
  roomID: number;
  roomType: string;
  roomNumber: number;
  roomRate: number;
  status: string;
}
