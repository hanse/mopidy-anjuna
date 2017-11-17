import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Tracklist from './Tracklist';
import Queue from './Queue';
import PlayerControls from './PlayerControls';
import Playlists from './Playlists';
import Progress from './Progress';
import Loader from './Loader';
import { connect } from 'react-redux';
import { formatArtists } from '../helpers';
import { saveState } from '../actions/AppActions';
import { requestTimePosition } from '../actions/MopidyActions';
import '../styles/index.styl';
import { createFilter, createSorter } from '../reducers/tracklist';

function selectTracks(state) {
  const tracks = (state.playlists.items.find(
    p => p.name === state.status.currentPlaylistName
  ) || {}
  ).tracks;
  return (tracks || [])
    .map(track => ({ ...track, artistName: formatArtists(track.artists) }))
    .filter(createFilter(state))
    .sort(createSorter(state));
}

class App extends Component {
  componentDidMount() {
    this.updateDocumentTitle();

    window.onbeforeunload = () => {
      this.props.dispatch(saveState());
    };

    this.props.dispatch(requestTimePosition());
  }

  componentDidUpdate() {
    this.updateDocumentTitle();
  }

  updateDocumentTitle() {
    document.title = this.props.currentTrack.name
      ? `${this.props.currentTrack.name} - ${formatArtists(
          this.props.currentTrack.artists
        )}`
      : 'No Songs Playing';
  }

  render() {
    return (
      <Loader loading={!this.props.connected}>
        <div className="App-container">
          <div className="App-header">
            <h1>
              {this.props.currentTrack.name}{' '}
              <span className="artist-name">
                {formatArtists(this.props.currentTrack.artists)}
              </span>
            </h1>
          </div>
          <div className="App-main">
            <div className="scrollable flex-1" tabIndex={0}>
              <Playlists {...this.props} />
            </div>

            <div className="scrollable flex-4" tabIndex={1}>
              <Tracklist {...this.props} />
            </div>

            <div className="scrollable flex-1" tabIndex={2}>
              <div className="cover-image">
                <CSSTransitionGroup transitionName="opacity">
                  <img
                    src={this.props.coverURL}
                    key={this.props.coverURL}
                    alt=""
                  />
                </CSSTransitionGroup>
              </div>
              <h2 className="up-next">Up Next</h2>
              <Queue {...this.props} />
            </div>
          </div>

          <div className="App-footer">
            <PlayerControls {...this.props} />
          </div>

          <Progress />
        </div>
      </Loader>
    );
  }
}

export default connect(state => {
  return {
    volume: state.status.volume,
    currentTrack: state.status.currentTrack,
    isPlaying: state.status.isPlaying,
    connected: state.status.connected,
    playlists: state.playlists.items,
    currentPlaylistName: state.status.currentPlaylistName,
    queue: state.queue,
    selectedTrack: state.tracklist.selectedIndex,
    selectedPlaylist: state.playlists.selectedIndex,
    coverURL: state.status.covers[state.status.currentTrack.uri],
    tracks: selectTracks(state)
  };
})(App);
