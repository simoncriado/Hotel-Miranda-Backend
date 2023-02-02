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

// export const getReview = async (req, res, next) => {
//   const reviewQuery = await dbQuery("SELECT * FROM review WHERE id = ?;", [
//     req.params.id,
//   ]);
//   const parsedReview = JSON.parse(JSON.stringify(reviewQuery));

//   try {
//     if (parsedReview.length === 0)
//       return res.status(400).json({ result: "Error fetching the single review" });
//     res.status(200).json(parsedReview);
//   } catch (error) {
//     next(error);
//   }
// };

// export const postUser = () => {
//   console.log("Creating a new User");
// };

// export const putUser = () => {
//   console.log("Update a single User");
// };

// export const putOwnUser = () => {
//   console.log("Update your own user");
// };

// export const deleteUser = () => {
//   console.log("Deleting User");
// };
