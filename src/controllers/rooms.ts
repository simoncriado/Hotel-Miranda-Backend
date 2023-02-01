import { dbQuery } from "../db/connection";

export const getRooms = async (req, res, next) => {
  // Getting all rooms and making them an array
  const roomsQuery = await dbQuery("SELECT * FROM rooms;", null);
  const roomsArray = JSON.parse(JSON.stringify(roomsQuery)).map((r) => r);
  const roomsArrayWithFacilities = [];
  // Looping through the rooms and getting the facilities corresponding to that room
  for (let i = 0; i < roomsArray.length; i++) {
    const facilitiesQuery = await dbQuery(
      "select facility from room_facilities_rel, roomFacilities where room_id = ? and roomFacilities.id = room_facilities_rel.facility_id",
      [roomsArray[i].id]
    );
    const facilitiesArray = JSON.parse(JSON.stringify(facilitiesQuery)).map(
      (f) => f.facility
    );
    // Adding the facilities to each room object
    roomsArray[i]["room_facilities"] = facilitiesArray;
    roomsArrayWithFacilities.push(roomsArray[i]);
  }

  try {
    if (JSON.parse(JSON.stringify(roomsArray)).length === 0)
      return res.status(400).json({ result: "Error fetching the rooms" });
    res.status(200).json(roomsArrayWithFacilities);
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req, res, next) => {
  // Getting the facilities corresponding to the selected room and adding them to the object
  const facilitiesQuery = await dbQuery(
    "select facility from room_facilities_rel, roomFacilities where room_id = ? and roomFacilities.id = room_facilities_rel.facility_id",
    [req.params.roomId]
  );
  const facilitiesArray = JSON.parse(JSON.stringify(facilitiesQuery)).map(
    (f) => f.facility
  );
  const room = await dbQuery("SELECT * FROM rooms WHERE id = ?;", [
    req.params.roomId,
  ]);
  room[0]["room_facilities"] = facilitiesArray;

  try {
    if (JSON.parse(JSON.stringify(room)).length === 0)
      return res.status(400).json({ result: "Error fetching the room" });
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
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
