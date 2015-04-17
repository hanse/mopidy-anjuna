import React from 'react';
import TracklistActions from '../actions/TracklistActions';
import QueueStore from '../stores/QueueStore';
import connectToStores from '../utils/connectToStores';
import {convertTime, artistsAsString} from '../helpers';

class Queue extends React.Component {

  _onPlayTrack = (track) => {
    TracklistActions.playTrack(track);
  }

  _onClearCache = () => {
    TracklistActions.clearQueue();
  }

  render() {
    if (this.props.tracks.length === 0)
      return <div>The queue is empty</div>;

    return (
      <ul className='tracklist'>
        <button onClick={this._onClearCache}>Clear Cache</button>
        {this.props.tracks.map((track, i) => {
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
}

Queue = connectToStores(Queue, [QueueStore], props => ({
  tracks: QueueStore.getTracks()
}))

export default Queue;
