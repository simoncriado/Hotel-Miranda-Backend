import mongoose from "mongoose";
import { IRooms } from "../interfaces/index";

const { Schema } = mongoose;

const roomSchema = new Schema<IRooms>({
  room_number: { type: Number, required: true },
  photo: String,
  photoTwo: String,
  photoThree: String,
  photoFour: String,
  photoFive: String,
  description: String,
  discountPercent: Number,
  discount: String,
  cancellationPolicy: String,
  bed_type: String,
  room_facilities: Array,
  room_rate: Number,
  room_offer: Number,
  room_status: String,
});

export const Room = mongoose.model("room", roomSchema);
