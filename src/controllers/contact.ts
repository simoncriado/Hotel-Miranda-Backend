import { Request, Response, NextFunction } from "express";
import { connect, disconnect } from "../db/connection";
import { Review } from "../schemas/index";
import { IReviews } from "../interfaces/index";

// FOLLOW THE CRUD PATTERN. ADD GET ONE, EDIT, CREATE AND DELETE

export const getContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const reviews: IReviews[] = await Review.find()
    .exec()
    .catch((e: Error) => next(e));

  try {
    if (reviews.length === 0) {
      return res.status(400).json({ result: "Error fetching the reviews" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }

  await disconnect();
};
