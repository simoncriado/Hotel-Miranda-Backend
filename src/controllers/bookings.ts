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

  try {
    if (bookings.length === 0) {
      return res.status(400).json({ result: "Error fetching the bookings" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }

  await disconnect();
};

export const getBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const booking = await Booking.findOne({
    bookingID: Number(req.params.bookingId),
  })
    .exec()
    .catch((e: Error) => next(e));

  try {
    if (booking === null) {
      return res
        .status(400)
        .json({ result: "Error fetching the single booking" });
    }
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }

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
  const bookingID = Math.floor(Math.random() * 10000000);

  const newBooking: IBooking[] | {} = {
    bookingID: bookingID,
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

  res.status(200).json({
    newbooking: newBooking,
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
    { bookingID: Number(req.params.bookingId) },
    editedBooking
  )
    .exec()
    .catch((e) => next(e));

  res.status(200).json({
    message: "Booking edited successfully",
    oldbooking: booking,
    newbooking: editedBooking,
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
    bookingID: Number(req.params.bookingId),
  })
    .exec()
    .catch((e) => next(e));

  res.status(200).json({
    message: "Booking deleted successfully",
    oldbooking: booking,
  });

  await disconnect();
};
