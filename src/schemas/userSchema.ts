import mongoose from "mongoose";
import { IUser } from "../interfaces";

const { Schema } = mongoose;

const userSchema = new Schema<IUser>({
  photo: String,
  name: { type: String, required: true },
  position: String,
  email: { type: String, required: true },
  phone: String,
  date: String,
  description: String,
  state: { type: String, required: true },
  pass: { type: String, required: true },
});

export const User = mongoose.model("user", userSchema);
