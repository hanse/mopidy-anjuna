/** @jsx React.DOM */

var React = require('react');
var Tracklist = require('./Tracklist');
var PlayerControls = require('./PlayerControls');
var Header = require('./Header');
var Playlists = require('./Playlists');
var Loader = require('./Loader');

var ConnectionStore = require('../stores/ConnectionStore');

var App = React.createClass({

  getInitialState: function() {
    return {
      connected: ConnectionStore.isConnected()
    };
  },

  componentDidMount: function() {
    ConnectionStore.addChangeListener(this.update);
  },

  componentWillUnmount: function() {
    ConnectionStore.removeChangeListener(this.update);
  },

  update: function() {
    this.setState({
      connected: ConnectionStore.isConnected()
    });
  },

  render: function() {
    return (
      <Loader loading={!this.state.connected} text='Connecting...'>
        <div>
          <Header />
          <div>
            <aside className='sidebar'>
              <Playlists />
            </aside>
            <section className='main'>
              <Tracklist />
            </section>
          </div>
          <footer>
            <PlayerControls />
          </footer>
        </div>
      </Loader>
    );
  }
});

module.exports = App;
