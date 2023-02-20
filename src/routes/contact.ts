import express from "express";
import {
  getReviews,
  getReview,
  postReview,
  putReview,
  deleteReview,
} from "../controllers/contact";

const reviewsRouter = express.Router();

// GET reviews (Read method)
reviewsRouter.get("/", getReviews);

// GET single review (Read method)
reviewsRouter.get("/:id", getReview);

// POST a new review (Create method)
reviewsRouter.post("/newReview", postReview);

// PUT a review (Update method)
reviewsRouter.put("/editReview/:id", putReview);

// DELETE single review (Delete method)
reviewsRouter.delete("/:id", deleteReview);

export default reviewsRouter;
