import { getStreamURL, getTrackImg } from '../utils/api'

import {
  ON_PLAY,
  ON_PAUSE,
  PLAY_TRACK,
  PLAY_NEXT_TRACK,
  PLAY_PREV_TRACK,
  RESOLVE_SUCCESS,
  RESOLVE_ERROR,
  playTrack,
} from '../actions';

const initialState = {
  isPlaying: false,
  audioURL: 'https://soundcloud.com/yoonj0819/sets/thug',
  tracks: [],
  trackId: null,
  trackIndex: null,
  trackTime: null,
  trackDuration: null
}

const silentParty = (state = initialState, action) => {
  switch(action.type) {
    case PLAY_TRACK: {
      const trackIndex = action.index

      const track = state.tracks[trackIndex]
      
      const username = track.user.username
      const title = track.title
      const img = getTrackImg(track)
      const trackId = track.id
      const trackDuration = track.duration
      const streamURL = getStreamURL(track)
      
      return { 
        ...state,
        isPlaying: true,
        trackIndex,
        trackId,
        trackDuration,
        username,
        title,
        img,
        streamURL
      };
    }
    case ON_PAUSE: {
      return {
        ...state,
        isPlaying: false
      }
    }
    case ON_PLAY: {
      return {
        ...state,
        isPlaying: true
      }
    }
    case RESOLVE_SUCCESS: {
      const  result = action.result;
      let tracks = [];

      if (result.kind === 'playlist') {
        tracks = result.tracks;
      } else {
        tracks.push(result);
      }

      let user = result.user;
      let username = user.username;
      let title = result.title;
      let img = getTrackImg(tracks[0]);
      let trackId = tracks[0].id;
      let trackDuration = tracks[0].duration;
      let streamURL = getStreamURL(tracks[0]);

      return {
        ...state,
        trackIndex: 0,
        trackId,
        trackDuration,
        username,
        title,
        img,
        streamURL,
        tracks
      }
    }
    case RESOLVE_ERROR: {
      return {
        ...state
      }
    }
    default: {
      return state;
    }
  }
}

export default silentParty;