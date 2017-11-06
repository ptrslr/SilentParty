import React from 'react';
import Playlist from './Playlist.js';
import Audio from './Audio';
import Icon from './Icon';
import { formatTime } from '../utils';

const Player = ({
  isPlaying,
  trackId,
  trackIndex,
  trackDuration,
  trackTime,
  username,
  title,
  img,
  tracks,
  onPrevClick,
  onNextClick,
  onPlayClick
}) => {
  let audio;

  const handlePlayClick = () => {
    onPlayClick(isPlaying)
  }
  
  return (
    <article className="player mx-auto tc">
      <Audio />

      <h1 className="playerTitle mw6 center">
        <small className="playerTile-username f6 b ttu tracked silver">
          <a href="#" target="_blank">{username}</a>
        </small>
        <div className="playerTitle-trackname truncate">
          <a href="#" target="_blank">{title}</a>
        </div>
      </h1>

      <div className="playerTime mb1">
        {formatTime(trackTime)} - {formatTime(trackDuration)}
      </div>

      <div>
        <div className="playerControls center ">
          <div className="playerControls-bg" style={{backgroundImage: 'url(' + img + ')'}}></div>

          <div className="playerControls-main flex items-center justify-center">
            <button 
              className="playerControl playerControl--previous" 
              type="button" 
              disabled={trackIndex === 0}
              onClick={onPrevClick}
            >
              <Icon name="previous" />
            </button>

            <button 
              className="playerControl playerControl--play" 
              type="button"
              onClick={handlePlayClick}
            >
              {isPlaying
                ? <Icon name="pause" />
                : <Icon name="play" />
              }
            </button>

            <button 
              className="playerControl playerControl--next" 
              type="button" 
              disabled={trackIndex === tracks.length - 1}
            >
              <Icon name="next" />
            </button>
          </div>
        </div>
      </div>

      <Playlist 
        tracks={tracks} 
        isPlaying={isPlaying} 
        trackId={trackId} 
      />
    </article>
  );
}

export default Player;