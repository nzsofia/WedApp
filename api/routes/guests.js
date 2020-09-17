import express from "express";

const router = express.Router();

router.get("/guest",(req,res) =>{
  res.send("Guest list");
});
