import express from "express";
import { validator } from "../auth/validator.js";
import passport from "passport";

const router = express.Router();

/* GET logout page. */
router.get('/', validator, function (req,res) {
  req.logout();
  res.send({message: {code: 200, content: "Everything ok!"}});
});

export default router;
