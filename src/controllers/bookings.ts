import { Request, Response, NextFunction } from "express";
import { connect, disconnect } from "../db/connection";
import { Booking, Room } from "../schemas/index";
import { IBooking, IRooms } from "../interfaces";

export const getBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const bookings: IBooking[] = await Booking.find()
    .exec()
    .catch((e) => next(e));

  res.json(bookings);

  await disconnect();
};

export const getBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const booking = await Booking.findOne({ _id: req.params.bookingId })
    .exec()
    .catch((e: Error) => next(e));

  res.json(booking);

  await disconnect();
};

export const postBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const rooms: IRooms[] = await Room.find({ bed_type: req.body.roomType })
    .exec()
    .catch((e) => console.log(e));

  const randomNumber: number = Math.floor(Math.random() * rooms.length);
  const randomRoom: IRooms = rooms[randomNumber];

  const randomRoomPhotosArray = [
    randomRoom.photo,
    randomRoom.photoTwo,
    randomRoom.photoThree,
    randomRoom.photoFour,
    randomRoom.photoFive,
  ];

  const newBooking: IBooking[] | {} = {
    bookingID: req.body.bookingID,
    userName: req.body.userName,
    userPicture: req.body.userPicture,
    orderDate: req.body.orderDate,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    specialRequest: req.body.specialRequest,
    roomType: req.body.roomType,
    status: req.body.status,
    roomID: randomRoom.id,
    roomNumber: randomRoom.room_number,
    roomRate: randomRoom.room_rate,
    roomPhotos: randomRoomPhotosArray,
    roomFacilities: randomRoom.room_facilities,
  };

  await Booking.create(newBooking).catch((e) => next(e));

  res.json({
    message: "Booking created successfully",
  });

  await disconnect();
};

export const putBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const rooms: IRooms[] = await Room.find({ bed_type: req.body.roomType })
    .exec()
    .catch((e) => console.log(e));

  const randomNumber: number = Math.floor(Math.random() * rooms.length);
  const randomRoom: IRooms = rooms[randomNumber];

  const randomRoomPhotosArray = [
    randomRoom.photo,
    randomRoom.photoTwo,
    randomRoom.photoThree,
    randomRoom.photoFour,
    randomRoom.photoFive,
  ];

  const editedBooking: IBooking[] | {} = {
    bookingID: req.body.bookingID,
    userName: req.body.userName,
    userPicture: req.body.userPicture,
    orderDate: req.body.orderDate,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    specialRequest: req.body.specialRequest,
    roomType: req.body.roomType,
    status: req.body.status,
    roomID: randomRoom.id,
    roomNumber: randomRoom.room_number,
    roomRate: randomRoom.room_rate,
    roomPhotos: randomRoomPhotosArray,
    roomFacilities: randomRoom.room_facilities,
  };

  const booking: IBooking = await Booking.findOneAndUpdate(
    { _id: req.params.bookingId },
    editedBooking
  )
    .exec()
    .catch((e) => next(e));

  res.json({
    message: "Booking edited successfully",
    oldbooking: booking,
    newbooking: req.body.booking,
  });

  await disconnect();
};

export const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();
  const booking: IBooking = await Booking.findOneAndDelete({
    _id: req.params.bookingId,
  })
    .exec()
    .catch((e) => next(e));

  res.json({
    message: "Booking deleted successfully",
    oldbooking: booking,
  });

  await disconnect();
};
