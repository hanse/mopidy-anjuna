import React from 'react';
import PlayerControlActions from '../actions/PlayerControlActions';

const PlayerControls = React.createClass({

  togglePlay() {
    if (this.props.isPlaying) {
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
    var playOrPause = this.props.isPlaying ? 'fa fa-pause' : 'fa fa-play';
    var volumeLevel;
    if (this.props.volume < 5) volumeLevel = 'off';
    else if (this.props.volume > 80) volumeLevel = 'up';
    else volumeLevel = 'down';

    return (
      <div className='controls'>
        <button onClick={this._onPrevTrack}><i className='fa fa-step-backward' /></button>
        <button className='play-button' onClick={this.togglePlay}><i className={playOrPause} /></button>
        <button onClick={this._onNextTrack}><i className='fa fa-step-forward' /></button>
        <input type='range' value={this.props.volume} ref='volume' onChange={this._onVolumeChange} />
        <i className={'fa fa-volume-' + volumeLevel} />
      </div>
    );
  }
});

export default PlayerControls;
