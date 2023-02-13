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

export const getReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const review: IReviews = await Review.findOne({ _id: req.params.id })
    .exec()
    .catch((e: Error) => next(e));

  try {
    if (review === null) {
      return res
        .status(400)
        .json({ result: "Error fetching the single review" });
    }
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }

  await disconnect();
};

export const postReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const newReview: IReviews[] | {} = {
    date: req.body.date,
    photo: req.body.photo,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    comment: req.body.comment,
    stars: req.body.stars,
    archived: req.body.archived,
  };

  await Review.create(newReview).catch((e) => next(e));

  res.status(200).json({
    message: "Review created successfully",
  });

  await disconnect();
};

export const putReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const editedReview: IReviews[] | {} = {
    date: req.body.date,
    photo: req.body.photo,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    comment: req.body.comment,
    stars: req.body.stars,
    archived: req.body.archived,
  };

  const review: IReviews = await Review.findOneAndUpdate(
    { _id: req.params.id },
    editedReview
  )
    .exec()
    .catch((e) => next(e));

  res.status(200).json({
    message: "Review edited successfully",
    oldreview: review,
    newreview: req.body.review,
  });

  await disconnect();
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await connect();

  const review: IReviews = await Review.findOneAndDelete({ _id: req.params.id })
    .exec()
    .catch((e) => next(e));

  res.status(200).json({
    message: "Review deleted successfully",
    oldreview: review,
  });

  await disconnect();
};
