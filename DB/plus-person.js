import mongoose from "mongoose";

function PlusPerson() {
  const Schema = mongoose.Schema;
  const plusPersonSchema = {
    name: String,
    userId: {
      type: Schema.types.ObjectId,
      ref: "user"
    }
  };

  return mongoose.model("plusPerson", plusPersonSchema);
}

export default PlusPerson;
