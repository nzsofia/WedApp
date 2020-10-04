import Track from "../models/track.js";

function trackList(req, res) {
  Track.find({}, (err, tracks) => {
    if (!err) {
      res.send({trackList: tracks});
    } else {
      console.log("Find tracks was unsuccessful!");
    }
  });
}

function addTrack(req, res) {
  // TODO get userId from authenticated user
  const userId = "5f69c45607cd5b2b205799e0";
  const trackProps = req.body;
  new Track({
    ...trackProps,
    users: [userId]
  }).save((err, track) => {
    if (!err)
      res.send("Track addition was successful!");
    else
      res.send("Track addition was unsuccessful!");
  });
}

function changeVote(req, res) {
  Track.findById(req.body.trackId, (err, track) => {
    if (!err) {
      console.log(track);

      // TODO get userId from authenticated user
      const userId = "5f69c45607cd5b2b205799e0";
      if (track.users.includes(userId))
        // delete userId from users array
        track.users.splice(track.users.indexOf(userId));
      else
        track.users.push(userId);

      track.save();
      res.send("Vote changed!");
    } else {
      console.log("[changeVote] Vote changing was unsuccessful!");
    }
  });
}

export default trackList;
export {addTrack, changeVote};
