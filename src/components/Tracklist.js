/** @jsx React.DOM */

var React = require('react');

var TracklistViewActionCreators = require('../actions/TracklistViewActionCreators');
var TracklistStore = require('../stores/TracklistStore');

function convertTime(ms) {
  return [
    //((ms/(1000*60*60)) % 24) >> 0,
    ((ms/(1000*60)) % 60) >> 0,
    ((ms/1000) % 60) >> 0
  ].map(function(c) {
    return c < 10 ? '0' + c : c;
  }).join(':');
}

var SongList = React.createClass({

  getInitialState: function() {
    return {
      tracks: TracklistStore.getAll()
    };
  },

  componentDidMount: function() {
    TracklistStore.addChangeListener(this.update);
  },

  componentWillUnmount: function() {
    TracklistStore.removeChangeListener(this.update);
  },

  update: function() {
    this.setState({
      tracks: TracklistStore.getAll()
    });
  },

  _onSort: function(property) {
    TracklistViewActionCreators.sortBy(property);
  },

  render: function() {
    return (
      <table>
        <thead>
          <tr>
            <th onClick={this._onSort.bind(this, 'name')}>Track</th>
            <th onClick={this._onSort.bind(this, 'artist')}>Artist</th>
            <th onClick={this._onSort.bind(this, 'duration')}>Time</th>
          </tr>
        </thead>
        <tbody>
          {this.state.tracks.map(function(track, i) {
            return (
              <tr key={'track-' + i}>
                <td>{track.name}</td>
                <td>{track.artist}</td>
                <td>{convertTime(track.duration)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
});

module.exports = SongList;
