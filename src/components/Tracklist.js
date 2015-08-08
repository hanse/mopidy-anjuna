import React, { PropTypes, Component, findDOMNode } from 'react';
import { filter, sort, enqueue, select } from '../actions/TracklistActions';
import ListTrackItem from './ListTrackItem';

function isUnplayable(track) {
  return track.name.slice(0, 12) === '[unplayable]';
}

export default class Tracklist extends Component {

  static propTypes = {
    tracks: PropTypes.array,
    selectedIndex: PropTypes.number
  }
  
  componentDidMount() {
    window.addEventListener('keydown', ::this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', ::this.onKeyDown);
  }

  onKeyDown(e) {
    switch (e.which) {
      case 38: // UP
        e.preventDefault();
        this.props.dispatch(select(Math.max(0, this.props.selectedIndex - 1)));
        break;

      case 40: // DOWN
        e.preventDefault();
        this.props.dispatch(select(Math.min(this.props.tracks.length - 1, this.props.selectedIndex + 1)));
        break;

      case 13: // ENTER
        e.preventDefault();
        const track = this.props.tracks[this.props.selectedIndex];
        this._onAddTrackToQueue(track, isUnplayable(track));
        break;

      default:
        return;
    }
  }

  componentDidUpdate() {
    findDOMNode(this.refs.activeItem).scrollIntoViewIfNeeded(false);
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
    this.scrollTop = findDOMNode(this.refs.tracklist).scrollTop;
    this.props.dispatch(select(selectedIndex));
  }

  render() {
    return (
      <div className='Tracklist' ref='tracklist'>
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
            const unplayable = isUnplayable(track);
            const selected = i === this.props.selectedIndex;

            return (
              <ListTrackItem
                ref={selected ? 'activeItem' : null}
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
