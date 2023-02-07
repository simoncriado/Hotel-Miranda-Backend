export interface IBooking {
  id: number;
  bookingID: number;
  userName: string;
  userPicture: string;
  orderDate: string;
  checkIn: string;
  checkOut: string;
  specialRequest: string;
  roomType: string;
  status: string;
  roomID: string;
  roomNumber: number;
  roomRate: number;
  roomPhotos: string[];
  roomFacilities: string[];
}
