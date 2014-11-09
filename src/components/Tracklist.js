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
      <table>
        <thead>
          <tr>
            <th onClick={this._onSort.bind(this, 'name')}>Track</th>
            <th onClick={this._onSort.bind(this, 'artist')}>Artist</th>
            <th onClick={this._onSort.bind(this, 'length')}>Time</th>
          </tr>
        </thead>
        <tbody>
          {this.state.tracks.map(function(track, i) {
            var classes = track.uri === this.state.currentTrack.uri ? 'active' : '';
            return (
              <tr key={'track-' + i} onDoubleClick={this._onPlayTrack.bind(this, track)} className={classes}>
                <td>{track.name}</td>
                <td>{utils.artistsAsString(track)}</td>
                <td>{utils.convertTime(track.length)}</td>
              </tr>
            );
          }.bind(this))}
        </tbody>
      </table>
    );
  }
});

module.exports = Tracklist;
