import express from "express";
import {giftList, reserveGift, makeDummy} from "../controllers/giftController.js";
import {validator} from "../auth/validator.js";

const router = express.Router();

router.get("/", validator, giftList);

router.post("/reserve", validator, reserveGift);

export default router;
