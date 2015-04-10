import React from 'react';
import Tracklist from './Tracklist';
import Queue from './Queue';
import PlayerControls from './PlayerControls';
import Playlists from './Playlists';
import Loader from './Loader';
import StatusStore from '../stores/StatusStore';

function getState() {
  return StatusStore.getState();
}

const App = React.createClass({

  getInitialState() {
    return getState();
  },

  componentDidMount() {
    StatusStore.addChangeListener(this.update);
  },

  componentWillUnmount() {
    StatusStore.removeChangeListener(this.update);
  },

  update() {
    this.setState(getState());
  },

  render() {
    return (
      <Loader loading={!this.state.connected}>
        <div>
          <header>
            <h1>Anjuna</h1>
          </header>
          <main>
            <aside>
              <Playlists {...this.state} />
            </aside>
            <section>
              <Tracklist {...this.state} />
            </section>
            <section>
              <Queue {...this.state} />
            </section>
          </main>
          <footer>
            <PlayerControls {...this.state} />
          </footer>
        </div>
      </Loader>
    );
  }
});

export default App;
