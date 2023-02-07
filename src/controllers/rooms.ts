import { Request, Response, NextFunction } from "express";
import { connect, disconnect } from "../db/connection";
import { Room } from "../schemas/index";
import { IRooms } from "../interfaces/index";

export const getRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const rooms: IRooms[] = await Room.find()
    .exec()
    .catch((e) => next(e));

  res.json(rooms);

  await disconnect();
};

export const getRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const room: IRooms = await Room.findOne({ _id: req.params.roomId })
    .exec()
    .catch((e) => next(e));

  res.json(room);

  await disconnect();
};

export const postRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();
  console.log(req.body);

  const newRoom: IRooms[] | {} = {
    room_number: req.body.room_number,
    photo: req.body.photo,
    photoTwo: req.body.photoTwo,
    photoThree: req.body.photoThree,
    photoFour: req.body.photoFour,
    photoFive: req.body.photoFive,
    description: req.body.description,
    discountPercent: req.body.discountPercent,
    discount: req.body.discount,
    cancellationPolicy: req.body.cancellationPolicy,
    bed_type: req.body.bed_type,
    room_rate: req.body.room_rate,
    room_offer: req.body.room_offer,
    room_status: req.body.room_status,
    room_facilities: req.body.room_facilities,
  };

  await Room.create(newRoom).catch((e) => next(e));

  res.json({
    message: "Room created successfully",
  });

  await disconnect();
};

export const putRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const editedRoom: IRooms[] | {} = {
    room_number: req.body.room_number,
    photo: req.body.photo,
    photoTwo: req.body.photoTwo,
    photoThree: req.body.photoThree,
    photoFour: req.body.photoFour,
    photoFive: req.body.photoFive,
    description: req.body.description,
    discountPercent: req.body.discountPercent,
    discount: req.body.discount,
    cancellationPolicy: req.body.cancellationPolicy,
    bed_type: req.body.bed_type,
    room_rate: req.body.room_rate,
    room_offer: req.body.room_offer,
    room_status: req.body.room_status,
    room_facilities: req.body.room_facilities,
  };

  const room: IRooms = await Room.findOneAndUpdate(
    { _id: req.params.roomId },
    editedRoom
  )
    .exec()
    .catch((e) => next(e));

  res.json({
    message: "Room edited successfully",
    oldroom: room,
    newroom: req.body.room,
  });

  await disconnect();
};

export const deleteRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();
  const room: IRooms = await Room.findOneAndDelete({ _id: req.params.roomId })
    .exec()
    .catch((e) => next(e));

  res.json({
    message: "Room deleted successfully",
    oldroom: room,
  });

  await disconnect();
};
