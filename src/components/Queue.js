import React, { PropTypes, Component } from 'react';
import ListTrackItem from './ListTrackItem';

export default class Queue extends Component {

  static propTypes = {
    queue: React.PropTypes.array.isRequired
  }

  render() {
    if (this.props.queue.length === 0) {
      return <div className='Queue-no-songs'>No songs queued</div>;
    }

    return (
      <ul className='Queue'>
        {this.props.queue.map((tlTrack, i) => {
          let track = tlTrack.track;
          let active = track.uri === this.props.currentTrack.uri;

          return (
            <ListTrackItem
              key={'queue-track' + i}
              active={active}
              track={track}
            />
          );
        })}
      </ul>
    );
  }
}
