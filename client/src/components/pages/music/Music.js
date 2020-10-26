import React, {useState, useEffect} from "react";
import './Music.scss';
import { useHistory } from "react-router-dom";

function Music() {

  const history = useHistory();
  const [tracks, setTracks] = useState({list: []});
  const [newTrack, setNewTrack] = useState({
    artist: "",
    title: ""
  });

  function changeTrackInput(event) {
    const prop = event.target.id;
    const value = event.target.value;
    setNewTrack({
      ...newTrack,
      [prop]: value
    });
  }

  function getTrackList() {
    fetch("http://localhost:9000/music", {
      method: "GET",
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        //if authentication failed redirect to login page
        if (res.message.code === 401){
          history.push("/login");
        }
        else if (res.message.code === 200){
          setTracks({list: res.trackList});
        }
      })
      .catch(err => err);
  }

  function addTrack(event) {
    const requestOptions = {
      method: "POST",
      withCredentials: true,
      credentials: 'include',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTrack)
    };
    fetch("http://localhost:9000/music", requestOptions)
      .then(res => res.json())
      .then(res => {
        //if authentication failed redirect to login page
        if (res.message.code === 401){
          history.push("/login");
        }
        else if (res.message.code === 200){
          setNewTrack({artist: "", title: ""});
          getTrackList();
        }
      })
      .catch(err => err);

    event.preventDefault();
  }

  function changeLikeOnTrack(event, trackId) {

    const requestOptions = {
      method: "POST",
      withCredentials: true,
      credentials: 'include',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({trackId: trackId})
    };
    fetch("http://localhost:9000/music/vote", requestOptions)
      .then(res => res.json())
      .then(res => {
        //if authentication failed redirect to login page
        if (res.message.code === 401){
          history.push("/login");
        }
        else if (res.message.code === 200){
          getTrackList();
        }
      })
      .catch(err => err);
  }

  useEffect(getTrackList, []);

  return (
    <div>
      <h4>Please, add only the tracks which aren't on the list already!</h4>
      <div className="track-list-container">
        <form>
          <label htmlFor="artist">Artist</label>
          <input type="text" id="artist" onChange={changeTrackInput} value={newTrack.artist}/>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" onChange={changeTrackInput} value={newTrack.title}/>
          <button onClick={addTrack}>Add</button>
        </form>
        <ul>
          {tracks.list.sort((a, b) => {
            if (b.users.length - a.users.length !== 0)
              return b.users.length - a.users.length;
            if (b.artist !== a.artist)
              return b.artist < a.artist ? 1 : -1;
            return b.title < a.title ? 1 : -1;
          }).map((track) =>
            <li key={track._id}>
              {track.artist + " - " + track.title}
              <span>
                <input type="checkbox"
                       id={"track-checkbox" + track._id}
                       onChange={(e) => changeLikeOnTrack(e, track._id)}
                       checked={track.like}
                />
                <label htmlFor={"track-checkbox" + track._id}>{track.users.length}</label>
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Music;
