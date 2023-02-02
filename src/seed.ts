import connection, { dbQuery } from "./db/connection";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { IBooking, IRooms, IReviews, IUser } from "./interfaces/index";

run();

async function run() {
  await connection.connect();
  //   await insertFacilities();
  //   await insertRoomFacilitiesRel();
  //   await insertRooms(20);
  //   await insertBookings(20);
  //   await insertUsers(20);
  //   await insertReviews(20);
  await connection.end();
}

// ROOMS RELATED CODE
async function insertRooms(number: number): Promise<void> {
  // THIS LINE IS ONLY FOR TESTING PURPOSES. IT DELETES THE PREVIOUS ROOMS STORED IN THE TABLE SO THAT WE DO NOT GET TOO MANY ROOMS. IT ALSO RESETS THE ID COUNT TO 1.
  await dbQuery("DELETE FROM rooms", "");
  await dbQuery("ALTER TABLE rooms AUTO_INCREMENT = 1", "");

  for (let i = 0; i < number; i++) {
    const room: IRooms | any = await setRandomRoom();
    await dbQuery("INSERT INTO rooms SET ?", room);
  }
}

async function setRandomRoom() {
  const roomPictures: string[] = [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjByb29tfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWwlMjByb29tfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8OHx8aG90ZWwlMjByb29tfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1568495248636-6432b97bd949?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsJTIwcm9vbXxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdGVsJTIwcm9vbXxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsJTIwcm9vbXxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1540304453527-62f979142a17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGhvdGVsJTIwcm9vbXxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1525905708812-b271b5e3b2f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fGhvdGVsJTIwcm9vbXxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60",
  ];

  const roomRate: number = faker.datatype.number({ max: 100000 });
  const isOffer: string = faker.helpers.arrayElement(["Yes", "No"]);
  let discountPercent: number = 0;
  if (isOffer === "Yes") {
    discountPercent = faker.datatype.number({
      min: 0,
      max: 80,
    });
  } else {
    discountPercent = 0;
  }
  let roomOffer: number = null;
  if (isOffer === "Yes") {
    roomOffer = roomRate - (discountPercent * roomRate) / 100;
  } else {
    roomOffer = null;
  }

  return await {
    room_number: faker.datatype.number({ min: 10, max: 1000 }),
    photo: faker.helpers.arrayElement(roomPictures),
    photoTwo: faker.helpers.arrayElement(roomPictures),
    photoThree: faker.helpers.arrayElement(roomPictures),
    photoFour: faker.helpers.arrayElement(roomPictures),
    photoFive: faker.helpers.arrayElement(roomPictures),
    description: faker.lorem.lines(3),
    discountPercent: discountPercent,
    discount: isOffer,
    cancellationPolicy: faker.lorem.lines(3),
    bed_type: faker.helpers.arrayElement([
      "Single Bed",
      "Double Bed",
      "Double Superior",
      "Suite",
    ]),
    room_rate: roomRate,
    room_offer: roomOffer,
    room_status: faker.helpers.arrayElement(["Available", "Booked"]),
  };
}

// ROOM FACILITIES RELATED CODE
async function insertFacilities(): Promise<void> {
  // THIS LINE IS ONLY FOR TESTING PURPOSES. IT DELETES THE PREVIOUS FACILITIES STORED IN THE TABLE SO THAT WE DO NOT GET TOO MANY FACILITIES. IT ALSO RESETS THE ID COUNT TO 1.
  await dbQuery("DELETE FROM roomFacilities", "");
  await dbQuery("ALTER TABLE roomFacilities AUTO_INCREMENT = 1", "");

  const facilities: string[] = [
    "Air Conditioner",
    "Kitchen",
    "Grocery",
    "Towels",
    "Smart Security",
    "High speed WiFi",
    "Cleaning",
    "Single Bed",
    "24/7 Online Support",
    "Expert Team",
    "Breakfast",
    "Shower",
    "Shop near",
    "Strong locker",
  ];
  for (let i = 0; i < facilities.length; i++) {
    await dbQuery("INSERT INTO roomFacilities SET ?", {
      facility: facilities[i],
    });
  }
}

async function insertRoomFacilitiesRel(): Promise<void> {
  //   THIS LINE IS ONLY FOR TESTING PURPOSES. IT DELETES THE PREVIOUS ROOMFACILITIESREL STORED IN THE TABLE SO THAT WE DO NOT GET TOO MANY ROOMFACILITIESREL
  await dbQuery("DELETE FROM room_facilities_rel", "");

  const rooms: IRooms | {} = await dbQuery("SELECT * FROM rooms;", "");
  const roomsArray: IRooms[] = JSON.parse(JSON.stringify(rooms));

  const facilities: {} = await dbQuery("SELECT * FROM roomFacilities;", "");
  const arrayFacilitiesID: number | any = JSON.parse(
    JSON.stringify(facilities)
  ).map((f) => f.id);

  const roomIDFacilityID: any = [];
  for (let i = 0; i < roomsArray.length; i++) {
    const randomFacilities: any = faker.helpers.arrayElements(
      arrayFacilitiesID,
      4
    );
    randomFacilities.map((f) =>
      roomIDFacilityID.push({ facility_id: f, room_id: roomsArray[i].id })
    );
  }
  roomIDFacilityID.map(async (pair) => {
    await dbQuery("INSERT INTO room_facilities_rel SET ?", {
      facility_id: pair.facility_id,
      room_id: pair.room_id,
    });
  });
}

