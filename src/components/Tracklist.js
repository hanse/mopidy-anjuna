import React from 'react';
import classNames from 'classnames';
import TracklistActions from '../actions/TracklistActions';
import TracklistStore from '../stores/TracklistStore';
import connectToStores from '../utils/connectToStores';
import ListTrackItem from './ListTrackItem';

class Tracklist extends React.Component {

  constructor() {
    super();
    this.state = {
      tracks: [],
      filteredTracks: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tracks: nextProps.tracks,
      filteredTracks: nextProps.tracks
    });
  }

  _onFilterTracks(event) {
    event.preventDefault();
    const regex = new RegExp(event.target.value, 'i');
    const filteredTracks = this.state.tracks.filter(track => {
      return track.name.search(regex) > -1;
    });

    this.setState({ filteredTracks });
  }

  _onSort(property) {
    TracklistActions.sortTracks(property);
  }

  _onTrackClick(track, unplayable) {
    if (unplayable) return;
    TracklistActions.enqueueTrack(track);
  }

  render() {
    const tracks = this.state.filteredTracks;
    return (
      <ul className='tracklist'>
        <li className='tracklist-filter'>
          <input
            type='search'
            placeholder='Filter'
            onChange={this._onFilterTracks.bind(this)}
          />
        </li>

        <li className='tracklist-header'>
          <span onClick={this._onSort.bind(this, 'name')}>Track</span>
          <span onClick={this._onSort.bind(this, 'artist')}>Artist</span>
          <span onClick={this._onSort.bind(this, 'length')}>Time</span>
        </li>

        {tracks.map((track, i) => {

          let active = track.uri === this.props.currentTrack.uri;
          let unplayable = track.name.slice(0, 12) === '[unplayable]';

          return (
            <ListTrackItem
              key={'track' + i}
              active={active}
              track={track}
              unplayable={unplayable}
              onDoubleClick={this._onTrackClick.bind(this, track, unplayable)}
            />
          );
        })}
      </ul>
    );
  }
}

Tracklist = connectToStores(Tracklist, [TracklistStore], props => TracklistStore.getState());

export default Tracklist;
