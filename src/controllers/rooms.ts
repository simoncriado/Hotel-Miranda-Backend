import { dbQuery } from "../db/connection";

export const getRooms = (req, res, next) => {
  // dbQuery("INSERT INTO rooms (room_facilities)
  // VALUES
  // (select facility from room_facilities_rel, roomFacilities where room_id = 3 and roomFacilities.id = room_facilites_rel.facility_id;)
  // ")
  dbQuery("SELECT * FROM rooms;", null)
    .then((rooms): void => res.json(rooms))
    .catch((e: Error): void => next(e));
};

export const getRoom = (req, res, next): void => {
  dbQuery("SELECT * FROM rooms WHERE id = ?;", [req.params.roomId])
    .then((room): void => res.json(room))
    .catch((e: Error): void => next(e));
};

export const postRoom = () => {
  console.log("Creating a new Room");
};

export const putRoom = () => {
  console.log("Update a single Room");
};

export const deleteRoom = () => {
  console.log("Deleting Room");
};
