var React = require('react');

var CurrentlyPlayingStore = require('../stores/CurrentlyPlayingStore');
var PlayerControlActions = require('../actions/PlayerControlActions');

var PlayerControls = React.createClass({

  getInitialState() {
    return CurrentlyPlayingStore.getState();
  },

  componentDidMount() {
    CurrentlyPlayingStore.addChangeListener(this.update);
  },

  componentWillUnmount() {
    CurrentlyPlayingStore.removeChangeListener(this.update);
  },

  update() {
    this.setState(CurrentlyPlayingStore.getState());
  },

  togglePlay() {
    if (this.state.isPlaying) {
      PlayerControlActions.pause();
    } else {
      PlayerControlActions.play();
    }
  },

  _onNextTrack() {
    PlayerControlActions.next();
  },

  _onPrevTrack() {
    PlayerControlActions.prev();
  },

  _onVolumeChange() {
    var newVolume = this.refs.volume.getDOMNode().value | 0;
    PlayerControlActions.setVolume(newVolume);
  },

  render() {
    var playOrPause = this.state.isPlaying ? 'fa fa-pause' : 'fa fa-play';
    var volumeLevel;
    if (this.state.volume < 5) volumeLevel = 'off';
    else if (this.state.volume > 80) volumeLevel = 'up';
    else volumeLevel = 'down';

    return (
      <div className='controls'>
        <button onClick={this._onPrevTrack}><i className='fa fa-step-backward' /></button>
        <button className='play-button' onClick={this.togglePlay}><i className={playOrPause} /></button>
        <button onClick={this._onNextTrack}><i className='fa fa-step-forward' /></button>
        <input type='range' value={this.state.volume} ref='volume' onChange={this._onVolumeChange} />
        <i className={'fa fa-volume-' + volumeLevel} />
      </div>
    );
  }
});

module.exports = PlayerControls;
