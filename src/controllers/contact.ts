import { Request, Response, NextFunction } from "express";
import { connect, disconnect } from "../db/connection";
import { Review } from "../schemas/index";
import { IReviews } from "../interfaces/index";

export const getContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const reviews: IReviews[] = await Review.find()
    .exec()
    .catch((e: Error) => next(e));

  res.json(reviews);

  await disconnect();
};
