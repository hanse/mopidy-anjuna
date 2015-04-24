import React from 'react';
import PlayerControlActions from '../actions/PlayerControlActions';
import ButtonWithIcon from './ButtonWithIcon';
import SeekBar from './SeekBar';

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
      <div className='controls'>
        <ButtonWithIcon onClick={this._onPrevTrack} iconName='step-backward' />
        <ButtonWithIcon onClick={this._onTogglePlay} iconName={playOrPause} />
        <ButtonWithIcon onClick={this._onNextTrack} iconName='step-forward' />
        <input className='volume' type='range' value={this.props.volume} onChange={this._onVolumeChange} />
        <i className={'fa fa-volume-' + volumeLevel} />

        <SeekBar
          onMove={this._onSeek.bind(this)}
          isPlaying={this.props.isPlaying}
          track={this.props.currentTrack}
          initialTimePosition={this.props.timePosition}
        />
      </div>
    );
  }
}

export default PlayerControls;
