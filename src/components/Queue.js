import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import ListTrackItem from './ListTrackItem';

export default class Queue extends Component {
  render() {
    if (this.props.queue.length === 0) {
      return <div className="Queue-no-songs">No songs queued</div>;
    }

    return (
      <ul className="Queue">
        <CSSTransitionGroup transitionName="fade">
          {this.props.queue.map((tlTrack, i) => {
            let id = tlTrack.tlid;
            let track = tlTrack.track;
            let active = track.uri === this.props.currentTrack.uri;

            return <ListTrackItem key={id} active={active} track={track} />;
          })}
        </CSSTransitionGroup>
      </ul>
    );
  }
}
