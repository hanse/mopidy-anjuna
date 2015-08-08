import React, { PropTypes, Component } from 'react';
import Tracklist from './Tracklist';
import Queue from './Queue';
import PlayerControls from './PlayerControls';
import Scrollable from './Scrollable';
import Playlists from './Playlists';
import Loader from './Loader';
import NowPlaying from './NowPlaying';
import { connect } from 'react-redux';
import { formatArtists } from '../helpers';
import { saveState } from '../actions/AppActions';
import '../styles/index.styl';

import { createFilter, createSorter } from '../reducers/tracklist';

@connect((state) => {
  return ({
    ...state.status,
    playlists: state.playlists.items,
    currentPlaylistName: state.playlists.currentPlaylistName,
    queue: state.queue,
    selectedIndex: state.tracklist.selectedIndex,
    tracks: state.playlists.currentPlaylistTracks
      .filter(createFilter(state))
      .sort(createSorter(state))
  });
})
export default class App extends Component {

  static propTypes = {
    currentTrack: PropTypes.object.isRequired,
    currentPlaylistName: PropTypes.string.isRequired,
    tracks: PropTypes.array.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    connected: PropTypes.bool.isRequired,
    coverURL: PropTypes.string.isRequired,
    timePosition: PropTypes.number.isRequired
  }

  componentDidMount() {
    this.updateDocumentTitle();

    window.onbeforeunload = () => {
      this.props.dispatch(saveState());
    };
  }

  componentWillReceiveProps(nextProps) {
    this.updateDocumentTitle();
  }

  updateDocumentTitle() {
    document.title = this.props.currentTrack.name
      ? `${this.props.currentTrack.name} - ${formatArtists(this.props.currentTrack.artists)}`
      : 'No Songs Playing';
  }

  render() {
    return (
      <Loader loading={!this.props.connected}>
        <div className='App-container'>
          <div className='App-header'>
            <h1>
              {this.props.currentTrack.name}
              {' '}
              <span className='artist-name'>
                {formatArtists(this.props.currentTrack.artists)}
              </span>
            </h1>
          </div>
          <div className='App-main'>
            <Scrollable>
              <Playlists {...this.props} />
            </Scrollable>

            <Scrollable flex={4}>
              <Tracklist {...this.props} />
            </Scrollable>

            <Scrollable>
              <NowPlaying {...this.props} />
              <h2 className='up-next'>Up Next</h2>
              <Queue {...this.props} />
            </Scrollable>
          </div>
          <div className='App-footer'>
            <PlayerControls {...this.props} />
          </div>
        </div>
      </Loader>
    );
  }
}
