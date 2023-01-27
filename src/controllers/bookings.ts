import { IBooking } from "../interfaces";

export const getBookings = (req, res) => {
  const bookings: IBooking[] = [
    {
      id: 1,
      bookingID: 135478,
      userName: "Roger Waters",
      userPicture:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      orderDate: "12/06/2022, 10:00:00",
      checkIn: "2022-11-04",
      checkOut: "2022-12-01",
      specialRequest: "",
      roomType: "Single Bed",
      status: "Check Out",
    },
    {
      id: 2,
      bookingID: 3460,
      userName: "Lilly Potter",
      userPicture:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      orderDate: "12/10/2022, 10:00:00",
      checkIn: "2022-11-04",
      checkOut: "2022-12-01",
      specialRequest: "",
      roomType: "Suite",
      status: "In Progress",
    },
  ];
  res.status(200).json(bookings);
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
