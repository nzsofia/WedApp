import express from "express";
import {giftList, reserveGift, makeDummy} from "../controllers/giftController.js";

const router = express.Router();

router.get("/", giftList);

router.post("/reserve", reserveGift);

export default router;
