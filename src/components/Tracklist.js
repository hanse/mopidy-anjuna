import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { filter, sort, enqueue, select } from '../actions/TracklistActions';
import ListTrackItem from './ListTrackItem';

function isUnplayable(track) {
  return track.name.slice(0, 12) === '[unplayable]';
}

class Tracklist extends Component {
  onKeyDown = e => {
    switch (e.which) {
      case 38: // UP
        e.preventDefault();
        this.props.dispatch(select(Math.max(0, this.props.selectedTrack - 1)));
        break;

      case 40: // DOWN
        e.preventDefault();
        this.props.dispatch(
          select(
            Math.min(this.props.tracks.length - 1, this.props.selectedTrack + 1)
          )
        );
        break;

      case 13: // ENTER
        e.preventDefault();
        const track = this.props.tracks[this.props.selectedTrack];
        this._onAddTrackToQueue(track, isUnplayable(track));
        break;

      default:
        return;
    }
  };

  // timeposition currently triggers a re-render, so scroll only if needed
  // hard to implement shouldComponentUpdate here
  lastScrolledItem = null;
  componentDidUpdate() {
    const activeItem = findDOMNode(this.activeItem);
    if (activeItem && this.lastScrolledItem !== activeItem) {
      activeItem.scrollIntoViewIfNeeded(false);
      this.lastScrolledItem = activeItem;
    }
  }

  _onFilterTracks(e) {
    e.preventDefault();
    this.props.dispatch(filter(e.target.value));
  }

  _onSort(property) {
    this.props.dispatch(sort(property));
  }

  _onAddTrackToQueue(track, unplayable) {
    if (unplayable) return;
    this.props.dispatch(enqueue(track));
  }

  _onSelectTrack(selectedIndex) {
    this.scrollTop = this.tracklist.scrollTop;
    this.props.dispatch(select(selectedIndex));
  }

  render() {
    return (
      <div
        tabIndex={-1}
        className="Tracklist"
        ref={ref => (this.tracklist = ref)}
        onKeyDown={this.onKeyDown}
      >
        <div className="Tracklist-filter">
          <input
            type="search"
            placeholder="Filter tracks"
            onChange={this._onFilterTracks.bind(this)}
            value={this.props.filter}
          />
        </div>
        <ul className="Tracklist-tracks">
          <li className="Tracklist-tracks-header">
            <span onClick={this._onSort.bind(this, 'name')}>Track</span>
            <span onClick={this._onSort.bind(this, 'artistName')}>Artist</span>
            <span onClick={this._onSort.bind(this, 'length')}>Time</span>
          </li>

          {this.props.tracks.map((track, i) => {
            const active = track.uri === this.props.currentTrack.uri;
            const unplayable = isUnplayable(track);
            const selected = i === this.props.selectedTrack;

            return (
              <ListTrackItem
                ref={ref =>
                  (this.activeItem = selected ? ref : this.activeItem)}
                key={'track' + i}
                active={active}
                selected={selected}
                track={track}
                unplayable={unplayable}
                onClick={this._onSelectTrack.bind(this, i)}
                onDoubleClick={this._onAddTrackToQueue.bind(
                  this,
                  track,
                  unplayable
                )}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(state => ({
  filter: state.tracklist.filter
}))(Tracklist);
