import React, { Component } from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';

import { init } from './utils/api'; 

import Header from './components/Header';
import Footer from './components/Footer';

import AudioURL from './components/AudioURL';
import PlayerContainer from './containers/PlayerContainer';
import Audio from "./components/Audio";

const audioURL = 'https://soundcloud.com/yoonj0819/sets/thug';

class App extends Component {
	constructor(props) {
		super(props);
  }
  componentDidMount() {
    init();
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
            <AudioURL
              value={audioURL}
              onSubmit={this.updateAudioURL}
            />
            <PlayerContainer />
					</div>
				</CSSTransition>
        <Footer />
			</TransitionGroup>
    );
  }
}

export default withRouter(connect()(App));
