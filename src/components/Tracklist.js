import React from 'react';
import TracklistActions from '../actions/TracklistActions';
import TracklistStore from '../stores/TracklistStore';
import CurrentlyPlayingStore from '../stores/CurrentlyPlayingStore';
import {convertTime, artistsAsString} from '../helpers';

var Tracklist = React.createClass({

  getInitialState() {
    return TracklistStore.getState();
  },

  componentDidMount() {
    TracklistStore.addChangeListener(this.update);
    CurrentlyPlayingStore.addChangeListener(this.update);
  },

  componentWillUnmount() {
    TracklistStore.removeChangeListener(this.update);
    CurrentlyPlayingStore.removeChangeListener(this.update);
  },

  update() {
    this.setState(TracklistStore.getState());
    this.setState({currentTrack: CurrentlyPlayingStore.getCurrentTrack()});
  },

  _onSort(property) {
    TracklistActions.sortTracks(property);
  },

  _onPlayTrack(track) {
    TracklistActions.enqueueTrack(track);
  },

  render() {
    return (
      <ul className='tracklist'>
        <li className='tracklist-header'>
          <span onClick={this._onSort.bind(this, 'name')}>Track</span>
          <span onClick={this._onSort.bind(this, 'artist')}>Artist</span>
          <span onClick={this._onSort.bind(this, 'length')}>Time</span>
        </li>
        {this.state.tracks.map((track, i) => {
          var active = track.uri === this.state.currentTrack.uri;
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

export default Tracklist;
