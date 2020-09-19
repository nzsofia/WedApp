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

}

export {guestList};
