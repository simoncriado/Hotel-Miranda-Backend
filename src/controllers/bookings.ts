import { Request, Response, NextFunction } from "express";
import { dbQuery } from "../db/connection";
import { IBooking, IRooms } from "../interfaces";
import { faker } from "@faker-js/faker";

export const getBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Getting all bookings and making them an array
  const bookingsQuery: IBooking | {} = await dbQuery(
    "SELECT * FROM bookings;",
    null
  );
  const bookingsArray: IBooking[] = JSON.parse(
    JSON.stringify(bookingsQuery)
  ).map((b: IBooking) => b);
  const bookingsWithRoomData: IBooking[] = [];
  // Looping throught all bookings
  for (let i: number = 0; i < bookingsArray.length; i++) {
    // Getting the room which is associated to that booking and extracting the room photos and room facilities. Then adding them to each booking object
    const associatedRoom: IRooms | {} = await dbQuery(
      "SELECT * FROM rooms WHERE id = ?;",
      bookingsArray[i].roomID
    );
    const parsedRoom: IRooms = JSON.parse(JSON.stringify(associatedRoom));
    const photosArray: string[] = [
      parsedRoom[0].photo,
      parsedRoom[0].photoTwo,
      parsedRoom[0].photoThree,
      parsedRoom[0].photoFour,
      parsedRoom[0].photoFive,
    ];
    const facilitiesQuery: string[] | {} = await dbQuery(
      "select facility from room_facilities_rel, roomFacilities where room_id = ? and roomFacilities.id = room_facilities_rel.facility_id",
      [parsedRoom[0].id]
    );
    const facilitiesArray: string[] = JSON.parse(
      JSON.stringify(facilitiesQuery)
    ).map((f: any) => f.facility);
    bookingsArray[i]["roomFacilities"] = facilitiesArray;
    bookingsArray[i]["roomPhotos"] = photosArray;
    bookingsWithRoomData.push(bookingsArray[i]);
  }
  try {
    if (JSON.parse(JSON.stringify(bookingsArray)).length === 0)
      return res.status(400).json({ result: "Error fetching the bookings" });
    res.status(200).json(bookingsWithRoomData);
  } catch (error) {
    next(error);
  }
};

export const getBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Getting the right booking
  const bookingQuery: IBooking[] | {} = await dbQuery(
    "SELECT * FROM bookings WHERE id = ?;",
    [parseInt(req.params.bookingId)]
  );
  const parsedBooking: IBooking[] = JSON.parse(JSON.stringify(bookingQuery));
  // Finding the room that is associated to that booking. Extracting the photos and facilities and adding them to the booking
  const associatedRoom: IRooms | {} = await dbQuery(
    "SELECT * FROM rooms WHERE id = ?;",
    parsedBooking[0].roomID
  );
  const parsedRoom: IRooms = JSON.parse(JSON.stringify(associatedRoom));
  const photosArray: string[] = [
    parsedRoom[0].photo,
    parsedRoom[0].photoTwo,
    parsedRoom[0].photoThree,
    parsedRoom[0].photoFour,
    parsedRoom[0].photoFive,
  ];
  const facilitiesQuery: {} = await dbQuery(
    "select facility from room_facilities_rel, roomFacilities where room_id = ? and roomFacilities.id = room_facilities_rel.facility_id",
    [parsedRoom[0].id]
  );
  const facilitiesArray: string[] = JSON.parse(
    JSON.stringify(facilitiesQuery)
  ).map((f) => f.facility);
  parsedBooking[0]["roomFacilities"] = facilitiesArray;
  parsedBooking[0]["roomPhotos"] = photosArray;

  try {
    if (parsedBooking.length === 0)
      return res
        .status(400)
        .json({ result: "Error fetching the single booking" });
    res.status(200).json(parsedBooking);
  } catch (error) {
    next(error);
  }
};

export const postBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Getting all rooms where the bed type is equal to the bed type the user selected. Then picking a random room from that array
  // Here I would check for bedType, availability between checkin and checkout
  const rooms: IRooms | {} = await dbQuery(
    "SELECT * FROM rooms WHERE bed_type = ?;",
    req.body.roomType
  );
  const roomsArray: IRooms[] = JSON.parse(JSON.stringify(rooms));
  const randomRoom: IRooms = faker.helpers.arrayElement(roomsArray);

  const bookingID = Math.floor(Math.random() * 10000000);

  // Creating the new booking from the request data
  const newBooking = {
    bookingID: bookingID,
    ...req.body,
    orderDate: faker.date.between("", ""),
    roomID: randomRoom.id,
    roomType: randomRoom.bed_type,
    roomNumber: randomRoom.room_number,
    roomRate: randomRoom.room_rate,
  };

  try {
    await dbQuery("INSERT INTO bookings SET ?", newBooking);

    res.status(201).json({ result: "Booking added successfully" });
  } catch (error) {
    next(error);
  }
};

export const putBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Creating the new booking from the request data and updating the booking with the correct ID with the new booking
  const editedBooking: IBooking[] | {} = {
    bookingID: req.body.bookingID,
    userName: req.body.userName,
    userPicture: req.body.userPicture,
    orderDate: req.body.orderDate,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    specialRequest: req.body.specialRequest,
    roomID: req.body.roomID,
    roomType: req.body.roomType,
    roomNumber: req.body.roomNumber,
    roomRate: req.body.roomRate,
    status: req.body.status,
  };
  try {
    await dbQuery("UPDATE bookings SET ? WHERE id = ?", [
      editedBooking,
      parseInt(req.params.bookingId),
    ]);
    res.status(202).json({ result: "Booking edited successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await dbQuery("DELETE FROM bookings WHERE id = ?;", [
      parseInt(req.params.bookingId),
    ]);
    res.status(200).json({ result: "Booking deleted successfully" });
  } catch (error) {
    next(error);
  }
};
