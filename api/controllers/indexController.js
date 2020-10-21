import passport from "passport";
import Guest from "../models/guest.js";
import User from "../models/user.js";
import PlusPerson from "../models/plus-person.js";

function home(req,res){

  Guest.findOne({userId: req.user._id}, "plusPeopleNum", (err,guest) => {
    if (!err){

      User.findById(req.user._id, (userErr, user) => {
        if (!userErr){
          res.send({  rsvp: user.rsvp,
                      plusPeopleNumber: guest.plusPeopleNum,
                      message: {code: 200, content: "Everything ok."}});
        }
        else{
          res.send({  plusPeopleNumber: guest.plusPeopleNum,
                      message: {code: 200, content: "Everything ok."}});
        }
      });

    }
    else{
      res.send({message: {code: 404, content: "Guest not found!"}});
    }
  });

}

function saveResponse(req,res){
  const response = req.body;
  User.findById(req.user._id, (err, user) => {

    if (!err){
      //save reponse into user
      user.rsvp = response.rsvp === 1 ? true : false;
      user.allergies = response.allergies;

      user.save();

      //save plus People
      response.plusPeople.forEach(plusP => {
        if (plusP.fNamePP !== "" && plusP.lNamePP !== "")
          new PlusPerson({
            fName: plusP.fNamePP,
            lName: plusP.lNamePP,
            userId: user._id,
          }).save();
      });

      res.send({message: {code: 200, content: "Everything ok."}});
    }
    else res.send({message: {code: 404, content: "User not found!"}});
  });
}

export {home, saveResponse};
