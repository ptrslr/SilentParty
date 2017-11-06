import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onPause, onPlay } from "../actions";

class Audio extends Component {
  constructor(props) {
    super(props)

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }
  componentDidMount() {
    // if (
    //   typeof this.props.streamURL !== undefined &&
    //   this.props.streamURL !== null
    // ) {
    //   this.props.dispatch(onPlay());
    // }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.isPlaying !== nextProps.isPlaying) {
      if (nextProps.isPlaying) {
        this.play()
      } else {
        this.pause()
      }
    }
  }

  play() {
    this.audio.play()
  }

  pause() {
    this.audio.pause()
  }

  render() {
    return (
      <audio
        src={this.props.streamURL}
        autoPlay
        ref={ node => this.audio = node }
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    isPlaying: state.isPlaying,
    streamURL: state.streamURL
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onPlay: () => {
      dispatch(onPlay())
    },
    onPause: () => {
      dispatch(onPause())
    } 
  }
}

Audio = connect(mapStateToProps, null)(Audio);
export default Audio;