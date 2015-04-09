import React from 'react';
import Tracklist from './Tracklist';
import Queue from './Queue';
import PlayerControls from './PlayerControls';
import Header from './Header';
import Playlists from './Playlists';
import Loader from './Loader';
import ConnectionStore from '../stores/ConnectionStore';
import AlbumCoverStore from '../stores/AlbumCoverStore';

var App = React.createClass({

  getInitialState() {
    return {
      connected: ConnectionStore.isConnected(),
      coverURL: AlbumCoverStore.getCoverURL()
    };
  },

  componentDidMount() {
    ConnectionStore.addChangeListener(this.update);
    AlbumCoverStore.addChangeListener(this.update);
  },

  componentWillUnmount() {
    ConnectionStore.removeChangeListener(this.update);
    AlbumCoverStore.removeChangeListener(this.update);
  },

  update() {
    this.setState({
      connected: ConnectionStore.isConnected(),
      coverURL: AlbumCoverStore.getCoverURL()
    });
  },

  render() {
    return (
      <Loader loading={!this.state.connected}>
        <div>
          <Header />
          <main>
            <aside>
              <Playlists />
            </aside>
            <section>
              <Tracklist />
            </section>
            <section>
              <Queue />
            </section>
          </main>
          <footer>
            <img src={this.state.coverURL} alt='' />
            <PlayerControls />
          </footer>
        </div>
      </Loader>
    );
  }
});

export default App;
