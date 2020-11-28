import React, { useState, useEffect } from "react";
import './Music.scss';
import { useHistory } from "react-router-dom";
import NavigationBar from "../../shared/navigation-bar/NavigationBar";
import TextField from "@material-ui/core/TextField";
import { Badge, IconButton, List } from "@material-ui/core";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as request from "../../../services/request";

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
    request.get(`${request.URL}/music`)
      .then(res => {
        // if authentication failed redirect to login page
        if (res.message.code === 401) {
          history.push("/sign");
        }
        else if (res.message.code === 200) {
          setTracks({list: res.trackList});
        }
      })
      .catch(err => err);
  }

  function addTrack(event) {
    if (!newTrack.artist || !newTrack.title)
      // TODO popup fields are required message
      return;
    if (tracks.list.filter(filterTracks).length > 0)
      // TODO popup like song below message
      return;

    request.post(`${request.URL}/music`, newTrack)
      .then(res => {
        // if authentication failed redirect to login page
        if (res.message.code === 401) {
          history.push("/sign");
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
    request.post(`${request.URL}/music/vote`, {trackId: trackId})
      .then(res => {
        // if authentication failed redirect to login page
        if (res.message.code === 401) {
          history.push("/sign");
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

  function filterTracks(track) {
    return track.artist.toLowerCase().match(newTrack.artist.toLowerCase()) &&
      track.title.toLowerCase().match(newTrack.title.toLowerCase());
  }

  return (
    <div>
      <NavigationBar />
      <div className="track-list-container">
        <div className="track-list-container__decoration track-list-container__decoration--left">&nbsp;</div>
        <div className="track-list-center-container">
          <form autoComplete="on" className="track-add-form">
            <TextField id="artist"
                       label="Artist"
                       variant="outlined"
                       required
                       className="track-add-form__input"
                       onChange={changeTrackInput}
                       value={newTrack.artist} />
            <TextField id="title"
                       label="Title"
                       variant="outlined"
                       required
                       className="track-add-form__input"
                       onChange={changeTrackInput}
                       value={newTrack.title} />
            <IconButton onClick={addTrack} className="track-add-form__button">
              <MusicNoteIcon />
            </IconButton>
          </form>
          <List className="track-list">
            {tracks.list.sort(trackListSort).filter(filterTracks).map((track) =>
              <ListItem key={track._id} className="track-list__item">
                <ListItemText primary={track.artist + " - " + track.title} />
                <ListItemSecondaryAction>
                  <IconButton edge="end"
                              aria-label="Like"
                              onClick={(e) => changeLikeOnTrack(e, track._id)}>
                    <Badge className="track-list__item__like__count" badgeContent={track.users.length} color="secondary">
                      {track.like ? <FavoriteIcon className="track-list__item__like" /> : <FavoriteBorderIcon className="track-list__item__like" />}
                    </Badge>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )}
          </List>
        </div>
        <div className="track-list-container__decoration track-list-container__decoration--right">&nbsp;</div>
      </div>
    </div>
  );
}

export default Music;
