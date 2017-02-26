import React from 'react';
import ReactDOM from 'react-dom';
import Icon from 'react-geomicons';

export default class PlaylistTrack extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onClick(this.props.no);
    }

    render() {
        return (
            <li className={"playlistTrack flex py1 px2 " + (this.props.isActive ? 'is-active' : '')} onClick={this.handleClick}>
                <div className="playlistTrack-number mr1">{this.props.no + 1}</div>
                <div className="playlistTrack-title truncate">
                    <span className="playlistTrack-username">{this.props.track.user.username}</span>
                    &nbsp;&ndash;&nbsp;
                    <strong className="playlistTrack-trackname">{this.props.track.title}</strong>
                </div>
                <div className="playlistTrack-indicator ml1 mr1">
                    <Icon name="play" className="icon icon-play"/>
                    <Icon name="pause" className="icon icon-pause"/>
                </div>
                <div className="playlistTrack-duration ml-auto">{this.props.getTime(this.props.track.duration)}</div>
            </li>
        )
    }
}