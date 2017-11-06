import React from 'react';
import { formatTime } from '../utils';
import Icon from './Icon';

const PlaylistTrack = ({track, isActive, isPlaying, index, onClick}) => {
  const handleClick = e => {
    onClick(index);
  }

  return (
    <li 
      className={"playlistTrack flex pv2 ph3 " + (isActive ? 'is-active' : '')} onClick={handleClick}
    >
      <div className="playlistTrack-number mr2">{index + 1}</div>
      <div className="playlistTrack-title truncate">
        <span className="playlistTrack-username">{track.user.username}</span>
        &nbsp;&ndash;&nbsp;
        <strong className="playlistTrack-trackname">{track.title}</strong>
      </div>
      <div className="playlistTrack-indicator ml2 mr2">
        { isActive
        ? <Icon name="play" />
        : null
        }
      </div>
      <div className="playlistTrack-duration ml-auto">
        { formatTime(track.duration)}
      </div>
    </li>
  )
}

export default PlaylistTrack;
