import express from "express";
import {
  getUsers,
  getUser,
  postUser,
  putUser,
  putOwnUser,
  deleteUser,
} from "../controllers/users";

const usersRouter = express.Router();

// GET users (Read method)
usersRouter.get("/users", getUsers);

// GET single user (Read method)
usersRouter.get("/users/:id", getUser);

// POST a new user (Create method)
usersRouter.post("/newUser", postUser);

// PUT a user (Update method)
usersRouter.put("/users/:id", putUser);

// PUT your own user (Update method)
usersRouter.put("/editOwnUser", putOwnUser);

// DELETE single user (Delete method)
usersRouter.delete("/users/:id", deleteUser);

export default usersRouter;
