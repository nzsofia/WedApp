import mongoose from "mongoose";

const Schema = mongoose.Schema;
const trackSchema = {
    artist: String,
    title: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
};

export default mongoose.model("track", trackSchema);
