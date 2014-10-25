/** @jsx React.DOM */

var React = require('react');

var PlaylistStore = require('../stores/PlaylistStore');
var PlaylistViewActionCreators = require('../actions/PlaylistViewActionCreators');


var Playlists = React.createClass({

  getInitialState: function() {
    return {
      playlists: PlaylistStore.getAll()
    };
  },

  componentDidMount: function() {
    PlaylistStore.addChangeListener(this.update);
  },

  componentWillUnmount: function() {
    PlaylistStore.removeChangeListener(this.update);
  },

  update: function() {
    this.setState({
      playlists: PlaylistStore.getAll()
    });
  },

  _onChange: function(playlist) {
    PlaylistViewActionCreators.changePlaylist(playlist)
  },

  render: function() {
    return (
      <ul className='playlists'>
      {this.state.playlists.map(function(playlist) {
        var [name, owner] = playlist.name.split(/ by /i);
        return (
          <li key={playlist.name} onClick={this._onChange.bind(this, playlist.name)}><i className='fa fa-music' /> {name} <span className='playlist-owner'>by {owner}</span></li>
        );
      }.bind(this))}
      </ul>
    );
  }
});

module.exports = Playlists;
