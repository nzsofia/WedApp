import mongoose from "mongoose";

const Schema = mongoose.Schema;
const weddingGiftSchema = {
    name: String,
    description: String,
    imgURL: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
};

export default mongoose.model("weddingGift", weddingGiftSchema);
