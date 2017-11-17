import React, { Component } from 'react';
import * as PlayerControlActions from '../actions/PlayerControlActions';

export default class PlayerControls extends Component {
  _onTogglePlay = () => {
    if (this.props.isPlaying) {
      this.props.dispatch(PlayerControlActions.pause());
    } else {
      this.props.dispatch(PlayerControlActions.play());
    }
  };

  _onNextTrack = () => {
    this.props.dispatch(PlayerControlActions.next());
  };

  _onPrevTrack = () => {
    this.props.dispatch(PlayerControlActions.prev());
  };

  _onVolumeChange = event => {
    this.props.dispatch(PlayerControlActions.setVolume(event.target.value | 0));
  };

  _onSeek(ms) {
    this.props.dispatch(PlayerControlActions.seek(ms));
  }

  render() {
    let playOrPause = this.props.isPlaying ? 'fa fa-pause' : 'fa fa-play';

    let volumeLevel;
    if (this.props.volume < 5) {
      volumeLevel = 'off';
    } else if (this.props.volume > 80) {
      volumeLevel = 'up';
    } else {
      volumeLevel = 'down';
    }

    return (
      <div className="PlayerControls">
        <button onClick={this._onPrevTrack} disabled>
          <i className="fa fa-step-backward" />
        </button>
        <button onClick={this._onTogglePlay}>
          <i className={playOrPause} />
        </button>
        <button onClick={this._onNextTrack}>
          <i className="fa fa-step-forward" />
        </button>
        <input
          className="volume"
          type="range"
          value={this.props.volume}
          onChange={this._onVolumeChange}
        />
        <div className="volume-level">
          <i className={'fa fa-volume-' + volumeLevel} />
        </div>
      </div>
    );
  }
}
