import React, { PropTypes, Component, findDOMNode } from 'react';
import { filter, sort, enqueue } from '../actions/TracklistActions';
import ListTrackItem from './ListTrackItem';

function isUnplayable(track) {
  return track.name.slice(0, 12) === '[unplayable]';
}

export default class Tracklist extends Component {

  static propTypes = {}
  state = { selectedIndex: 0 }

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
        this.setState({ selectedIndex: Math.max(0, this.state.selectedIndex - 1) });
        break;

      case 40: // DOWN
        e.preventDefault();
        this.setState({ selectedIndex: Math.min(this.props.tracks.length - 1, this.state.selectedIndex + 1) });
        break;

      case 13: // ENTER
        e.preventDefault();
        const track = this.props.tracks[this.state.selectedIndex];
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
    this.setState({ selectedIndex });
  }

  render() {
    return (
      <div className='scrollable-section flex-4' ref='tracklist'>
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
            const unplayable = isUnplayable(track);
            const selected = i === this.state.selectedIndex;

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
      </div>
    );
  }
}
