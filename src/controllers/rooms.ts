import { Request, Response, NextFunction } from "express";
import { dbQuery } from "../db/connection";
import { IRooms } from "../interfaces";
import { faker } from "@faker-js/faker";

export const getRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Getting all rooms and making them an array
  const roomsQuery: IRooms | {} = await dbQuery("SELECT * FROM rooms;", null);
  const roomsArray: IRooms[] = JSON.parse(JSON.stringify(roomsQuery)).map(
    (r) => r
  );
  const roomsArrayWithFacilities: IRooms[] = [];
  // Looping through the rooms and getting the facilities corresponding to that room
  for (let i: number = 0; i < roomsArray.length; i++) {
    const facilitiesQuery: {} = await dbQuery(
      "select facility from room_facilities_rel, roomFacilities where room_id = ? and roomFacilities.id = room_facilities_rel.facility_id",
      [roomsArray[i].id]
    );
    const facilitiesArray: string[] = JSON.parse(
      JSON.stringify(facilitiesQuery)
    ).map((f) => f.facility);
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

export const getRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Getting the facilities corresponding to the selected room and adding them to the object
  const facilitiesQuery: {} = await dbQuery(
    "select facility from room_facilities_rel, roomFacilities where room_id = ? and roomFacilities.id = room_facilities_rel.facility_id",
    [parseInt(req.params.roomId)]
  );
  const facilitiesArray: [] = JSON.parse(JSON.stringify(facilitiesQuery)).map(
    (f) => f.facility
  );
  const room: IRooms | {} = await dbQuery("SELECT * FROM rooms WHERE id = ?;", [
    parseInt(req.params.roomId),
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

export const postRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Creating the facilities associated to the room we are creating
  const roomIDS: {} = await dbQuery("SELECT id FROM rooms;", "");
  const arrayRoomsIDS: number | any = JSON.parse(JSON.stringify(roomIDS)).map(
    (id) => id.id
  );
  const facilities: {} = await dbQuery("SELECT * FROM roomFacilities;", "");
  const arrayFacilitiesID: number | any = JSON.parse(
    JSON.stringify(facilities)
  ).map((f) => f.id);

  const roomIDFacilityID: any = [];
  const randomFacilities: any = faker.helpers.arrayElements(
    arrayFacilitiesID,
    4
  );
  randomFacilities.map((f) =>
    roomIDFacilityID.push({
      facility_id: f,
      room_id: Math.max(...arrayRoomsIDS) + 1,
    })
  );

  const roomID = Math.floor(Math.random() * 10000000);

  const newRoom: IRooms[] | {} = {
    roomID: roomID,
    room_number: req.body.room_number,
    photo: req.body.photo,
    photoTwo: req.body.photoTwo,
    photoThree: req.body.photoThree,
    photoFour: req.body.photoFour,
    photoFive: req.body.photoFive,
    description: req.body.description,
    discountPercent: req.body.discountPercent,
    discount: req.body.discount,
    cancellationPolicy: req.body.cancellationPolicy,
    bed_type: req.body.bed_type,
    room_rate: req.body.room_rate,
    room_offer: req.body.room_offer,
    room_status: req.body.room_status,
  };

  try {
    // Creating the room first and once it exists in the data base, we add the facilities associated to that new room
    await dbQuery("INSERT INTO rooms SET ?", newRoom);
    roomIDFacilityID.map(async (pair) => {
      await dbQuery("INSERT INTO room_facilities_rel SET ?", {
        facility_id: pair.facility_id,
        room_id: pair.room_id,
      });
    });

    res.status(201).json({ result: "Room added successfully" });
  } catch (error) {
    next(error);
  }
};

export const putRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: GET THE CURRENT ROOM FACILITIES AND UPDATE THEM BASED ON UESR INPUT
  const room: IRooms | {} = await dbQuery("SELECT * FROM rooms WHERE id = ?;", [
    parseInt(req.params.roomId),
  ]);

  // Creating the new room from the request data and updating the room with the correct ID with the new room
  const editedRoom: IRooms[] | {} = {
    roomID: req.body.roomID,
    room_number: req.body.room_number,
    photo: req.body.photo,
    photoTwo: req.body.photoTwo,
    photoThree: req.body.photoThree,
    photoFour: req.body.photoFour,
    photoFive: req.body.photoFive,
    description: req.body.description,
    discountPercent: req.body.discountPercent,
    discount: req.body.discount,
    cancellationPolicy: req.body.cancellationPolicy,
    bed_type: req.body.bed_type,
    room_rate: req.body.room_rate,
    room_offer: req.body.room_offer,
    room_status: req.body.room_status,
  };
  try {
    await dbQuery("UPDATE rooms SET ? WHERE id = ?", [
      editedRoom,
      parseInt(req.params.roomId),
    ]);
    res.status(202).json({ result: "Room edited successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await dbQuery("DELETE FROM rooms WHERE id = ?;", [
      parseInt(req.params.roomId),
    ]);
    res.status(200).json({ result: "Room deleted successfully" });
  } catch (error) {
    next(error);
  }
};
