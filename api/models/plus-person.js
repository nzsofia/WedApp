import mongoose from "mongoose";

const Schema = mongoose.Schema;
const plusPersonSchema = {
    fName: String,
    lName: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
};

export default mongoose.model("plusPerson", plusPersonSchema);
