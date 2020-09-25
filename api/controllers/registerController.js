import User from "../models/user.js";
import Guest from "../models/guest.js";

function register(req,res){
  console.log(req.body.fName);
  //check if there is a first name and last name in the guest database
  //if there is, and there is no userId, then he/she can register
  res.send({message: {code: 200, content: "everything ok"}});

}

export {register};
