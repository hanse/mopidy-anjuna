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
    document.title = this.state.trackString;
  },

  render: function() {
    console.log('state', this.state)
    var artists = (this.state.track.artists || []).map(function(artist) { return artist.name; }).join(', ');
    return (
      <header>
        <h1>{this.state.trackString}</h1>
      </header>
    );
  }
});

module.exports = Header;
