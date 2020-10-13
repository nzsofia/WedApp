import User from "../models/user.js";
import passport from "passport";

function home(req,res){

  //check if user is authenticated
  if (req.user){ //req.isAuthenticated() also works
    console.log("User is logged in.");
    res.send({message: {code: 200, content: "Everything ok."}});
  }
  else{
    console.log("User is not logged in.");
    res.send({message: {code: 401, content: "You are not logged in."}});
  }
}

export {home};
