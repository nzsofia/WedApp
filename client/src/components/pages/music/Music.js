import React, {useState, useEffect} from "react";
import './Music.css';

function Music() {

  const [tracks, setTracks] = useState({list: []});

  function getTrackList() {
    fetch("http://localhost:9000/music")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setTracks({list: res.trackList});
      })
      .catch(err => err);
  }

  function addTrack(event) {
    const track = {
      artist: "Lady Gaga & Bradley Cooper",
      title: "Shallow"
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(track)
    };
    fetch("http://localhost:9000/music", requestOptions)
      .then(res => res.text())
      .then(res => {
        console.log(res);
        getTrackList();
      })
      .catch(err => err);

    event.preventDefault();
  }

  function changeLikeOnTrack(event, trackId) {
    console.log(trackId);
    const requestOptions = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({trackId: trackId})
    };
    fetch("http://localhost:9000/music/vote", requestOptions)
      .then(res => res.text())
      .then(res => {
        console.log(res);
        getTrackList();
      })
      .catch(err => err);
  }

  useEffect(getTrackList, []);

  return (
    <div className="track-list-container">
      <ul>
        {tracks.list.sort((a, b) => {
          return b.users.length - a.users.length;
        }).map((track) =>
          <li key={track._id}>
            {track.artist + " - " + track.title}
            <span>
              <input type="checkbox"
                     id={"track-checkbox" + track._id}
                     onChange={(e) => changeLikeOnTrack(e, track._id)}
                     checked={track.users.includes("5f69c45607cd5b2b205799e0")}
              />
              <label htmlFor={"track-checkbox" + track._id}>{track.users.length}</label>
            </span>
          </li>
        )}
      </ul>
      <button onClick={addTrack}>Add</button>
    </div>
  );
}

export default Music;
