import express, { Response, Request, NextFunction } from "express";
import passport from "passport";
import cors from "cors";

import * as dotenv from "dotenv";
dotenv.config();

import loginRouter from "./routes/login";
import bookingsRouter from "./routes/bookings";
import roomsRouter from "./routes/rooms";
import usersRouter from "./routes/users";
import contactRouter from "./routes/contact";

import("./auth/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  return res.json("build on");
});

app.use("/login", loginRouter);

app.use(
  "/bookings",
  passport.authenticate("jwt", { session: false }),
  bookingsRouter
);
app.use(
  "/rooms",
  passport.authenticate("jwt", { session: false }),
  roomsRouter
);
app.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  usersRouter
);
app.use(
  "/contact",
  passport.authenticate("jwt", { session: false }),
  contactRouter
);

app.listen(3001, () => {
  console.log("Server started.");
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ error: err.message });
});

export default app;
