import User from "../models/user.js";
import PlusPerson from "../models/plus-person.js";
import Guest from "../models/guest.js";

function guestList(req, res) {

  User.find({rsvp: true}, "fName lName", (err, users) => {

    if(!err){

      const userIds = [];
      users.forEach(user => userIds.push(user._id));

      PlusPerson.find({"userId": { $in: userIds }}, (errPlus, plusPeople) => {

        if(!errPlus) {
          res.send({
              guestList: [...users,...plusPeople],
              message: {code: 200, content: "Everything ok."}
          });
        }
        else {
          console.log("[guestList] Find plus people was unsuccesful!");
          res.send({message: {code: 404, content: "Plus person not found!"}});
        }

      });

    }
    else {
      console.log("[guestList] Find guests was unsuccesful!");
      res.send({message: {code: 404, content: "Guest not found!"}});
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
