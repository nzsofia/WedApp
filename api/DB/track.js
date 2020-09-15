import mongoose from "mongoose";

function Track() {
  const Schema = mongoose.Schema;
  const trackSchema = {
    artist: String,
    title: String,
    userId: {
      type: Schema.types.ObjectId,
      ref: "user"
	}
  };

  return mongoose.model("track", trackSchema);
}

export default Track;
