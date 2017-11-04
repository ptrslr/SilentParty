import React from 'react';
import Icon from './Icon';

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
            <li className={"playlistTrack flex pv2 ph3 " + (this.props.isActive ? 'is-active' : '')} onClick={this.handleClick}>
                <div className="playlistTrack-number mr2">{this.props.no + 1}</div>
                <div className="playlistTrack-title truncate">
                    <span className="playlistTrack-username">{this.props.track.user.username}</span>
                    &nbsp;&ndash;&nbsp;
                    <strong className="playlistTrack-trackname">{this.props.track.title}</strong>
                </div>
                <div className="playlistTrack-indicator ml2 mr2">
                  { this.props.isActive
                    ? <Icon name="play" />
                    : null
                  }
                </div>
                <div className="playlistTrack-duration ml-auto">{this.props.getTime(this.props.track.duration)}</div>
            </li>
        )
    }
}
