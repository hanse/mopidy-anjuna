import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { changePlaylist } from '../actions/PlaylistActions';

export default class Playlists extends Component {

  static propTypes = {
    playlists: PropTypes.array.isRequired
  }

  _onChange = (playlist) => {
    this.props.dispatch(changePlaylist(playlist));
  }

  render() {
    return (
      <ul className='playlists'>
      {this.props.playlists.map(playlist => {
        let [name, owner] = playlist.name.split(/ by /i);
        let classes = classNames({
          active: playlist.name === this.props.currentPlaylistName
        });

        return (
          <li className={classes} key={playlist.name} onClick={this._onChange.bind(this, playlist)}>
            <i className='fa fa-music' />{name} <span className='playlist-owner'>by {owner}</span>
          </li>
        );
      })}
      </ul>
    );
  }
}
