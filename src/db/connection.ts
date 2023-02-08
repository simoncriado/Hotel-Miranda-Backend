import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    throw new Error(error);
  }
}

export async function disconnect() {
  await mongoose.disconnect();
}
