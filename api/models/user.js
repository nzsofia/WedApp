import validator from "validator";
import mongoose from "mongoose";

const userSchema = {
  fName: String,
  lName: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validator.isEmail, "invalid email"]
  },
  password: String,
  rsvp: Boolean,
  allergies: String,
  token: String,
  expiry_date: Date
};

export default mongoose.model("user",userSchema);
