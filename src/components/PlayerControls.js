import React from 'react';
import PlayerControlActions from '../actions/PlayerControlActions';
import ButtonWithIcon from './ButtonWithIcon';

class PlayerControls extends React.Component {

  static propTypes = {
    isPlaying: React.PropTypes.bool,
    volume: React.PropTypes.number
  }

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

  _onVolumeChange = (event) => {
    PlayerControlActions.setVolume(event.target.value | 0);
  }

  _onSeek(ms) {
    PlayerControlActions.seek(ms);
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
      <div className='PlayerControls'>
        <ButtonWithIcon onClick={this._onPrevTrack} iconName='step-backward' />
        <ButtonWithIcon onClick={this._onTogglePlay} iconName={playOrPause} />
        <ButtonWithIcon onClick={this._onNextTrack} iconName='step-forward' />
        <input className='volume' type='range' value={this.props.volume} onChange={this._onVolumeChange} />
        <div className='volume-level'><i className={'fa fa-volume-' + volumeLevel} /></div>
      </div>
    );
  }
}

export default PlayerControls;
