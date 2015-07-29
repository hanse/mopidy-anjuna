import React, { PropTypes, Component } from 'react';
import { filter, sort, enqueue } from '../actions/TracklistActions';
import ListTrackItem from './ListTrackItem';

export default class Tracklist extends Component {

  static propTypes = {}
  state = { selectedIndex: 0 }

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
    this.setState({ selectedIndex });
  }

  render() {
    return (
      <div className='Tracklist'>
        <div className='Tracklist-filter'>
          <input
            type='search'
            placeholder='Filter tracks'
            onChange={this._onFilterTracks.bind(this)}
          />
        </div>
        <ul className='Tracklist-tracks'>
          <li className='Tracklist-tracks-header'>
            <span onClick={this._onSort.bind(this, 'name')}>Track</span>
            <span onClick={this._onSort.bind(this, 'artistName')}>Artist</span>
            <span onClick={this._onSort.bind(this, 'length')}>Time</span>
          </li>

          {this.props.tracks.map((track, i) => {
            const active = track.uri === this.props.currentTrack.uri;
            const unplayable = track.name.slice(0, 12) === '[unplayable]';
            const selected = i === this.state.selectedIndex;

            return (
              <ListTrackItem
                key={'track' + i}
                active={active}
                selected={selected}
                track={track}
                unplayable={unplayable}
                onClick={this._onSelectTrack.bind(this, i)}
                onDoubleClick={this._onAddTrackToQueue.bind(this, track, unplayable)}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
