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

export {giftList, makeDummy};
