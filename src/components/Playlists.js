import React from 'react';
import PlaylistStore from '../stores/PlaylistStore';
import PlaylistActions from '../actions/PlaylistActions';
import connectToStores from '../utils/connectToStores';

class Playlists extends React.Component {

  _onChange = (playlist) => {
    PlaylistActions.changePlaylist(playlist);
  }

  render() {
    return (
      <ul className='playlists'>
      {this.props.playlists.map(playlist => {
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
}

Playlists = connectToStores(Playlists, [PlaylistStore], props => ({
  playlists: PlaylistStore.getAll()
}));

export default Playlists;
