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
    fName: "Sarah",
    lName: "Smith",
    userId: null,
    plusPeopleNum: 3
  }).save();
  new Guest({
    fName: "Molly",
    lName: "Stuart",
    userId: null,
    plusPeopleNum: 2
  }).save();
  new Guest({
    fName: "Bruce",
    lName: "Willis",
    userId: null
  }).save();
  new Guest({
    fName: "John",
    lName: "Snow",
    userId: null,
    plusPeopleNum: 0
  }).save();

  res.send({
      guestList: [],
      message: {code: 200, content: "Everything ok."}
  });
}

export { guestList, makeDummy };
