import User from "../models/user.js";
import plusPerson from "../models/plus-person.js";
import mongoose from "mongoose"; //törlendő!
import Guest from "../models/user.js"; //tölendő

function guestList(req,res){

    User.find({rsvp: true}, "fName lName", (err,users) => {

      if(!err){

        const userIds = [];
        users.forEach(user => userIds.push(user._id));

        plusPerson.find({"userId": { $in: userIds }}, (errPlus, plusPeople) => {

          if(!errPlus){
            res.send({guestList: [...users,...plusPeople]});
          }
          else{
            console.log("Find plus people was unsuccesful!");
          }

        } );

      }
      else{
        console.log("Find guests was unsuccesful!");
      }
  });

}

function makeDummy(req,res){

  // const userItem1 = new plusPerson({
  //   name: "Plusz Béla",
  //   userId: mongoose.Types.ObjectId("5f661a7cb554511864caa1e3")
  // });
  // userItem1.save();
  // const userItem2 = new plusPerson({
  //   name: "Plusz Győző",
  //   userId: mongoose.Types.ObjectId("5f661a7cb554511864caa1e3")
  // });
  // userItem2.save();
  // const userItem3 = new plusPerson({
  //   name: "Plusz Tóni",
  //   userId: mongoose.Types.ObjectId("5f661a7cb554511864caa1e4")
  // });
  // userItem3.save();
  // const userItem4 = new plusPerson({
  //   name: "Plusz János",
  //   userId: mongoose.Types.ObjectId("5f661a7cb554511864caa1e5")
  // });
  // userItem4.save();
  // res.send("Plus people saved");

  const guest1 = new Guest({
    fName: "Gábor",
    lName: "Németh",
    userId: null
  });
  guest1.save();
  res.send({guestList: [guest1]});

}

export {guestList, makeDummy};
