import express from "express";
import {
  getContacts,
  getReview,
  postReview,
  putReview,
  deleteReview,
} from "../controllers/contact";

const contactRouter = express.Router();

// GET contact (Read method)
contactRouter.get("/", getContacts);

// GET single review (Read method)
contactRouter.get("/:id", getReview);

// POST a new review (Create method)
contactRouter.post("/newReview", postReview);

// PUT a review (Update method)
contactRouter.put("/editReview/:id", putReview);

// DELETE single review (Delete method)
contactRouter.delete("/:id", deleteReview);

export default contactRouter;
