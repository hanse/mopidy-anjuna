/** @jsx React.DOM */

var React = require('react');

var CurrentlyPlayingStore = require('../stores/CurrentlyPlayingStore');
var PlayerControlViewActionCreators = require('../actions/PlayerControlViewActionCreators');

var PlayerControls = React.createClass({

  getInitialState: function() {
    return CurrentlyPlayingStore.getState();
  },

  componentDidMount: function() {
    CurrentlyPlayingStore.addChangeListener(this.update);
  },

  componentWillUnmount: function() {
    CurrentlyPlayingStore.removeChangeListener(this.update);
  },

  update: function() {
    this.setState(CurrentlyPlayingStore.getState());
  },

  togglePlay: function() {
    if (this.state.isPlaying) {
      PlayerControlViewActionCreators.pause();
    } else {
      PlayerControlViewActionCreators.play();
    }
  },

  _onNextTrack: function() {
    PlayerControlViewActionCreators.next();
  },

  _onPrevTrack: function() {
    PlayerControlViewActionCreators.prev();
  },

  render: function() {
    var playOrPause = this.state.isPlaying ? 'fa fa-pause' : 'fa fa-play';
    return (
      <div className='controls'>
        <button onClick={this._onPrevTrack}><i className='fa fa-step-backward' /></button>
        <button className='play-button' onClick={this.togglePlay}><i className={playOrPause} /></button>
        <button onClick={this._onNextTrack}><i className='fa fa-step-forward' /></button>
      </div>
    );
  }
});

module.exports = PlayerControls;
