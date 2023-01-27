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
usersRouter.get("/", getUsers);

// GET single user (Read method)
usersRouter.get("/:id", getUser);

// POST a new user (Create method)
usersRouter.post("/newUser", postUser);

// PUT a user (Update method)
usersRouter.put("/editUser/:id", putUser);

// PUT your own user (Update method)
usersRouter.put("/editOwnUser", putOwnUser);

// DELETE single user (Delete method)
usersRouter.delete("/:id", deleteUser);

export default usersRouter;
