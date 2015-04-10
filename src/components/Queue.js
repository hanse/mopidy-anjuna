import React from 'react';
import TracklistActions from '../actions/TracklistActions';
import QueueStore from '../stores/QueueStore';
import {convertTime, artistsAsString} from '../helpers';

function getState() {
  return {
    tracks: QueueStore.getTracks(),
  }
}

var Queue = React.createClass({

  getInitialState() {
    return getState();
  },

  componentDidMount() {
    QueueStore.addChangeListener(this.update);
  },

  componentWillUnmount() {
    QueueStore.removeChangeListener(this.update);
  },

  update() {
    this.setState(getState());
  },

  _onSort(property) {
    TracklistActions.sortTracks(property);
  },

  _onPlayTrack(track) {
    TracklistActions.playTrack(track);
  },

  _onClearCache() {
    TracklistActions.clearQueue();
  },

  render() {
    if (this.state.tracks.length === 0)
      return <div>The queue is empty</div>;

    return (
      <ul className='tracklist'>
        <button onClick={this._onClearCache}>Clear Cache</button>
        {this.state.tracks.map((track, i) => {
          var active = track.uri === this.props.currentTrack.uri;
          return (
            <li key={'track-' + i} onDoubleClick={this._onPlayTrack.bind(this, track)} className={active ? 'active' : ''}>
              <span>{active ? <i className='fa fa-volume-up' /> : ''} {track.name}</span>
              <span className='artist-name'>{artistsAsString(track)}</span>
              <span className='track-length'>{convertTime(track.length)}</span>
            </li>
          );
        })}
      </ul>
    );
  }
});

export default Queue;
