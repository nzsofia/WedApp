import User from "../models/user.js";
import plusPerson from "../models/plus-person.js";
import mongoose from "mongoose"; //törlendő!

function guestList(req, res) {

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

function makeDummy(req, res) {

  const userItem1 = new User({
    name: "Vági Levente",
    email: "vagilevente@gmail.com",
    rsvp: true
  });
  userItem1.save((err, user) => {
    new plusPerson({
      name: "Plusz Béla",
      userId: mongoose.Types.ObjectId(user.id)
    }).save();
  });

  const userItem2 = new User({
    name: "Németh Zsófi",
    email: "nemeth.zsofia1001@gmail.com",
    rsvp: true
  });
  userItem2.save((err, user) => {
    new plusPerson({
      name: "Plusz Győző",
      userId: mongoose.Types.ObjectId(user.id)
    }).save();
  });

  const userItem3 = new User({
    name: "Bruce Willis",
    email: "bruce.willis@gmail.com",
    rsvp: false
  });
  userItem3.save((err, user) => {
    new plusPerson({
      name: "Plusz Tóni",
      userId: mongoose.Types.ObjectId(user.id)
    }).save();
  });

  const userItem4 = new User({
    name: "Mitya",
    email: "mitya@gmail.com",
    rsvp: null
  });
  userItem4.save((err, user) => {
    new plusPerson({
      name: "Plusz Bia",
      userId: mongoose.Types.ObjectId(user.id)
    }).save();
  });

  res.send("Users and Plus people saved");

}

export { guestList, makeDummy };
