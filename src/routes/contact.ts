import express from "express";
import { getContacts } from "../controllers/contact";

const contactRouter = express.Router();

// GET contact (Read method)
contactRouter.get("/contact", getContacts);

export default contactRouter;
