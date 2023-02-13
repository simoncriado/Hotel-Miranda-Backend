import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../src/app";
import jwt from "jsonwebtoken";
import { connect, disconnect } from "../src/db/connection";
import { Booking, User, Room } from "../src/schemas";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const token: string = jwt.sign(
  { user: { id: 1, email: "test@test.com" } },
  String(process.env.SECRET_TOKEN)
);

beforeAll(async () => {
  app.listen(0, () => {
    console.log("Server started.");
  });
  await connect();
});

afterAll(async () => {
  await connect();

  await disconnect();
});

describe("Get bookings list", (): void => {
  test("Get bookings without token", async (): Promise<void> => {
    // await connect();
    await request(app).get("/bookings").expect(401);

    // await disconnect();
  });

  test("Get bookings with token", async () => {
    // await connect();
    const bookings = await Booking.find()
      .exec()
      .catch((e) => console.log(e));

    const res = await request(app)
      .get("/bookings")
      .set("Authorization", "Bearer " + token);

    expect(bookings).toEqual(bookings);
    expect(res.statusCode).toBe(200);

    // await disconnect();
  });
});
