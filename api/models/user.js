import validator from "validator";
import mongoose from "mongoose";

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

export default mongoose.model("user",userSchema);
