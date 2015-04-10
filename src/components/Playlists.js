import React from 'react';
import PlaylistStore from '../stores/PlaylistStore';
import PlaylistActions from '../actions/PlaylistActions';

const Playlists = React.createClass({

  getInitialState() {
    return {
      playlists: PlaylistStore.getAll(),
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
    });
  },

  _onChange(playlist) {
    PlaylistActions.changePlaylist(playlist);
  },

  render() {
    return (
      <ul className='playlists'>
      {this.state.playlists.map((playlist) => {
        let [name, owner] = playlist.name.split(/ by /i);
        let classes = (playlist.name === this.props.currentPlaylistName) ? 'active' : '';
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
