import mongoose from "mongoose";

const Schema = mongoose.Schema;
const guestSchema = {
  name: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
};

export default mongoose.model("guest", guestSchema);;