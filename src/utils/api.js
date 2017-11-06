import SC from 'soundcloud';

export const CLIENT_ID = 'bc2740865fc8d120b6df98beae813823';

export const getStreamURL = track => {
  return track.stream_url + '?client_id=' + CLIENT_ID;
}

export const init = () => {
  SC.initialize({
    client_id: CLIENT_ID
  });
}

export const getTrackImg = track => {
  let img = track.artwork_url ? track.artwork_url : track.user.avatar_url;
  img = img.replace(/(.*)(-large)(\..*)/, '$1-t500x500$3');
  
  return img
}