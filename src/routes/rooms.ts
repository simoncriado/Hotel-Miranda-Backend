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
roomsRouter.get("/rooms", getRooms);

// GET single room (Read method)
roomsRouter.get("/rooms/:roomId", getRoom);

// POST a new room (Create method)
roomsRouter.post("/newRoom", postRoom);

// PUT a room (Update method)
roomsRouter.put("/rooms/:roomId", putRoom);

// DELETE single room (Delete method)
roomsRouter.delete("/rooms/:roomId", deleteRoom);

export default roomsRouter;
