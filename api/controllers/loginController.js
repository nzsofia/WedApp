import User from "../models/user.js";

function login(req,res){

  const userCandidate = req.body;

  //check if the email address - password pair exist in the database
  User.findOne({email: userCandidate.email, password: userCandidate.password}, (err, user) => {
    if(!err && user){
      res.send({message: {code: 200, content: ""}});
    }
    else{
      res.send({message: {code: 404, content: "Email address or password incorrect. Please try again!"}});
    }
  });


}

export {login};
