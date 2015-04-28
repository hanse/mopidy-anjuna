import React from 'react';
import TracklistActions from '../actions/TracklistActions';
import QueueStore from '../stores/QueueStore';
import connectToStores from '../utils/connectToStores';
import {convertTime, artistsAsString} from '../helpers';

import ListTrackItem from './ListTrackItem';

class Queue extends React.Component {

  _onPlayTrack = (track) => {
    TracklistActions.playTrack(track);
  }

  _onClearQueue = () => {
    TracklistActions.clearQueue();
  }

  render() {
    if (this.props.tracks.length === 0)
      return <div>The queue is empty</div>;

    return (
      <ul className='tracklist'>
        {this.props.tracks.map((tlTrack, i) => {
          let track = tlTrack.track;
          let active = track.uri === this.props.currentTrack.uri;

          return (
            <ListTrackItem
              key={'queue-track' + i}
              active={active}
              track={track}
              onDoubleClick={this._onPlayTrack.bind(this, tlTrack)}
            />
          );
        })}
      </ul>
    );
  }
}

Queue = connectToStores(Queue, [QueueStore], props => QueueStore.getState());

export default Queue;
