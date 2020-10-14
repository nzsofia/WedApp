import WeddingGift from "../models/wedding-gift.js";

function giftList(req, res) {
  WeddingGift.find({}, (err, gifts) => {
    if (!err) {
      res.send({giftList: gifts});
    } else {
      console.log("[giftList] Finding gifts was unsuccessful!");
    }
  });
}

function reserveGift(req, res) {
  WeddingGift.findById(req.body.giftId, (err, gift) => {
    if (!err) {

      // TODO get userId from authenticated user
      const userId = "5f69c45607cd5b2b205799e4";
      if (!gift.userId) {
        gift.userId = userId;
        gift.save();
        res.send("Gift reserved!");
      } else {
        console.log("[reserveGift] Gift with id " + gift._id + " is already reserved.");
        res.send("The selected gift is already reserved!");
      }

    } else {
      console.log("[reserveGift] Gift reserving was unsuccessful!");
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
}

export {giftList, reserveGift, makeDummy};
