var React = require('react');

var TracklistViewActionCreators = require('../actions/TracklistViewActionCreators');
var TracklistStore = require('../stores/TracklistStore');
var CurrentlyPlayingStore = require('../stores/CurrentlyPlayingStore');
var utils = require('../Utils');

var Tracklist = React.createClass({

  getInitialState: function() {
    return TracklistStore.getState();
  },

  componentDidMount: function() {
    TracklistStore.addChangeListener(this.update);
    CurrentlyPlayingStore.addChangeListener(this.update);
  },

  componentWillUnmount: function() {
    TracklistStore.removeChangeListener(this.update);
    CurrentlyPlayingStore.removeChangeListener(this.update);
  },

  update: function() {
    this.setState(TracklistStore.getState());
    this.setState({currentTrack: CurrentlyPlayingStore.getCurrentTrack()});
  },

  _onSort: function(property) {
    TracklistViewActionCreators.sortBy(property);
  },

  _onPlayTrack: function(track) {
    TracklistViewActionCreators.playTrack(track, this.state.tracks.map(function(track) {
      delete track.artist;
      return track;
    }));
  },

  render: function() {
    return (
      <ul className='tracklist'>
        <li className='tracklist-header'>
          <span onClick={this._onSort.bind(this, 'name')}>Track</span>
          <span onClick={this._onSort.bind(this, 'artist')}>Artist</span>
          <span onClick={this._onSort.bind(this, 'length')}>Time</span>
        </li>
        {this.state.tracks.map(function(track, i) {
          var active = track.uri === this.state.currentTrack.uri;
          return (
            <li key={'track-' + i} onDoubleClick={this._onPlayTrack.bind(this, track)} className={active ? 'active' : ''}>
              <span>{active ? <i className='fa fa-volume-up' /> : ''} {track.name}</span>
              <span className='artist-name'>{utils.artistsAsString(track)}</span>
              <span className='track-length'>{utils.convertTime(track.length)}</span>
            </li>
          );
        }.bind(this))}
      </ul>
    );
  }
});

module.exports = Tracklist;
