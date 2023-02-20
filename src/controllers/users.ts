import { Request, Response, NextFunction } from "express";
import { connect, disconnect } from "../db/connection";
import bcrypt from "bcrypt";
import { User } from "../schemas/index";
import { IUser } from "../interfaces/index";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const users: IUser[] = await User.find()
    .exec()
    .catch((e: Error) => next(e));

  try {
    if (users.length === 0) {
      return res.status(400).json({ result: "Error fetching the users" });
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }

  await disconnect();
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const user: IUser = await User.findOne({ userID: Number(req.params.id) })
    .exec()
    .catch((e: Error) => next(e));

  try {
    if (user === null) {
      return res.status(400).json({ result: "Error fetching the single user" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }

  await disconnect();
};

export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const hashedPass: string = await bcrypt
    .hash(req.body.pass, 10)
    .then((result) => result);

  const userID = Math.floor(Math.random() * 10000000);

  const newUser: IUser[] | {} = {
    userID: userID,
    photo: req.body.photo,
    name: req.body.name,
    position: req.body.position,
    email: req.body.email,
    phone: req.body.phone,
    date: req.body.date,
    description: req.body.description,
    state: req.body.state,
    pass: hashedPass,
  };

  await User.create(newUser).catch((e) => next(e));

  res.status(200).json({
    newuser: newUser,
    message: "User created successfully",
  });

  await disconnect();
};

export const putUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const hashedPass: string = await bcrypt
    .hash(req.body.pass, 10)
    .then((result) => result);

  const editedUser: IUser[] | {} = {
    userID: req.body.userID,
    photo: req.body.photo,
    name: req.body.name,
    position: req.body.position,
    email: req.body.email,
    phone: req.body.phone,
    date: req.body.date,
    description: req.body.description,
    state: req.body.state,
    pass: hashedPass,
  };

  const user: IUser = await User.findOneAndUpdate(
    { userID: Number(req.params.id) },
    editedUser
  )
    .exec()
    .catch((e) => next(e));

  res.status(200).json({
    message: "User edited successfully",
    olduser: user,
    newuser: editedUser,
  });

  await disconnect();
};

export const putOwnUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Update your own user");
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const user: IUser = await User.findOneAndDelete({
    userID: Number(req.params.id),
  })
    .exec()
    .catch((e) => next(e));

  res.status(200).json({
    message: "User deleted successfully",
    olduser: user,
  });

  await disconnect();
};
