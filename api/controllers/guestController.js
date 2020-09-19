import User from "../models/user.js"

function guestList(req,res){

    User.find({rsvp: true}, 'name', (err,users) => {
      if(!err){
        res.send({guestList: users});
      }
      else{
        console.log("Find guests was unsuccesful!");
      }
  });

  // const userItem1 = new User({
  //   name: "Németh Zsófia",
  //   email: "nemeth.zsofia1001@gmail.com",
  //   rsvp: true,
  //   allergies: "Mushroom",
  // });
  // userItem1.save();
  // const userItem2 = new User({
  //   name: "Vági Levente",
  //   email: "vagilevente@gmail.com",
  //   rsvp: true,
  //   allergies: "Plants",
  // });
  // userItem2.save();
  // const userItem3 = new User({
  //   name: "Teszt Jani",
  //   email: "janika@gmail.com",
  //   rsvp: false,
  //   allergies: "Nothing",
  // });
  // userItem3.save();
  // res.send("3 users saved");
}

export {guestList};
