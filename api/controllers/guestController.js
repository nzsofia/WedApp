import User from "../models/user.js";
import plusPerson from "../models/plus-person.js";
import Guest from "../models/guest.js";

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

  new Guest({
    fName: "Levente",
    lName: "Vági",
    userId: null
  }).save();
  new Guest({
    fName: "Zsófi",
    lName: "Németh",
    userId: null
  }).save();
  new Guest({
    fName: "Bruce",
    lName: "Willis",
    userId: null
  }).save();
  new Guest({
    fName: "Mitya",
    lName: "Vághy",
    userId: null
  }).save();

  res.send("Guests saved");

}

export { guestList, makeDummy };
