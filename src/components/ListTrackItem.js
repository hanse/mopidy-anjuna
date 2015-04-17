import React from 'react';
import classNames from 'classnames';
import { artistsAsString, convertTime } from '../helpers';

class ListTrackItem extends React.Component {
  render() {
    let track = this.props.track;
    let classes = classNames({
      active: this.props.active,
      unplayable: this.props.unplayable
    });

    return (
      <li {...this.props} className={classes}>
        <span>{this.props.active ? <i className='fa fa-volume-up' /> : ''} {track.name.replace('[unplayable] ', '')}</span>
        <span className='artist-name'>{artistsAsString(track)}</span>
        <span className='track-length'>{convertTime(track.length)}</span>
      </li>
    );
  }
}

export default ListTrackItem;
