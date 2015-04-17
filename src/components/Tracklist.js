import React from 'react';
import TracklistActions from '../actions/TracklistActions';
import TracklistStore from '../stores/TracklistStore';
import connectToStores from '../utils/connectToStores';
import {convertTime, artistsAsString} from '../helpers';

class Tracklist extends React.Component {

  _onSort(property) {
    TracklistActions.sortTracks(property);
  }

  _onTrackClick(track) {
    TracklistActions.enqueueTrack(track);
  }

  render() {
    return (
      <ul className='tracklist'>
        <li className='tracklist-header'>
          <span onClick={this._onSort.bind(this, 'name')}>Track</span>
          <span onClick={this._onSort.bind(this, 'artist')}>Artist</span>
          <span onClick={this._onSort.bind(this, 'length')}>Time</span>
        </li>
        {this.props.tracks.map((track, i) => {
          let active = track.uri === this.props.currentTrack.uri;
          return (
            <li key={'track-' + i} onDoubleClick={this._onTrackClick.bind(this, track)} className={active ? 'active' : ''}>
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

Tracklist = connectToStores(Tracklist, [TracklistStore], props => TracklistStore.getState());

export default Tracklist;
