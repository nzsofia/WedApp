import User from "../models/user.js";
import Guest from "../models/guest.js";

function register(req,res){

  const userCandidate = req.body;

  //check if there is a first name and last name in the guest database
  //if there is, and there is no userId, then he/she can register
  Guest.findOne({fName: userCandidate.fName, lName: userCandidate.lName}, "userId", (err, guest) => {

    if (!err && guest){

      if(guest.userId === null){

        console.log("Guest found and user does not exist.");
        const newUser = new User({
          fName: userCandidate.fName,
          lName: userCandidate.lName,
          email: userCandidate.email,
          password: userCandidate.password
        });
        newUser.save();

        console.log(newUser._id);
        //save userId into guest
        guest.userId = newUser._id;
        guest.save();

        res.send({message: {code: 200, content: "Everything ok."}});
      }
      else{
        console.log("Guest found but user already exist");
        res.send({message: {code: 400, content: "You already registered."}});
      }
    }
    else{
      console.log("Guest not found");
      res.send({message: {code: 404, content: "Sorry, you are not authorized to register."}});
    }
  });

}

export {register};
