import mongoose from "mongoose";

export async function connect() {
  await mongoose.connect("mongodb://simon:simon@localhost:27017/hotelmiranda");
}

export async function disconnect() {
  await mongoose.disconnect();
}
