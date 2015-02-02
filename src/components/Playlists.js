var React = require('react');

var PlaylistStore = require('../stores/PlaylistStore');
var PlaylistViewActionCreators = require('../actions/PlaylistViewActionCreators');


var Playlists = React.createClass({

  getInitialState: function() {
    return {
      playlists: PlaylistStore.getAll(),
      current: PlaylistStore.getCurrent()
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
      playlists: PlaylistStore.getAll(),
      current: PlaylistStore.getCurrent()
    });
  },

  _onChange: function(playlist) {
    PlaylistViewActionCreators.changePlaylist(playlist)
  },

  render: function() {
    var currentName = this.state.current ? this.state.current.name : '';
    return (
      <ul className='playlists'>
      {this.state.playlists.map(function(playlist) {
        var [name, owner] = playlist.name.split(/ by /i);
        var classes = (playlist.name == currentName) ? 'active' : '';
        return (
          <li className={classes} key={playlist.name} onClick={this._onChange.bind(this, playlist.name)}>
            <i className='fa fa-music' /> {name} <span className='playlist-owner'>by {owner}</span>
          </li>
        );
      }.bind(this))}
      </ul>
    );
  }
});

module.exports = Playlists;
