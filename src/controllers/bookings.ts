export const getBookings = (req, res) => {
  const bookings = "Made it to the list of bookings";
  res.status(200).json(bookings);
};

export const getBooking = (req, res) => {
  const singleBooking = "Made it to the single booking";
  res.status(200).json(singleBooking);
};

export const postBooking = () => {
  console.log("Creating a new booking");
};

export const putBooking = () => {
  console.log("Update a single booking");
};

export const deleteBooking = () => {
  console.log("Deleting booking");
};
