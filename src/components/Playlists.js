import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { select } from '../actions/PlaylistActions';

export default class Playlists extends Component {
  componentDidUpdate() {
    const activeItem = findDOMNode(this.refs.activeItem);
    if (activeItem) activeItem.scrollIntoViewIfNeeded(false);
  }

  onKeyDown = e => {
    switch (e.which) {
      case 38: // UP
        e.preventDefault();
        this.props.dispatch(
          select(Math.max(0, this.props.selectedPlaylist - 1))
        );
        break;

      case 40: // DOWN
        e.preventDefault();
        this.props.dispatch(
          select(
            Math.min(
              this.props.playlists.length - 1,
              this.props.selectedPlaylist + 1
            )
          )
        );
        break;

      default:
        return;
    }
  };

  _onChange = index => {
    this.props.dispatch(select(index));
  };

  render() {
    return (
      <ul tabIndex={-1} className="playlists" onKeyDown={this.onKeyDown}>
        {this.props.playlists.map((playlist, index) => {
          const [name, owner] = playlist.name.split(/ by /i);
          const active = index === this.props.selectedPlaylist;

          let classes = classNames({ active });

          return (
            <li
              ref={active ? 'activeItem' : null}
              className={classes}
              key={playlist.name}
              onClick={this._onChange.bind(this, index)}
            >
              <i className="fa fa-music" />
              {name} <span className="playlist-owner">by {owner}</span>
            </li>
          );
        })}
      </ul>
    );
  }
}
