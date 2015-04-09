import React from 'react';
import CurrentlyPlayingStore from '../stores/CurrentlyPlayingStore';

var Header = React.createClass({

  getInitialState() {
    return CurrentlyPlayingStore.getState();
  },

  componentDidMount() {
    CurrentlyPlayingStore.addChangeListener(this.update);
  },

  componentWillUnmount() {
    CurrentlyPlayingStore.removeChangeListener(this.update);
  },

  update() {
    this.setState(CurrentlyPlayingStore.getState());
    document.title = this.state.trackString;
  },

  render() {
    var artists = (this.state.track.artists || []).map((artist) => { artist.name; }).join(', ');
    return (
      <header>
        <h1>{this.state.trackString}</h1>
      </header>
    );
  }
});

export default Header;
