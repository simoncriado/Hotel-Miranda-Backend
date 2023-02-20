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

  try {
    if (rooms.length === 0) {
      return res.status(400).json({ result: "Error fetching the rooms" });
    }
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }

  await disconnect();
};

export const getRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const room: IRooms = await Room.findOne({ roomID: Number(req.params.roomId) })
    .exec()
    .catch((e) => next(e));

  try {
    if (room === null) {
      return res.status(400).json({ result: "Error fetching the single room" });
    }
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }

  await disconnect();
};

export const postRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  let offer = 0;
  if (req.body.discount === "Yes") {
    offer =
      req.body.room_rate -
      (req.body.discountPercent * req.body.room_rate) / 100;
  }

  const roomID = Math.floor(Math.random() * 10000000);

  let discountPercent: number = 0;
  if (req.body.discountPercent) {
    discountPercent = req.body.discountPercent;
  }

  const newRoom: IRooms[] | {} = {
    roomID: roomID,
    room_number: req.body.room_number,
    photo: req.body.photo,
    photoTwo: req.body.photoTwo,
    photoThree: req.body.photoThree,
    photoFour: req.body.photoFour,
    photoFive: req.body.photoFive,
    description: req.body.description,
    discountPercent: discountPercent,
    discount: req.body.discount,
    cancellationPolicy: req.body.cancellationPolicy,
    bed_type: req.body.bed_type,
    room_rate: req.body.room_rate,
    room_offer: offer,
    room_status: req.body.room_status,
    room_facilities: req.body.room_facilities,
  };

  await Room.create(newRoom).catch((e) => next(e));

  res.status(200).json({
    newroom: newRoom,
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

  let offer = 0;
  if (req.body.discount === "Yes") {
    offer =
      req.body.room_rate -
      (req.body.discountPercent * req.body.room_rate) / 100;
  }

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
    room_offer: offer,
    room_status: req.body.room_status,
    room_facilities: req.body.room_facilities,
  };

  const room: IRooms = await Room.findOneAndUpdate(
    { roomID: Number(req.params.roomId) },
    editedRoom
  )
    .exec()
    .catch((e) => next(e));

  res.status(200).json({
    message: "Room edited successfully",
    oldroom: room,
    newroom: editedRoom,
  });

  await disconnect();
};

export const deleteRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();
  const room: IRooms = await Room.findOneAndDelete({
    roomID: Number(req.params.roomId),
  })
    .exec()
    .catch((e) => next(e));

  res.status(200).json({
    message: "Room deleted successfully",
    oldroom: room,
  });

  await disconnect();
};
