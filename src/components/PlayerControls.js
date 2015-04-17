import React from 'react';
import PlayerControlActions from '../actions/PlayerControlActions';
import ButtonWithIcon from './ButtonWithIcon';

class PlayerControls extends React.Component {

  _onTogglePlay = () => {
    if (this.props.isPlaying) {
      PlayerControlActions.pause();
    } else {
      PlayerControlActions.play();
    }
  }

  _onNextTrack = () => {
    PlayerControlActions.next();
  }

  _onPrevTrack = () => {
    PlayerControlActions.prev();
  }

  _onVolumeChange = () => {
    let newVolume = this.refs.volume.getDOMNode().value | 0;
    PlayerControlActions.setVolume(newVolume);
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
      <div className='controls'>
        <ButtonWithIcon onClick={this._onPrevTrack}  iconName='step-backward' />
        <ButtonWithIcon onClick={this._onTogglePlay} iconName={playOrPause} />
        <ButtonWithIcon onClick={this._onNextTrack}  iconName='step-forward' />
        <input type='range' value={this.props.volume} ref='volume' onChange={this._onVolumeChange} />
        <i className={'fa fa-volume-' + volumeLevel} />
      </div>
    );
  }
}

export default PlayerControls;
