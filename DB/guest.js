import mongoose from "mongoose";

function Guest() {
  const Schema = mongoose.Schema;
  const guestSchema = {
    name: String,
    userId: {
      type: Schema.types.ObjectId,
      ref: "user"
    }
  };

  return mongoose.model("guest", guestSchema);
}

export default Guest;
