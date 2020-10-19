import Track from "../models/track.js";
import passport from "passport";

function trackList(req, res) {
  Track.find({}, (err, tracks) => {
    if (!err) {
      const tracksWithLike = tracks.map(track => {
        //check if current user liked a track
        const trackLike = track.toObject();
        trackLike.like = track.users.includes(req.user._id);
        return trackLike;
      });

      res.send({trackList: tracksWithLike,
                message: {code: 200, content: "Everything ok."}});
    } else {
      console.log("[trackList] Find tracks was unsuccessful!");
      res.send({message: {code: 500, content: "Find tracks was unsuccessful!"}});
    }
  });
}

function addTrack(req, res) {

  const userId = req.user._id;
  const trackProps = req.body;
  new Track({
    ...trackProps,
    users: [userId]
  }).save((err, track) => {
    if (!err)
      res.send({message: {code: 200, content: "Track addition was successful!"}});
    else
      res.send({message: {code: 500, content: "Track addition was unsuccessful!"}});;
  });
}

function changeVote(req, res) {
  Track.findById(req.body.trackId, (err, track) => {
    if (!err) {

      const userId = req.user._id;
      if (track.users.includes(userId))
        // delete userId from users array
        track.users.splice(track.users.indexOf(userId));
      else
        track.users.push(userId);

      track.save();
      res.send({message: {code: 200, content: "Vote changed!"}});
    } else {
      console.log("[changeVote] Vote changing was unsuccessful!");
      res.send({message: {code: 500, content: "Vote changing was unsuccessful!"}});
    }
  });
}

export default trackList;
export {addTrack, changeVote};
