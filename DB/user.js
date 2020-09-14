//const validator = require("validator");
//const mongoose = require("mongoose");
import validator from "validator"
import mongoose from "mongoose"

function User(){
  const userSchema = {
    name: String,
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validator.isEmail, "invalid email"]
    },
    rsvp: Boolean,
    allergies: String,
    token: String,
    expiry_date: Date
  };

  return mongoose.model("user",userSchema);
}

function testThis(){
  return "It works!";
}
function test2(){
  return "It works 2!";
}

export default testThis;
export {test2};
