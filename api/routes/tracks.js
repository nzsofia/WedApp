import express from "express";
import trackList, {addTrack, changeVote} from "../controllers/trackController.js";
import {validator} from "../auth/validator.js";

const router = express.Router();

router.get("/", validator, trackList);

router.post("/", validator, addTrack);
router.post("/vote", validator, changeVote);

export default router;
