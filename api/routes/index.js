import express from "express";
import { home, saveResponse } from "../controllers/indexController.js";
import { validator } from "../auth/validator.js";

const router = express.Router();

/* GET home page. */
router.get('/', validator, home);

/* POST home page. */
router.post('/', validator, saveResponse);

export default router;
