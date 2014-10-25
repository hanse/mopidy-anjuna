/** @jsx React.DOM */

var React = require('react');

var CurrentlyPlayingStore = require('../stores/CurrentlyPlayingStore');

var Header = React.createClass({

  getInitialState: function() {
    return CurrentlyPlayingStore.getState();
  },

  componentDidMount: function() {
    CurrentlyPlayingStore.addChangeListener(this.update);
  },

  componentWillUnmount: function() {
    CurrentlyPlayingStore.removeChangeListener(this.update);
  },

  update: function() {
    this.setState(CurrentlyPlayingStore.getState());
  },

  render: function() {
    var artists = (this.state.track.artists || []).map(function(artist) { return artist.name; }).join(', ');
    return (
      <header>
        <h1>{this.state.track.name} &mdash; {artists}</h1>
      </header>
    );
  }
});

module.exports = Header;
