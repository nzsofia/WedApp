import WeddingGift from "../models/wedding-gift.js";
import passport from "passport";

function giftList(req, res) {
  WeddingGift.find({}, (err, gifts) => {
    if (!err) {
      res.send({giftList: gifts,
                message: {code: 200, content: "Everything ok."}});
    } else {
      console.log("[giftList] Finding gifts was unsuccessful!");
      res.send({message: {code: 500, content: "Finding gifts was unsuccessful!"}});
    }
  });
}

function reserveGift(req, res) {
  WeddingGift.findById(req.body.giftId, (err, gift) => {
    if (!err) {

      const userId = req.user._id;
      if (!gift.userId) {
        gift.userId = userId;
        gift.save();
        res.send({message: {code: 200, content: "Gift reserved!"}});
      } else {
        console.log("[reserveGift] Gift with id " + gift._id + " is already reserved.");
        res.send({message: {code: 500, content: "The selected gift is already reserved!"}});
      }

    } else {
      console.log("[reserveGift] Gift reservation was unsuccessful!");
      res.send({message: {code: 500, content: "Gift reservation was unsuccessful!"}});
    }
  });
}

function makeDummy(req, res) {
  new WeddingGift({
    name: "Cute Puppy",
    description: "A cute Border Collie puppy for Zsófi.",
    imgURL: "https://www.animalfactsencyclopedia.com/images/315xNxborder-collie-puppy.jpg.pagespeed.ic.dMdaUHC-d-.jpg"
  }).save();
  new WeddingGift({
    name: "DJI Mavic Air Quadrocopter",
    description: "A drone for Levi.",
    imgURL: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6194/6194019_sd.jpg"
  }).save();
  res.send({message: {code: 200, content: "Example gifts saved!"}});
}

export { giftList, reserveGift, makeDummy };
