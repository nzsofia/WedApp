import React, { useState, useEffect } from "react";
import './Music.scss';
import { useHistory } from "react-router-dom";
import NavigationBar from "../../shared/navigation-bar/NavigationBar";
import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import MusicNoteIcon from '@material-ui/icons/MusicNote';

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
        // if authentication failed redirect to login page
        if (res.message.code === 401) {
          history.push("/login");
        }
        else if (res.message.code === 200) {
          setTracks({list: res.trackList});
        }
      })
      .catch(err => err);
  }

  function addTrack(event) {
    if (!newTrack.artist || !newTrack.title)
      // TODO popup some error message
      return;

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
        // if authentication failed redirect to login page
        if (res.message.code === 401) {
          history.push("/login");
        }
        else if (res.message.code === 200) {
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
        // if authentication failed redirect to login page
        if (res.message.code === 401) {
          history.push("/login");
        }
        else if (res.message.code === 200) {
          getTrackList();
        }
      })
      .catch(err => err);
  }

  useEffect(getTrackList, []);

  function trackListSort(a, b) {
    if (b.users.length - a.users.length !== 0)
      return b.users.length - a.users.length;
    if (b.artist !== a.artist)
      return b.artist < a.artist ? 1 : -1;
    return b.title < a.title ? 1 : -1;
  }

  return (
    <div>
      <NavigationBar />
      <h4>Please, add only the tracks which aren't on the list already!</h4>
      <div className="track-list-container">
        <form autoComplete="on">
          <TextField id="artist"
                     label="Artist"
                     variant="outlined"
                     required
                     onChange={changeTrackInput}
                     value={newTrack.artist} />
          <TextField id="title"
                     label="Title"
                     variant="outlined"
                     required
                     onChange={changeTrackInput}
                     value={newTrack.title} />
          <IconButton onClick={addTrack}>
            <MusicNoteIcon />
          </IconButton>
        </form>
        <ul>
          {tracks.list.sort(trackListSort).map((track) =>
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
