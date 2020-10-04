import express from "express";
import {giftList, makeDummy} from "../controllers/giftController.js";

const router = express.Router();

router.get("/", giftList);

export default router;
