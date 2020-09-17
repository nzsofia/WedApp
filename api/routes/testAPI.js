import express from "express";

const router = express.Router();

router.get("/", function(req, res, next) {
  res.send("API is working properly");
});

router.post("/", function(req,res){
  res.send("API post is working too!");
});

export default router;
