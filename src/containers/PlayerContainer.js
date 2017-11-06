import React from 'react';
import SC from 'soundcloud';
import { connect } from 'react-redux';
import { togglePlay, playPrevTrack, playNextTrack, playTrack} from '../actions';
import Player from '../components/Player';

var audio;

const mapStateToProps = state => {
  return {
    isPlaying: state.isPlaying,
    trackId: state.trackId,
    trackIndex: state.trackIndex,
    trackDuration: state.trackDuration,
    trackTime: state.trackTime,
    username: state.username,
    title: state.title,
    img: state.img,
    tracks: state.tracks
  }
}

const mapDispatchTopPros = dispatch => {
  return {
    onPrevClick: () => {
      dispatch(playPrevTrack());
    },
    onNextClick: () => {
      dispatch(playNextTrack());
    },
    onPlayClick: (isPlaying) => {
      dispatch(togglePlay(isPlaying));
    },
  }
}

const PlayerContainer = connect(
  mapStateToProps,
  mapDispatchTopPros
)(Player);  

//   componentDidMount() {
//     let audioData;
//     let $this = this;

//     audio = new Audio();
//     audio.addEventListener('ended', this.handleTrackEnded);
//     // audio.addEventListener('timeupdate', this.handleTimeUpdate);

//     this.timerID = setInterval(() => this.handleTimeUpdate(), 1000);

//     SC.initialize({
//       client_id: CLIENT_ID
//     });

//     this.resolveAudio();
//   }
//   componentWillUnmount() {
//     clearInterval(this.timerID);
//   }

//   getStreamURL(track) {
//     const result = track.stream_url + '?client_id=' + CLIENT_ID;

//     return result;
//   }

//   resolveAudio() {
//     let $this = this;
//     SC.resolve(this.props.audioURL).then(function (result) {
//       console.log(result);

//       let audioData = result;
//       let kind = audioData.kind;
//       let tracks = [];

//       if (kind === "playlist") {
//         tracks = audioData.tracks;
//       } else {
//         tracks.push(audioData);
//       }

//       let user = audioData.user;
//       let username = user.username;
//       let title = audioData.title;

//       let img = tracks[0].artwork_url ? tracks[0].artwork_url : tracks[0].user.avatar_url;
//       img = img.replace(/(.*)(-large)(\..*)/, '$1-t500x500$3');
//       // console.log(img);

//       let currentTrackId = tracks[0].id;
//       let streamURL = $this.getStreamURL(tracks[0]);

//       $this.setState({
//         isPlaying: false,
//         currentTrackNo: 0,
//         currentTrackId: currentTrackId,
//         currentTrackDuration: tracks[0].duration,
//         audioData: result,
//         username: username,
//         title: title,
//         img: img,
//         streamURL: streamURL,
//         tracks: tracks
//       }, function () {
//         audio.src = streamURL;
//         $this.playPause();
//         $this.playlist.resolvePlaylist();
//       })

//       // console.log($this.state);
//     }, function (err) {
//       alert('Error resolving audio...perhaps bad url?' + err);
//     });
//   }

//   handleTrackEnded() {
//     // console.log('ended');


//     if (this.state.currentTrackNo === this.state.tracks.length - 1) {
//       this.setState({
//         isPlaying: false
//       })
//     } else {
//       this.playByTrackNo(this.state.currentTrackNo + 1);
//     }
//   }
//   handleTimeUpdate() {
//     this.setState({
//       currentTrackTime: audio.currentTime * 1000
//     })
//   }
//   playByTrackNo(no) {
//     if (no === this.state.currentTrackNo) {
//       this.playPause();
//     } else {
//       let track = this.state.tracks[no];
//       let img = track.artwork_url ? track.artwork_url : track.user.avatar_url;
//       img = img.replace(/(.*)(-large)(\..*)/, '$1-t500x500$3');


//       this.setState({
//         isPlaying: true,
//         currentTrackNo: no,
//         currentTrackId: track.id,
//         currentTrackDuration: track.duration,
//         currentTrackTime: 0,
//         audioData: track,
//         username: track.user.username,
//         title: track.title,
//         img: img,
//         streamURL: this.getStreamURL(track),
//       }, function () {
//         audio.src = this.state.streamURL;
//         this.play();
//         this.playlist.resolvePlaylist();
//       })
//     }
//   }
//   playPause() {
//     if (this.state.isPlaying) {
//       // console.log('pause that shit');

//       this.pause();
//       this.setState({
//         isPlaying: false
//       })
//     } else {
//       // console.log('pump up the jam');

//       this.play();
//       this.setState({
//         isPlaying: true
//       })
//     }
//   }
//   play() {
//     audio.play();
//   }
//   pause() {
//     clearInterval()
//     audio.pause();
//   }
//   previous() {
//     let currentTrackNo = this.state.currentTrackNo;
//     this.playByTrackNo(currentTrackNo - 1 >= 0 ? currentTrackNo - 1 : 0)
//   }
//   next() {
//     let currentTrackNo = this.state.currentTrackNo;
//     this.playByTrackNo(currentTrackNo + 1 < this.state.tracks.length ? currentTrackNo + 1 : this.state.tracks.length - 1)
//   }
//   render() {
//     return (
//       <Player />
//     );
//   }
// }

export default PlayerContainer;