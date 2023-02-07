import mongoose from "mongoose";
import { IReviews } from "../interfaces";

const { Schema } = mongoose;

const reviewsSchema = new Schema<IReviews>({
  date: String,
  name: String,
  email: String,
  phone: String,
  comment: String,
  stars: Number,
  archived: Number,
});

export const Review = mongoose.model("review", reviewsSchema);
