import validator from "validator";
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  rsvp: Boolean,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validator.isEmail, "invalid email"]
  },
  allergies: String,
  token: String,
  expiry_date: Date
});

userSchema.plugin(passportLocalMongoose);

export default mongoose.model("user", userSchema);
