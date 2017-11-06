import SC from 'soundcloud';

export const ON_PLAY = 'ON_PLAY';
export const ON_PAUSE = 'ON_PAUSE';
export const TOGGLE_PLAY = 'TOGGLE_PLAY';
export const PLAY_TRACK = 'PLAY_TRACK';
export const PLAY_PREV_TRACK = 'PLAY_PREV_TRACK';
export const PLAY_NEXT_TRACK = 'PLAY_NEXT_TRACK';
export const RESOLVE = 'RESOLVE';
export const RESOLVE_REQUEST = 'RESOLVE_REQUEST';
export const RESOLVE_SUCCESS = 'RESOLVE_SUCCESS';
export const RESOLVE_ERROR = 'RESOLVE_ERROR';

export const onPlay = () => ({
  type: ON_PLAY
});
export const onPause = () => ({
  type: ON_PAUSE
});

export const togglePlay = (isPlaying) => {
  return dispatch => {
    if (isPlaying) {
      dispatch(onPause());
    } else {
      dispatch(onPlay());
    }
  }
}
export const playTrack = (index) => ({
  type: PLAY_TRACK,
  index
});

export const playPrevTrack = () => ({
  type: PLAY_PREV_TRACK
})

export const playNextTrack = () => ({
  type: PLAY_NEXT_TRACK
})

export const resolve = (audioURL) => {
  return dispatch => {
    SC.resolve(audioURL).then(result => {
      console.log(result);
      dispatch(resolveSuccess(result))
      dispatch(onPlay());
    }, error => {
      alert('Error resolving audio...perhaps bad url?' + error);
      dispatch(resolveError(error))
    });
  }
}

export const resolveSuccess = result => ({
  type: RESOLVE_SUCCESS,
  result
})

export const resolveError = error => ({
  type: RESOLVE_ERROR,
  error
})
