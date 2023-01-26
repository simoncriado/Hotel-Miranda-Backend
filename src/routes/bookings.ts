import express from "express";
import {
  getBookings,
  getBooking,
  postBooking,
  deleteBooking,
  putBooking,
} from "../controllers/bookings";
const bookingsRouter = express.Router();

// GET bookings (Read method)
bookingsRouter.get("/", getBookings);

// GET single booking (Read method)
bookingsRouter.get("/:bookingId", getBooking);

// POST a new booking (Create method)
bookingsRouter.post("/", postBooking);

// PUT a booking (Update method)
bookingsRouter.put("/:bookingId", putBooking);

// DELETE single booking (Delete method)
bookingsRouter.delete("/:bookingId", deleteBooking);

export default bookingsRouter;
