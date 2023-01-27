import express from "express";
import {
  getRooms,
  getRoom,
  postRoom,
  putRoom,
  deleteRoom,
} from "../controllers/rooms";

const roomsRouter = express.Router();

// GET rooms (Read method)
roomsRouter.get("/", getRooms);

// GET single room (Read method)
roomsRouter.get("/:roomId", getRoom);

// POST a new room (Create method)
roomsRouter.post("/newRoom", postRoom);

// PUT a room (Update method)
roomsRouter.put("/editRoom/:roomId", putRoom);

// DELETE single room (Delete method)
roomsRouter.delete("/:roomId", deleteRoom);

export default roomsRouter;
