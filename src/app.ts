import express from "express";
import passport from "passport";

import loginRouter from "./routes/login";
import bookingsRouter from "./routes/bookings";

import("./auth/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.json("build on");
});

app.use("/login", loginRouter);

app.use(
  "/bookings",
  passport.authenticate("jwt", { session: false }),
  bookingsRouter
);

app.listen(3000, () => {
  console.log("Server started.");
});
