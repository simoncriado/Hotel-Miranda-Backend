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

  const user: IUser = await User.findOne({ _id: req.params.id })
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

  await User.create(newUser).catch((e) => next(e));

  res.status(200).json({
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

  const user: IUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    editedUser
  )
    .exec()
    .catch((e) => next(e));

  res.status(200).json({
    message: "User edited successfully",
    olduser: user,
    newuser: req.body.user,
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
  const user: IUser = await User.findOneAndDelete({ _id: req.params.id })
    .exec()
    .catch((e) => next(e));

  res.status(200).json({
    message: "User deleted successfully",
    olduser: user,
  });

  await disconnect();
};
