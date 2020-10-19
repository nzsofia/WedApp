import express from "express";
import {home} from "../controllers/indexController.js";
import {validator} from "../auth/validator.js";

const router = express.Router();

/* GET home page. */
router.get('/', validator, home);

export default router;
