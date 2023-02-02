import { Request, Response, NextFunction } from "express";
import { dbQuery } from "../db/connection";
import { IBooking, IRooms } from "../interfaces";

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
  const bookingQuery: IBooking[] | {} = await dbQuery(
    "SELECT * FROM bookings WHERE id = ?;",
    [parseInt(req.params.bookingId)]
  );
  const parsedBooking: IBooking[] = JSON.parse(JSON.stringify(bookingQuery));
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

export const postBooking = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newBooking: string = "Creating new booking";
  res.status(200).json(newBooking);
};

export const putBooking = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const singleBooking: string = `Editing the booking with ID ${id}`;
  res.status(200).json(singleBooking);
};

export const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await dbQuery("DELETE * FROM bookings WHERE id = ?;", [
      parseInt(req.params.bookingId),
    ]);
    res.status(200).json({ result: "Booking deleted successfully" });
  } catch (error) {
    next(error);
  }
};
