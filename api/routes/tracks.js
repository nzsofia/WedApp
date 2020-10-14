import express from "express";
import trackList, {addTrack, changeVote} from "../controllers/trackController.js";

const router = express.Router();

router.get("/", trackList);

router.post("/", addTrack);
router.post("/vote", changeVote);

export default router;
