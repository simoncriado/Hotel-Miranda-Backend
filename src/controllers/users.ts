import { Request, Response, NextFunction } from "express";
import { dbQuery } from "../db/connection";
import { IUser } from "../interfaces";

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

export const postUser = (req: Request, res: Response, next: NextFunction) => {
  console.log("Creating a new User");
};

export const putUser = (req: Request, res: Response, next: NextFunction) => {
  console.log("Update a single User");
};

export const putOwnUser = (req: Request, res: Response, next: NextFunction) => {
  console.log("Update your own user");
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  console.log("Deleting User");
};
