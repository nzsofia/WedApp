import mongoose from "mongoose";

const Schema = mongoose.Schema;
const guestSchema = {
  fName: String,
  lName: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  plusPeopleNum: Number
};

export default mongoose.model("guest", guestSchema);
