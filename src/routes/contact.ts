import express from "express";
import { getContacts } from "../controllers/contact";

const contactRouter = express.Router();

// GET contact (Read method)
contactRouter.get("/", getContacts);

export default contactRouter;
