import React from 'react';
import Tracklist from './Tracklist';
import Queue from './Queue';
import PlayerControls from './PlayerControls';
import Playlists from './Playlists';
import Loader from './Loader';
import NowPlaying from './NowPlaying';
import StatusStore from '../stores/StatusStore';
import connectToStores from '../utils/connectToStores';
import '../styles/main.styl';

import { artistsAsString } from '../helpers';

class App extends React.Component {

  static propTypes = {
    currentTrack: React.PropTypes.object,
    currentPlaylistName: React.PropTypes.string,
    isPlaying: React.PropTypes.bool,
    volume: React.PropTypes.number,
    connected: React.PropTypes.bool,
    coverURL: React.PropTypes.string,
    timePosition: React.PropTypes.number
  }

  render() {
    return (
      <Loader loading={!this.props.connected}>
        <div className='app-container'>
          <div className='app-header'>
            <h1>
              {this.props.currentTrack.name} <span className='artist-name'>{artistsAsString(this.props.currentTrack)}</span>
            </h1>
          </div>
          <div className='app-main'>
            <div className='scrollable-section flex-1'>
              <Playlists {...this.props} />
            </div>

            <div className='scrollable-section flex-4'>
              <Tracklist {...this.props} />
            </div>

            <div className='scrollable-section flex-1'>
              <NowPlaying {...this.props} />
              <h2 className='up-next'>Up Next</h2>
              <Queue {...this.props} />
            </div>
          </div>
          <div className='app-footer'>
            <PlayerControls {...this.props} />
          </div>
        </div>
      </Loader>
    );
  }
}

export default connectToStores(App, [StatusStore], () => StatusStore.getState());
