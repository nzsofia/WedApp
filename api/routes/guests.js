import express from "express";
import { guestList, makeDummy } from "../controllers/guestController.js";
import {validator} from "../auth/validator.js";

const router = express.Router();

router.get("/", validator, guestList);

export default router;
