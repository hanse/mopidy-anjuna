import React from 'react';
import Tracklist from './Tracklist';
import Queue from './Queue';
import PlayerControls from './PlayerControls';
import Playlists from './Playlists';
import Loader from './Loader';
import StatusStore from '../stores/StatusStore';
import connectToStores from '../utils/connectToStores';
import '../styles/main.styl';

class App extends React.Component {
  render() {
    return (
      <Loader loading={!this.props.connected}>
        <div>
          <header>
            <h1>Anjuna</h1>
          </header>
          <main>
            <aside>
              <Playlists {...this.props} />
            </aside>
            <section>
              <Tracklist {...this.props} />
            </section>
            <section>
              <Queue {...this.props} />
            </section>
          </main>
          <footer>
            <PlayerControls {...this.props} />
          </footer>
        </div>
      </Loader>
    );
  }
}

App = connectToStores(App, [StatusStore], props => StatusStore.getState());

export default App;
