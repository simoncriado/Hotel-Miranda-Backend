import { Request, Response, NextFunction } from "express";
import { connect, disconnect } from "../db/connection";
import { Booking } from "../schemas/index";
import { IBooking } from "../interfaces";

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

export const getBooking = (req, res) => {
  const { id } = req.params;
  const singleBooking: string = `Made it to the single booking with ID ${id}`;
  res.status(200).json(singleBooking);
};

export const postBooking = (req, res) => {
  const newBooking: string = "Creating new booking";
  res.status(200).json(newBooking);
};

export const putBooking = (req, res) => {
  const { id } = req.params;
  const singleBooking: string = `Editing the booking with ID ${id}`;
  res.status(200).json(singleBooking);
};

export const deleteBooking = (req, res) => {
  const { id } = req.params;
  const singleBooking: string = `Deleting the booking with ID ${id}`;
  res.status(200).json(singleBooking);
};