// BOOKINGS RELATED CODE
async function insertBookings(number: number): Promise<void> {
  // THIS LINE IS ONLY FOR TESTING PURPOSES. IT DELETES THE PREVIOUS BOOKINGS STORED IN THE TABLE SO THAT WE DO NOT GET TOO MANY BOOKINGS. IT ALSO RESETS THE ID COUNT TO 1.
  await dbQuery("DELETE FROM bookings", "");
  await dbQuery("ALTER TABLE bookings AUTO_INCREMENT = 1", "");

  for (let i = 0; i < number; i++) {
    const booking: IBooking = await setRandomBooking();
    await dbQuery("INSERT INTO bookings SET ?", booking);
  }
}

async function setRandomBooking() {
  const orderDate: Date = faker.date.between("2022-01-01", "2023-12-12");
  const checkIn: Date = faker.date.between(orderDate, "2023-12-12");
  const checkOut: Date = faker.date.between(checkIn, "2023-12-12");

  const rooms: IRooms | {} = await dbQuery("SELECT * FROM rooms;", "");
  const roomsArray: IRooms[] = JSON.parse(JSON.stringify(rooms));
  const randomNumber: number = Math.floor(Math.random() * 20);
  const randomRoom: IRooms = roomsArray[randomNumber];

  return await {
    bookingID: faker.datatype.number({ min: 1, max: 99999 }),
    userName: faker.name.fullName(),
    userPicture: faker.image.people(1920, 1080, true),
    orderDate: orderDate,
    checkIn: checkIn,
    checkOut: checkOut,
    specialRequest: faker.helpers.arrayElement([
      "I would need a second pillow, thank you!",
      "We are travelling with our dog, can we get a dog-bed in the room so that our dos feels like at home?",
      "Mountain view please",
      "We need an extra bed in the room please. My cousin is finally joining our trip",
      "Silent part of the hotel please. I cannot sleep if there is any noise in the room",
    ]),
    roomID: randomRoom.id,
    roomType: randomRoom.bed_type,
    roomNumber: randomRoom.room_number,
    roomRate: randomRoom.room_rate,
    status: faker.helpers.arrayElement([
      "Check In",
      "Check Out",
      "In Progress",
    ]),
  };
}

// USERS RELATED CODE
async function insertUsers(number: number): Promise<void> {
  // THIS LINE IS ONLY FOR TESTING PURPOSES. IT DELETES THE PREVIOUS BOOKINGS STORED IN THE TABLE SO THAT WE DO NOT GET TOO MANY BOOKINGS. IT ALSO RESETS THE ID COUNT TO 1.
  await dbQuery("DELETE FROM users", "");
  await dbQuery("ALTER TABLE users AUTO_INCREMENT = 1", "");
  for (let i = 0; i < number; i++) {
    const user: IUser | {} = await setRandomUser();
    await dbQuery("INSERT INTO users SET ?", user);
  }
}

async function setRandomUser() {
  const userPictures: string[] = [
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  ];

  return await {
    photo: faker.helpers.arrayElement(userPictures),
    name: faker.name.fullName(),
    position: faker.helpers.arrayElement([
      "Room Service",
      "Manager",
      "Reception",
    ]),
    email: faker.internet.email(),
    phone: faker.phone.number("+## ## ### ## ##"),
    date: faker.date.between("2022-01-01", "2023-12-12"),
    description: faker.lorem.lines(4),
    state: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
    pass: await getHashPass(faker.internet.password()),
  };
}

async function getHashPass(pass: string): Promise<string> {
  return await bcrypt.hash(pass, 10).then((result) => result);
}

// REVIEWS RELATED CODE
async function insertReviews(number: number): Promise<void> {
  // THIS LINE IS ONLY FOR TESTING PURPOSES. IT DELETES THE PREVIOUS REVIEWS STORED IN THE TABLE SO THAT WE DO NOT GET TOO MANY REVIEWS. IT ALSO RESETS THE ID COUNT TO 1.
  await dbQuery("DELETE FROM reviews", "");
  await dbQuery("ALTER TABLE reviews AUTO_INCREMENT = 1", "");

  for (let i = 0; i < number; i++) {
    const review: IReviews | {} = await setRandomReviews();
    await dbQuery("INSERT INTO reviews SET ?", review);
  }
}

async function setRandomReviews() {
  return await {
    date: faker.date.between("2022-01-01", "2023-12-12"),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number("+## ## ### ## ##"),
    comment: faker.random.words(30),
    stars: faker.datatype.number({ min: 0, max: 5 }),
    archived: faker.datatype.boolean(),
  };
}
