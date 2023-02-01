-- Delete table
DROP TABLE tableName;

-- Create table bookings
CREATE TABLE bookings (
id INT NOT NULL AUTO_INCREMENT, 
bookingID INT NOT NULL, 
userName VARCHAR(255) NOT NULL, 
userPicture VARCHAR(500) NOT NULL, 
orderDate VARCHAR(100) NOT NULL, 
checkIn VARCHAR(100) NOT NULL, 
checkOut VARCHAR(100) NOT NULL, 
specialRequest VARCHAR(500), 
roomID INT NOT NULL,
roomType VARCHAR(50) NOT NULL, 
roomNumber SMALLINT NOT NULL,
roomRate INT NOT NULL,
status varchar(45) NOT NULL, 
PRIMARY KEY (id));

-- Create table rooms
CREATE TABLE rooms (
id INT NOT NULL AUTO_INCREMENT,
room_number SMALLINT NOT NULL,
photo VARCHAR(500) NOT NULL,
photoTwo VARCHAR(500), 
photoThree VARCHAR(500), 
photoFour VARCHAR(500), 
photoFive VARCHAR(500), 
description VARCHAR(500),
discountPercent INT,
discount VARCHAR(10) NOT NULL,
cancellationPolicy VARCHAR(500),
bed_type VARCHAR(50) NOT NULL,
room_rate INT NOT NULL,
room_offer INT,
room_status VARCHAR(50) NOT NULL,
PRIMARY KEY (id));

-- Create table users
CREATE TABLE users (
id INT NOT NULL AUTO_INCREMENT, 
photo VARCHAR(500) NOT NULL, 
name VARCHAR(255) NOT NULL, 
position VARCHAR(50) NOT NULL, 
email VARCHAR(255) NOT NULL, 
phone VARCHAR(50) NOT NULL, 
date VARCHAR(100) NOT NULL, 
description VARCHAR(500), 
state VARCHAR(50) NOT NULL, 
pass VARCHAR(255) NOT NULL, 
PRIMARY KEY (id)
);

-- Create table room facilities
CREATE TABLE roomFacilities (
id INT NOT NULL AUTO_INCREMENT, 
facility VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
);

-- Create table room_facilites_rel
CREATE TABLE room_facilities_rel (
    facility_id INT,
    room_id INT,
    FOREIGN KEY (facility_id) references roomFacilities(id),
    FOREIGN KEY (room_id) references rooms(id)
);

