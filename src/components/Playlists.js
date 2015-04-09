import React from 'react';
import PlaylistStore from '../stores/PlaylistStore';
import PlaylistActions from '../actions/PlaylistActions';

var Playlists = React.createClass({

  getInitialState() {
    return {
      playlists: PlaylistStore.getAll(),
      current: PlaylistStore.getCurrent()
    };
  },

  componentDidMount() {
    PlaylistStore.addChangeListener(this.update);
  },

  componentWillUnmount() {
    PlaylistStore.removeChangeListener(this.update);
  },

  update() {
    this.setState({
      playlists: PlaylistStore.getAll(),
      current: PlaylistStore.getCurrent()
    });
  },

  _onChange(playlist) {
    PlaylistActions.changePlaylist(playlist)
  },

  render() {
    var currentName = this.state.current ? this.state.current.name : '';
    return (
      <ul className='playlists'>
      {this.state.playlists.map((playlist) => {
        var [name, owner] = playlist.name.split(/ by /i);
        var classes = (playlist.name === currentName) ? 'active' : '';
        return (
          <li className={classes} key={playlist.name} onClick={this._onChange.bind(this, playlist.name)}>
            <i className='fa fa-music' /> {name} <span className='playlist-owner'>by {owner}</span>
          </li>
        );
      })}
      </ul>
    );
  }
});

export default Playlists;
