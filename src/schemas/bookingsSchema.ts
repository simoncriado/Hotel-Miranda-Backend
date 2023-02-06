import mongoose from "mongoose";
import { IBooking } from "../interfaces/index";

const { Schema } = mongoose;

const bookingSchema = new Schema<IBooking>({
  bookingID: Number,
  userName: String,
  userPicture: String,
  orderDate: String,
  checkIn: String,
  checkOut: String,
  specialRequest: String,
  roomType: String,
  status: String,
  roomID: String,
  roomNumber: Number,
  roomRate: Number,
});

export const Booking = mongoose.model("booking", bookingSchema);
