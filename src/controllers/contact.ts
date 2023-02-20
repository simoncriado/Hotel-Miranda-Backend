import { Request, Response, NextFunction } from "express";
import { dbQuery } from "../db/connection";
import { IReviews } from "../interfaces";

export const getReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reviewsQuery: IReviews | {} = await dbQuery(
    "SELECT * FROM reviews;",
    null
  );

  try {
    if (JSON.parse(JSON.stringify(reviewsQuery)).length === 0)
      return res.status(400).json({ result: "Error fetching the reviews" });
    res.status(200).json(reviewsQuery);
  } catch (error) {
    next(error);
  }
};

export const getReview = async (req, res, next) => {
  const reviewQuery = await dbQuery("SELECT * FROM review WHERE id = ?;", [
    parseInt(req.params.id),
  ]);
  const parsedReview = JSON.parse(JSON.stringify(reviewQuery));

  try {
    if (parsedReview.length === 0)
      return res
        .status(400)
        .json({ result: "Error fetching the single review" });
    res.status(200).json(parsedReview);
  } catch (error) {
    next(error);
  }
};

export const postReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reviewID = Math.floor(Math.random() * 10000000);

  const newReview: IReviews[] | {} = {
    reviewID: reviewID,
    date: req.body.date,
    photo: req.body.photo,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    comment: req.body.comment,
    stars: req.body.stars,
    archived: req.body.archived,
  };

  try {
    await dbQuery("INSERT INTO reviews SET ?", newReview);

    res.status(201).json({ result: "Review added successfully" });
  } catch (error) {
    next(error);
  }
};

export const putReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const editedReview: IReviews[] | {} = {
    reviewID: req.body.reviewID,
    date: req.body.date,
    photo: req.body.photo,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    comment: req.body.comment,
    stars: req.body.stars,
    archived: req.body.archived,
  };

  try {
    await dbQuery("UPDATE reviews SET ? WHERE id= ?", [
      editedReview,
      parseInt(req.params.id),
    ]);

    res.status(201).json({ result: "Review edited successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await dbQuery("DELETE FROM reviews WHERE id = ?;", [
      parseInt(req.params.id),
    ]);
    res.status(200).json({ result: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};
