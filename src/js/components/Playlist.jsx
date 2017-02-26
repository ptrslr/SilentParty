import React from 'react';
import ReactDOM from 'react-dom';
import Icon from 'react-geomicons';
import PlaylistTrack from './PlaylistTrack.jsx';

export default class Playlist extends React.Component {
    constructor(props) {
        super(props);
        // console.log(playlistItems);
        this.state = {
            playlistItems: this.props.tracks
        }

        this.handleClick = this.handleClick.bind(this);
    }

    resolvePlaylist() {
        let playlistItems = this.props.tracks.map((track) =>
            <PlaylistTrack isActive={track.id === this.props.currentTrackId} playerIsPlaying={this.props.playerIsPlaying} key={track.id} track={track} id={track.id} no={this.props.tracks.indexOf(track)} onClick={this.handleClick} getTime={this.props.getTime} />);
        // console.log(playlistItems);
        this.setState({
            playlistItems: playlistItems
        });
    }

    handleClick(no) {
        this.props.playByTrackNo(no);
        // console.log(this.props.currentTrackId, id);
    }

    render() {
        return (
            <div className="mx-auto mt3 max-width-3">
                <h2 className="hidden">Playlist</h2>
                <ol className="playlist left-align list-reset">
                    {this.state.playlistItems}
                </ol>
            </div>
        );
    }
}