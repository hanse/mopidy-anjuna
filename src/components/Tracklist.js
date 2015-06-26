import React from 'react';
import TracklistActions from '../actions/TracklistActions';
import TracklistStore from '../stores/TracklistStore';
import connectToStores from '../utils/connectToStores';
import ListTrackItem from './ListTrackItem';

class Tracklist extends React.Component {

  static propTypes = {}
  state = { selectedIndex: 0 }

  _onFilterTracks(event) {
    event.preventDefault();
    TracklistActions.filterTracks(event.target.value);
  }

  _onSort(property) {
    TracklistActions.sortTracks(property);
  }

  _onAddTrackToQueue(track, unplayable) {
    if (unplayable) return;
    TracklistActions.enqueueTrack(track);
  }

  _onSelectTrack(trackIndex) {
    this.setState({ selectedIndex: trackIndex });
  }

  render() {
    return (
      <div className='Tracklist'>
        <div className='Tracklist-filter'>
          <input
            type='search'
            placeholder='Filter tracks'
            onChange={this._onFilterTracks.bind(this)}
          />
        </div>
        <ul className='Tracklist-tracks'>
          <li className='Tracklist-tracks-header'>
            <span onClick={this._onSort.bind(this, 'name')}>Track</span>
            <span onClick={this._onSort.bind(this, 'artistName')}>Artist</span>
            <span onClick={this._onSort.bind(this, 'length')}>Time</span>
          </li>

          {this.props.tracks.map((track, i) => {
            let active = track.uri === this.props.currentTrack.uri;
            let unplayable = track.name.slice(0, 12) === '[unplayable]';
            let selected = i === this.state.selectedIndex;

            return (
              <ListTrackItem
                key={'track' + i}
                active={active}
                selected={selected}
                track={track}
                unplayable={unplayable}
                onClick={this._onSelectTrack.bind(this, i)}
                onDoubleClick={this._onAddTrackToQueue.bind(this, track, unplayable)}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connectToStores(
  Tracklist, [TracklistStore], () => TracklistStore.getState()
);
