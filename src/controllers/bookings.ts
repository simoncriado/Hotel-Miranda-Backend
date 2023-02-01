import { dbQuery } from "../db/connection";
import { IBooking } from "../interfaces";

export const getBookings = async (req, res, next) => {
  // Getting all bookings and making them an array
  const bookingsQuery = await dbQuery("SELECT * FROM bookings;", null);
  const bookingsArray = JSON.parse(JSON.stringify(bookingsQuery)).map((b) => b);
  const bookingsWithRoomData = [];
  // Looping throught all bookings
  for (let i = 0; i < bookingsArray.length; i++) {
    // Getting the room which is associated to that booking and extracting the room photos and room facilities. Then adding them to each booking object
    const associatedRoom = await dbQuery(
      "SELECT * FROM rooms WHERE id = ?;",
      bookingsArray[i].roomID
    );
    const parsedRoom = JSON.parse(JSON.stringify(associatedRoom));
    const photosArray = [
      parsedRoom[0].photo,
      parsedRoom[0].photoTwo,
      parsedRoom[0].photoThree,
      parsedRoom[0].photoFour,
      parsedRoom[0].photoFive,
    ];
    const facilitiesQuery = await dbQuery(
      "select facility from room_facilities_rel, roomFacilities where room_id = ? and roomFacilities.id = room_facilities_rel.facility_id",
      [parsedRoom[0].id]
    );
    const facilitiesArray = JSON.parse(JSON.stringify(facilitiesQuery)).map(
      (f) => f.facility
    );
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

export const getBooking = (req, res) => {
  const { id } = req.params;
  const singleBooking: string = `Made it to the single booking with ID ${id}`;
  res.status(200).json(singleBooking);
};

export const postBooking = (req, res) => {
  const newBooking: string = "Creating new booking";
  res.status(200).json(newBooking);
};

export const putBooking = (req, res) => {
  const { id } = req.params;
  const singleBooking: string = `Editing the booking with ID ${id}`;
  res.status(200).json(singleBooking);
};

export const deleteBooking = (req, res) => {
  const { id } = req.params;
  const singleBooking: string = `Deleting the booking with ID ${id}`;
  res.status(200).json(singleBooking);
};
