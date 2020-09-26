import express from "express";
import {guestList, makeDummy} from "../controllers/guestController.js";

const router = express.Router();


router.get("/",guestList);

export default router;
