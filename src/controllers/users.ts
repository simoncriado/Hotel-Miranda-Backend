import { Request, Response, NextFunction } from "express";
import { dbQuery } from "../db/connection";
import { IUser } from "../interfaces";
import bcrypt from "bcrypt";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usersQuery: IUser | {} = await dbQuery("SELECT * FROM users;", null);

  try {
    if (JSON.parse(JSON.stringify(usersQuery)).length === 0)
      return res.status(400).json({ result: "Error fetching the users" });
    res.status(200).json(usersQuery);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userQuery: IUser | {} = await dbQuery(
    "SELECT * FROM users WHERE id = ?;",
    [parseInt(req.params.id)]
  );
  const parsedUser: IUser[] = JSON.parse(JSON.stringify(userQuery));

  try {
    if (parsedUser.length === 0)
      return res.status(400).json({ result: "Error fetching the single user" });
    res.status(200).json(parsedUser);
  } catch (error) {
    next(error);
  }
};

export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const hashedPass: string = await bcrypt
    .hash(req.body.pass, 10)
    .then((result) => result);

  const userID = Math.floor(Math.random() * 10000000);

  const newUser: IUser[] | {} = {
    userID: userID,
    photo: req.body.photo,
    name: req.body.photo,
    position: req.body.position,
    email: req.body.email,
    phone: req.body.phone,
    date: req.body.date,
    description: req.body.description,
    state: req.body.state,
    pass: hashedPass,
  };

  try {
    // Creating the room first and once it exists in the data base, we add the facilities associated to that new room
    await dbQuery("INSERT INTO users SET ?", newUser);

    res.status(201).json({ result: "User added successfully" });
  } catch (error) {
    next(error);
  }
};

export const putUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const hashedPass: string = await bcrypt
    .hash(req.body.pass, 10)
    .then((result) => result);
  const newUser: IUser[] | {} = {
    photo: req.body.photo,
    name: req.body.photo,
    position: req.body.position,
    email: req.body.email,
    phone: req.body.phone,
    date: req.body.date,
    description: req.body.description,
    state: req.body.state,
    pass: hashedPass,
  };

  try {
    await dbQuery("UPDATE users SET ? WHERE id= ?", [
      newUser,
      parseInt(req.params.id),
    ]);

    res.status(201).json({ result: "User edited successfully" });
  } catch (error) {
    next(error);
  }
};

export const putOwnUser = (req: Request, res: Response, next: NextFunction) => {
  console.log("Update your own user");
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await dbQuery("DELETE FROM users WHERE id = ?;", [parseInt(req.params.id)]);
    res.status(200).json({ result: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
