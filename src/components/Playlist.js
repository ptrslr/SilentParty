import React from 'react';
import { connect } from 'react-redux';
import { playTrack } from '../actions';
import PlaylistTrack from './PlaylistTrack.js';

let Playlist = ({ tracks, trackId, isPlaying, dispatch }) => {
  const handleClick = (index) => {
      dispatch(playTrack(index));
      // console.log(this.props.currentTrackId, id);
  }

  let playlistItems = tracks.map((track) => (
    <PlaylistTrack 
      key={track.id}
      isActive={track.id === trackId} 
      isPlaying={isPlaying} 
      track={track} 
      index={tracks.indexOf(track)} 
      onClick={handleClick} 
    />
  ));
  
  return (
    <div className="center mt3 mw6">
      <h2 className="hidden">Playlist</h2>
      <ol className="playlist pa0 ma0">
          {playlistItems}
      </ol>
    </div>
  );
}

Playlist = connect()(Playlist);
export default Playlist;
