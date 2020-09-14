import mongoose from "mongoose";

function WeddingGift(){
  const Schema = mongoose.Schema;
  const weddingGiftSchema = {
    name: String,
    description: String,
    imgURL: String,
    userId: {
      type: Schema.types.ObjectId,
      ref: "user"
    }
  }

  return mongoose.model("weddingGift", weddingGiftSchema);
}

export default WeddingGift;
