import React, { Component } from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Header from './components/Header';
import Footer from './components/Footer';

import AudioURL from './components/AudioURL';
import Player from './components/Player';

const audioURL = 'https://soundcloud.com/yoonj0819/sets/thug';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = ({
      audioURL: audioURL,
      audioURLShown: true,
      playerShown: false,
		});

		this.updateAudioURL = this.updateAudioURL.bind(this);
	}
	updateAudioURL(value) {
		this.setState({
      audioURL: value,
      audioURLShown: false,
      playerShown: true
		// }, function() {
		// 	this.player.resolveAudio();
		});
	}
  render() {
    return (
      <TransitionGroup className="app">
        <Header />
				<CSSTransition key={this.props.location.pathname} timeout={{
					enter: 500,
					exit: 250
				}} classNames="RouteTransition">
          
					<div className="main">

            { this.state.audioURLShown && <AudioURL
              value={this.state.audioURL}
              onSubmit={this.updateAudioURL}
            /> }
            { this.state.playerShown && <Player
              audioURL={this.state.audioURL}
              ref={(player) => { this.player = player; }}
            /> }

					</div>
				</CSSTransition>
        <Footer />
			</TransitionGroup>
    );
  }
}

export default withRouter(App);
